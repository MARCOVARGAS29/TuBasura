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

  return {
    loginSection,
    homeSection,
    welcomeMessage,
    districtSelect,
    manualLocationSelect,
    manualSelectionPanel,
    manualSelectionLink,
    resultContainer,
    loginForm,
    guestButton,
    usernameInput,
    passwordInput,
    view: new CollectionScheduleView({
      loginSection,
      homeSection,
      welcomeMessage,
      districtSelect,
      manualLocationSelect,
      manualSelectionPanel,
      manualSelectionLink,
      resultContainer,
      loginForm,
      guestButton,
      usernameInput,
      passwordInput,
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
});
