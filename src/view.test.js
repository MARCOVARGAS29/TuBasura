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
});
