import CollectionSchedulePresenter from './presenter.js';

describe('CollectionSchedulePresenter', () => {
  it('deberia iniciar en login y enlazar los accesos', () => {
    const model = {
      getDistrictOptions: jest.fn(() => []),
    };
    const view = {
      renderDistrictOptions: jest.fn(),
      showInitialMessage: jest.fn(),
      showLogin: jest.fn(),
      bindLogin: jest.fn(),
      bindGuestAccess: jest.fn(),
      renderDistrictOptions: jest.fn(),
      bindDistrictSelection: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.initialize();

    expect(view.showLogin).toHaveBeenCalled();
    expect(view.bindLogin).toHaveBeenCalledWith(expect.any(Function));
    expect(view.bindGuestAccess).toHaveBeenCalledWith(expect.any(Function));
    expect(view.bindDistrictSelection).toHaveBeenCalledWith(expect.any(Function));
  });

  it('deberia mostrar el home al iniciar sesion', () => {
    const session = {
      name: 'admin',
      accessType: 'registered',
    };
    const options = [{ value: '1', label: 'Distrito 1' }];
    const model = {
      login: jest.fn(() => session),
      getDistrictOptions: jest.fn(() => options),
    };
    const view = {
      showLogin: jest.fn(),
      bindLogin: jest.fn(),
      bindGuestAccess: jest.fn(),
      bindDistrictSelection: jest.fn(),
      showHome: jest.fn(),
      renderDistrictOptions: jest.fn(),
      showInitialMessage: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.initialize();

    const loginHandler = view.bindLogin.mock.calls[0][0];
    loginHandler({ username: 'admin', password: '123456' });

    expect(model.login).toHaveBeenCalledWith({
      username: 'admin',
      password: '123456',
    });
    expect(view.showHome).toHaveBeenCalledWith(session);
    expect(view.renderDistrictOptions).toHaveBeenCalledWith(options);
    expect(view.showInitialMessage).toHaveBeenCalled();
  });

  it('deberia mostrar el home al entrar como invitado', () => {
    const session = {
      name: 'Invitado',
      accessType: 'guest',
    };
    const options = [{ value: '1', label: 'Distrito 1' }];
    const model = {
      loginAsGuest: jest.fn(() => session),
      getDistrictOptions: jest.fn(() => options),
    };
    const view = {
      showLogin: jest.fn(),
      bindLogin: jest.fn(),
      bindGuestAccess: jest.fn(),
      bindDistrictSelection: jest.fn(),
      showHome: jest.fn(),
      renderDistrictOptions: jest.fn(),
      showInitialMessage: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.initialize();

    const guestHandler = view.bindGuestAccess.mock.calls[0][0];
    guestHandler();

    expect(model.loginAsGuest).toHaveBeenCalled();
    expect(view.showHome).toHaveBeenCalledWith(session);
    expect(view.renderDistrictOptions).toHaveBeenCalledWith(options);
    expect(view.showInitialMessage).toHaveBeenCalled();
  });

  it('deberia mostrar el horario cuando existe el distrito', () => {
    const schedule = {
      district: 'Distrito 2',
      days: 'Martes, jueves y sabado',
      time: '08:00',
    };
    const model = {
      getScheduleByDistrict: jest.fn(() => schedule),
    };
    const view = {
      showSchedule: jest.fn(),
      showInitialMessage: jest.fn(),
      showScheduleNotFound: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.showScheduleForDistrict('2');

    expect(model.getScheduleByDistrict).toHaveBeenCalledWith('2');
    expect(view.showSchedule).toHaveBeenCalledWith(schedule);
  });

  it('deberia mostrar el mensaje inicial cuando no se selecciona distrito', () => {
    const model = {
      getScheduleByDistrict: jest.fn(),
    };
    const view = {
      showSchedule: jest.fn(),
      showInitialMessage: jest.fn(),
      showScheduleNotFound: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.showScheduleForDistrict('');

    expect(model.getScheduleByDistrict).not.toHaveBeenCalled();
    expect(view.showInitialMessage).toHaveBeenCalled();
  });

  it('deberia mostrar un mensaje de no encontrado cuando no hay horario', () => {
    const model = {
      getScheduleByDistrict: jest.fn(() => null),
    };
    const view = {
      showSchedule: jest.fn(),
      showInitialMessage: jest.fn(),
      showScheduleNotFound: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.showScheduleForDistrict('99');

    expect(view.showScheduleNotFound).toHaveBeenCalled();
  });
});
