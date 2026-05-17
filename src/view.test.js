import CollectionScheduleView from './view.js';

function createView() {
  const loginSection = {
    hidden: false,
  };
  const homeSection = {
    hidden: true,
  };
  const welcomeMessage = {
    textContent: '',
  };
  const districtSelect = {
    innerHTML: '',
    append: jest.fn(),
    addEventListener: jest.fn(),
  };
  const manualLocationSelect = {
    innerHTML: '',
    append: jest.fn(),
    addEventListener: jest.fn(),
  };
  const manualSelectionPanel = {
    hidden: false,
  };
  const manualSelectionLink = {
    addEventListener: jest.fn(),
  };
  const reportsPanel = {
    hidden: true,
    scrollIntoView: jest.fn(),
  };
  const schedulePanel = {
    hidden: false,
  };
  const reportsLink = {
    addEventListener: jest.fn(),
  };
  const scheduleLink = {
    addEventListener: jest.fn(),
  };
  const resultContainer = {
    innerHTML: '',
  };
  const loginForm = {
    addEventListener: jest.fn(),
  };
  const guestButton = {
    addEventListener: jest.fn(),
  };
  const usernameInput = {
    value: 'admin',
  };
  const passwordInput = {
    value: '123456',
  };
  const reportForm = {
    addEventListener: jest.fn(),
    reset: jest.fn(),
  };
  const reportDescription = {
    value: 'Basura acumulada',
  };
  const reportDistrict = {
    value: 'Distrito 4',
  };
  const reportImage = {
    value: 'https://example.com/basura.jpg',
  };
  const reportsList = {
    innerHTML: '',
    append: jest.fn(),
  };
  const reportConfirmation = {
    innerHTML: '',
  };
  const reportModal = {
    hidden: true,
  };
  const reportModalOkButton = {
    addEventListener: jest.fn(),
  };

  return {
    loginSection,
    homeSection,
    welcomeMessage,
    districtSelect,
    manualLocationSelect,
    manualSelectionPanel,
    manualSelectionLink,
    reportsPanel,
    schedulePanel,
    reportsLink,
    scheduleLink,
    resultContainer,
    loginForm,
    guestButton,
    usernameInput,
    passwordInput,
    reportForm,
    reportDescription,
    reportDistrict,
    reportImage,
    reportsList,
    reportConfirmation,
    reportModal,
    reportModalOkButton,
    view: new CollectionScheduleView({
      loginSection,
      homeSection,
      welcomeMessage,
      districtSelect,
      manualLocationSelect,
      manualSelectionPanel,
      manualSelectionLink,
      reportsPanel,
      schedulePanel,
      reportsLink,
      scheduleLink,
      resultContainer,
      loginForm,
      guestButton,
      usernameInput,
      passwordInput,
      reportForm,
      reportDescription,
      reportDistrict,
      reportImage,
      reportsList,
      reportConfirmation,
      reportModal,
      reportModalOkButton,
    }),
  };
}

