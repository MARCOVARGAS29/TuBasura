import CollectionScheduleView from './view.js';
import fs from 'fs';
import path from 'path';

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
  const startPanel = {
    hidden: true,
    scrollIntoView: jest.fn(),
  };
  const startLink = {
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
  const reportSortSelect = {
    value: 'recent',
    addEventListener: jest.fn(),
  };
  const reportDistrictFilter = {
    value: 'Distrito 2',
    addEventListener: jest.fn(),
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
    startPanel,
    startLink,
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
    reportSortSelect,
    reportDistrictFilter,
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
      startPanel,
      startLink,
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
      reportSortSelect,
      reportDistrictFilter,
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
    const {
      view,
      loginSection,
      homeSection,
      welcomeMessage,
      startPanel,
      schedulePanel,
    } = createView();

    view.showHome({ name: 'Invitado', accessType: 'guest' });

    expect(loginSection.hidden).toBe(true);
    expect(homeSection.hidden).toBe(false);
    expect(welcomeMessage.textContent).toContain('Invitado');
    expect(startPanel.hidden).toBe(false);
    expect(schedulePanel.hidden).toBe(true);
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

  it('deberia enlazar los filtros de reportes', () => {
    const { view, reportSortSelect, reportDistrictFilter } = createView();
    const handler = jest.fn();

    view.bindReportFilters(handler);

    expect(reportSortSelect.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
    expect(reportDistrictFilter.addEventListener).toHaveBeenCalledWith(
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

  it('deberia volver a la pagina de inicio desde el navbar', () => {
    const {
      view,
      startPanel,
      reportsPanel,
      schedulePanel,
      reportsLink,
      startLink,
    } = createView();
    const event = {
      preventDefault: jest.fn(),
    };

    view.bindReportsNavigation();
    view.bindStartNavigation();
    reportsLink.addEventListener.mock.calls[0][1](event);
    startLink.addEventListener.mock.calls[0][1](event);

    expect(startPanel.hidden).toBe(false);
    expect(reportsPanel.hidden).toBe(true);
    expect(schedulePanel.hidden).toBe(true);
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
    const { view, reportForm, reportConfirmation, reportModal } = createView();
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

  it('deberia tener controles de ordenamiento y filtro en reportes', () => {
    const htmlPath = path.join(process.cwd(), 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    expect(html).toMatch(/id="report-sort-select"/);
    expect(html).toMatch(/id="report-district-filter"/);
    expect(html).toMatch(/Mas recientes/);
    expect(html).toMatch(/Con mas likes/);
  });

  describe('HTML Footer', () => {
    it('deberia tener la nueva estructura de paleta de colores y no mostrar horario de atencion', () => {
      const htmlPath = path.join(process.cwd(), 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf-8');

      expect(html).not.toMatch(/Atencion: lunes a viernes/i);
      expect(html).toMatch(/footer-content/);
      expect(html).toMatch(/footer-brand/);
      expect(html).toMatch(/color:\s*#ffffff;/i);
      expect(html).toMatch(/Estamos para ayudarte/i);
    });
  });
});