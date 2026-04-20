import CollectionScheduleModel, {
  createDistrictOptions,
  schedulesByDistrict,
} from './model.js';

describe('CollectionScheduleModel', () => {
  it('deberia iniciar sesion con credenciales validas', () => {
    const model = new CollectionScheduleModel();

    expect(
      model.login({
        username: 'admin',
        password: '123456',
      }),
    ).toEqual({
      name: 'admin',
      accessType: 'registered',
    });
  });

  it('deberia permitir entrar como invitado', () => {
    const model = new CollectionScheduleModel();

    expect(model.loginAsGuest()).toEqual({
      name: 'Invitado',
      accessType: 'guest',
    });
  });

  it('deberia crear 15 opciones de distrito', () => {
    const options = createDistrictOptions();

    expect(options).toHaveLength(15);
    expect(options[0]).toEqual({ value: '1', label: 'Distrito 1' });
    expect(options[14]).toEqual({ value: '15', label: 'Distrito 15' });
  });

  it('deberia devolver el horario del distrito seleccionado', () => {
    const model = new CollectionScheduleModel();

    expect(model.getScheduleByDistrict('5')).toEqual({
      district: 'Distrito 5',
      days: 'Lunes, miercoles y viernes',
      time: '10:00',
    });
  });

  it('deberia devolver null cuando el distrito no existe', () => {
    const model = new CollectionScheduleModel();

    expect(model.getScheduleByDistrict('20')).toBeNull();
  });

  it('deberia tener horarios definidos para todos los distritos', () => {
    expect(Object.keys(schedulesByDistrict)).toHaveLength(15);
  });
});

describe('reportes', () => {
    it('deberia crear un reporte con likes en 0', () => {
      const model = new CollectionScheduleModel();

      const report = model.createReport({
        description: 'Basura en la calle',
        image: '',
      });

      expect(report.description).toBe('Basura en la calle');
      expect(report.likes).toBe(0);
    });

    it('deberia guardar el reporte en memoria', () => {
      const model = new CollectionScheduleModel();

      model.createReport({
        description: 'Basura',
        image: '',
      });

      const reports = model.getReports();

      expect(reports.length).toBe(1);
    });
});