describe('CollectionScheduleView', () => {
  it('deberia mostrar la pantalla de login', () => {
    const { view, loginSection, homeSection } = createView();

    view.showHome({ name: 'admin', accessType: 'registered' });
    view.showLogin();

    expect(loginSection.hidden).toBe(false);
    expect(homeSection.hidden).toBe(true);
  });

  it('deberia mostrar el home con el nombre de la sesion', () => {
    const { view, loginSection, homeSection, welcomeMessage } = createView();

    view.showHome({ name: 'Invitado', accessType: 'guest' });

    expect(loginSection.hidden).toBe(true);
    expect(homeSection.hidden).toBe(false);
    expect(welcomeMessage.textContent).toContain('Invitado');
  });

  it('deberia renderizar las opciones en el select', () => {
    const { view, districtSelect } = createView();
    const originalDocument = global.document;
    global.document = {
      createElement: jest.fn(() => ({ value: '', textContent: '' })),
    };

    view.renderDistrictOptions([{ value: '1', label: 'Distrito 1' }]);

    expect(global.document.createElement).toHaveBeenCalledWith('option');
    expect(districtSelect.append).toHaveBeenCalled();

    global.document = originalDocument;
  });

  it('deberia renderizar opciones de ubicacion manual', () => {
    const { view, manualLocationSelect } = createView();
    const originalDocument = global.document;
    global.document = {
      createElement: jest.fn(() => ({ value: '', textContent: '' })),
    };

    view.renderLocationOptions([
      {
        value: 'Zona Aranjuez Alto (SubDistrito 25)',
        label: 'Zona Aranjuez Alto (SubDistrito 25)',
      },
    ]);

    expect(global.document.createElement).toHaveBeenCalledWith('option');
    expect(manualLocationSelect.append).toHaveBeenCalled();

    global.document = originalDocument;
  });

  it('deberia enlazar la seleccion de ubicacion manual', () => {
    const { view, manualLocationSelect } = createView();
    const handler = jest.fn();

    view.bindManualLocationSelection(handler);

    expect(manualLocationSelect.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('deberia ocultar la seleccion manual hasta abrirla desde el navbar', () => {
    const { view, manualSelectionPanel, manualSelectionLink } = createView();
    const event = {
      preventDefault: jest.fn(),
    };

    view.showHome({ name: 'Invitado', accessType: 'guest' });
    view.bindManualSelectionNavigation();
    const openManualSelection = manualSelectionLink.addEventListener.mock
      .calls[0][1];
    openManualSelection(event);

    expect(manualSelectionPanel.hidden).toBe(false);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('deberia abrir la pagina de reportes desde el navbar', () => {
    const { view, reportsPanel, schedulePanel, reportsLink } = createView();
    const event = {
      preventDefault: jest.fn(),
    };

    view.bindReportsNavigation();
    const openReports = reportsLink.addEventListener.mock.calls[0][1];
    openReports(event);

    expect(reportsPanel.hidden).toBe(false);
    expect(schedulePanel.hidden).toBe(true);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('deberia volver desde reportes a seleccion manual y horarios', () => {
    const {
      view,
      manualSelectionPanel,
      reportsPanel,
      schedulePanel,
      manualSelectionLink,
      reportsLink,
      scheduleLink,
    } = createView();
    const event = {
      preventDefault: jest.fn(),
    };

    view.bindReportsNavigation();
    view.bindManualSelectionNavigation();
    view.bindScheduleNavigation();

    reportsLink.addEventListener.mock.calls[0][1](event);
    manualSelectionLink.addEventListener.mock.calls[0][1](event);

    expect(schedulePanel.hidden).toBe(false);
    expect(reportsPanel.hidden).toBe(true);
    expect(manualSelectionPanel.hidden).toBe(false);

    reportsLink.addEventListener.mock.calls[0][1](event);
    scheduleLink.addEventListener.mock.calls[0][1](event);

    expect(schedulePanel.hidden).toBe(false);
    expect(reportsPanel.hidden).toBe(true);
    expect(manualSelectionPanel.hidden).toBe(true);
  });

  it('deberia mostrar el horario seleccionado', () => {
    const { view, resultContainer } = createView();

    view.showSchedule({
      district: 'Distrito 3',
      days: 'Lunes, jueves y sabado',
      time: '09:00',
    });

    expect(resultContainer.innerHTML).toContain('Distrito 3');
    expect(resultContainer.innerHTML).toContain('09:00');
  });

  it('deberia mostrar la ubicacion manual seleccionada en el resultado', () => {
    const { view, resultContainer } = createView();

    view.showSchedule({
      district: 'Distrito 1',
      selectedLocation: 'Zona Aranjuez Alto (SubDistrito 25)',
      days: 'Lunes, miercoles y viernes',
      time: '07:00',
    });

    expect(resultContainer.innerHTML).toContain(
      'Zona Aranjuez Alto (SubDistrito 25)',
    );
  });

  it('deberia mostrar las zonas si el distrito las tiene', () => {
    const { view, resultContainer } = createView();

    view.showSchedule({
      district: 'Distrito 1',
      days: 'Lunes, miercoles y viernes',
      time: '07:00',
      zones: ['Zona A', 'Zona B'],
    });

    expect(resultContainer.innerHTML).toContain('Zona A');
    expect(resultContainer.innerHTML).toContain('Zona B');
  });

  it('deberia enviar distrito y mostrar confirmacion clara del reporte', () => {
    const {
      view,
      reportForm,
      reportConfirmation,
      reportModal,
    } = createView();
    const event = {
      preventDefault: jest.fn(),
    };
    const handler = jest.fn();

    view.bindCreateReport(handler);
    const submitReport = reportForm.addEventListener.mock.calls[0][1];
    submitReport(event);

    expect(handler).toHaveBeenCalledWith({
      description: 'Basura acumulada',
      district: 'Distrito 4',
      image: 'https://example.com/basura.jpg',
    });

    view.showReportConfirmation({
      description: 'Basura acumulada',
      district: 'Distrito 4',
      userName: 'admin',
      createdAt: new Date('2026-05-17T10:30:00'),
    });

    expect(reportConfirmation.innerHTML).toContain(
      'Reporte enviado correctamente',
    );
    expect(reportConfirmation.innerHTML).toContain('Basura acumulada');
    expect(reportConfirmation.innerHTML).toContain('Distrito 4');
    expect(reportConfirmation.innerHTML).toContain('admin');
    expect(reportConfirmation.innerHTML).toContain('2026');
    expect(reportModal.hidden).toBe(false);
  });

  it('deberia cerrar el modal de reporte al apretar ok', () => {
    const { view, reportModal, reportModalOkButton } = createView();

    view.bindReportModalDismiss();
    reportModal.hidden = false;
    reportModalOkButton.addEventListener.mock.calls[0][1]();

    expect(reportModal.hidden).toBe(true);
  });
});
