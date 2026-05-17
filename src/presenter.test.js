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
      bindDistrictSelection: jest.fn(),
      bindManualLocationSelection: jest.fn(),
      bindCreateReport: jest.fn(),
      bindLikeReport: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.initialize();

    expect(view.showLogin).toHaveBeenCalled();
    expect(view.bindLogin).toHaveBeenCalledWith(expect.any(Function));
    expect(view.bindGuestAccess).toHaveBeenCalledWith(expect.any(Function));
    expect(view.bindDistrictSelection).toHaveBeenCalledWith(expect.any(Function));
    expect(view.bindManualLocationSelection).toHaveBeenCalledWith(
      expect.any(Function),
    );
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
      getReports: jest.fn(() => []),
      createReport: jest.fn(),
      likeReport: jest.fn(),
    };
    const view = {
      showLogin: jest.fn(),
      bindLogin: jest.fn(),
      bindGuestAccess: jest.fn(),
      bindDistrictSelection: jest.fn(),
      bindCreateReport: jest.fn(),
      bindLikeReport: jest.fn(),
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

  it('deberia renderizar ubicaciones manuales al mostrar el home', () => {
    const session = {
      name: 'Invitado',
      accessType: 'guest',
    };
    const locationOptions = [
      {
        value: 'Zona Aranjuez Alto (SubDistrito 25)',
        label: 'Zona Aranjuez Alto (SubDistrito 25)',
        districtId: '1',
      },
    ];
    const model = {
      loginAsGuest: jest.fn(() => session),
      getDistrictOptions: jest.fn(() => []),
      getLocationOptions: jest.fn(() => locationOptions),
      getReports: jest.fn(() => []),
    };
    const view = {
      showLogin: jest.fn(),
      bindLogin: jest.fn(),
      bindGuestAccess: jest.fn(),
      bindDistrictSelection: jest.fn(),
      bindCreateReport: jest.fn(),
      showHome: jest.fn(),
      renderDistrictOptions: jest.fn(),
      renderLocationOptions: jest.fn(),
      showInitialMessage: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.initialize();

    const guestHandler = view.bindGuestAccess.mock.calls[0][0];
    guestHandler();

    expect(view.renderLocationOptions).toHaveBeenCalledWith(locationOptions);
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
      getReports: jest.fn(() => []),
    };
    const view = {
      showLogin: jest.fn(),
      bindLogin: jest.fn(),
      bindGuestAccess: jest.fn(),
      bindDistrictSelection: jest.fn(),
      bindCreateReport: jest.fn(),
      bindLikeReport: jest.fn(),
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

  it('deberia mostrar el horario cuando existe la ubicacion manual', () => {
    const schedule = {
      district: 'Distrito 1',
      selectedLocation: 'Zona Aranjuez Alto (SubDistrito 25)',
      days: 'Lunes, miercoles y viernes',
      time: '07:00',
    };
    const model = {
      getScheduleByManualLocation: jest.fn(() => schedule),
    };
    const view = {
      showSchedule: jest.fn(),
      showInitialMessage: jest.fn(),
      showScheduleNotFound: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.showScheduleForManualLocation(
      'Zona Aranjuez Alto (SubDistrito 25)',
    );

    expect(model.getScheduleByManualLocation).toHaveBeenCalledWith(
      'Zona Aranjuez Alto (SubDistrito 25)',
    );
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

  it('deberia crear reporte desde presenter', () => {
  const model = {
    createReport: jest.fn(),
    getReports: jest.fn(() => []),
  };

  const view = {
    showLogin: jest.fn(),
    bindLogin: jest.fn(),
    bindGuestAccess: jest.fn(),
    bindDistrictSelection: jest.fn(),
    bindCreateReport: jest.fn(),
    bindLikeReport: jest.fn(),
    showHome: jest.fn(),
    renderDistrictOptions: jest.fn(),
    showInitialMessage: jest.fn(),
    renderReports: jest.fn(),
  };

  const presenter = new CollectionSchedulePresenter({ model, view });

  presenter.initialize();

  const handler = view.bindCreateReport.mock.calls[0][0];

  handler({ description: 'Basura', image: '' });

  expect(model.createReport).toHaveBeenCalled();
  });

  it('deberia confirmar el reporte creado con el usuario de la sesion', () => {
    const session = {
      name: 'admin',
      accessType: 'registered',
    };
    const report = {
      description: 'Basura',
      district: 'Distrito 2',
      userName: 'admin',
      createdAt: new Date('2026-05-17T10:30:00'),
    };
    const model = {
      login: jest.fn(() => session),
      getDistrictOptions: jest.fn(() => []),
      getReports: jest.fn(() => []),
      createReport: jest.fn(() => report),
      likeReport: jest.fn(),
    };
    const view = {
      showLogin: jest.fn(),
      bindLogin: jest.fn(),
      bindGuestAccess: jest.fn(),
      bindDistrictSelection: jest.fn(),
      bindCreateReport: jest.fn(),
      bindLikeReport: jest.fn(),
      showHome: jest.fn(),
      renderDistrictOptions: jest.fn(),
      showInitialMessage: jest.fn(),
      renderReports: jest.fn(),
      showReportConfirmation: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.initialize();
    view.bindLogin.mock.calls[0][0]({ username: 'admin', password: '123456' });
    view.bindCreateReport.mock.calls[0][0]({
      description: 'Basura',
      image: '',
      district: 'Distrito 2',
    });

    expect(model.createReport).toHaveBeenCalledWith({
      description: 'Basura',
      image: '',
      district: 'Distrito 2',
      userName: 'admin',
    });
    expect(view.showReportConfirmation).toHaveBeenCalledWith(report);
  });

  it('deberia mostrar error cuando falla la creacion del reporte', () => {
    const model = {
      createReport: jest.fn(() => {
        throw new Error('storage failed');
      }),
      getReports: jest.fn(() => []),
    };
    const view = {
      showReportError: jest.fn(),
      renderReports: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });

    presenter.createReport({ description: 'Basura', image: '' });

    expect(view.showReportError).toHaveBeenCalledWith(
      'Error al enviar el reporte, intente nuevamente',
    );
    expect(view.renderReports).not.toHaveBeenCalled();
  });

});
