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

  expect(model.getScheduleByDistrict('5')).toMatchObject({
    district: 'Distrito 5',
    days: 'Lunes, miercoles y viernes',
    time: '10:00',
  });
});

  it('deberia devolver las zonas del distrito 1', () => {
    const model = new CollectionScheduleModel();

    expect(model.getScheduleByDistrict('1')).toMatchObject({
      district: 'Distrito 1',
      zones: [
        'Zona Aranjuez Alto (SubDistrito 25)',
        'Zona Mesadilla (SubDistrito 26)',
      ],
    });
  });
  

  it('deberia devolver null cuando el distrito no existe', () => {
    const model = new CollectionScheduleModel();

    expect(model.getScheduleByDistrict('20')).toBeNull();
  });
  it('deberia devolver la primera zona del distrito 2', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('2').district).toBe('Distrito 2');
  expect(model.getScheduleByDistrict('2').zones).toContain(
    'Zona Mayorazgo (SubDistrito 01)',
  );
});

it('deberia devolver la segunda zona del distrito 2', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('2').zones).toContain(
    'Zona Condebamba (SubDistrito 22)',
  );
});

it('deberia devolver la tercera zona del distrito 2', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('2').zones).toContain(
    'Zona Temporal Pampa (SubDistrito 23)',
  );
});

it('deberia devolver la cuarta zona del distrito 2', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('2').zones).toContain(
    'Zona Queru Queru Alto (SubDistrito 24)',
  );
});

it('deberia devolver la primera zona del distrito 3', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('3').district).toBe('Distrito 3');
  expect(model.getScheduleByDistrict('3').zones).toContain(
    'Zona Sarcobamba (SubDistrito 21)',
  );
});

it('deberia devolver la segunda zona del distrito 3', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('3').zones).toContain(
    'Zona Chiquicollo (SubDistrito 37)',
  );
});

it('deberia devolver la primera zona del distrito 4', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('4').district).toBe('Distrito 4');
  expect(model.getScheduleByDistrict('4').zones).toContain(
    'Zona Chimba (SubDistrito 10)',
  );
});

it('deberia devolver la segunda zona del distrito 4', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('4').zones).toContain(
    'Zona Villa Bush (SubDistrito 27)',
  );
});

it('deberia devolver la tercera zona del distrito 4', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('4').zones).toContain(
    'Zona Coña coña (SubDistrito 28)',
  );
});

it('deberia devolver la primera zona del distrito 5', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('5').district).toBe('Distrito 5');
  expect(model.getScheduleByDistrict('5').zones).toContain(
    'Zona La Maica (SubDistrito 14)',
  );
});

it('deberia devolver la segunda zona del distrito 5', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('5').zones).toContain(
    'Zona Jaihuayco (SubDistrito 15)',
  );
});

it('deberia devolver la tercera zona del distrito 5', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('5').zones).toContain(
    'Zona Lacma (SubDistrito 17)',
  );
});

it('deberia devolver la cuarta zona del distrito 5', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('5').zones).toContain(
    'Zona Ticti (SubDistrito 18)',
  );
});

it('deberia devolver la quinta zona del distrito 5', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('5').zones).toContain(
    'Zona Valle Hermoso (SubDistrito 20)',
  );
});

it('deberia devolver la primera zona del distrito 6', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('6').district).toBe('Distrito 6');
  expect(model.getScheduleByDistrict('6').zones).toContain(
    'Zona Alalay Norte (SubDistrito 16)',
  );
});

it('deberia devolver la primera zona del distrito 7', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('7').district).toBe('Distrito 7');
  expect(model.getScheduleByDistrict('7').zones).toContain(
    'Zona Alalay Sud (SubDistrito 19)',
  );
});

it('deberia devolver la primera zona del distrito 8', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('8').district).toBe('Distrito 8');
  expect(model.getScheduleByDistrict('8').zones).toContain(
    'Zona Uspha Uspha (SubDistrito 34)',
  );
});

it('deberia devolver la primera zona del distrito 9', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('9').district).toBe('Distrito 9');
  expect(model.getScheduleByDistrict('9').zones).toContain(
    'Zona Tamborada Pukarita (SubDistrito 29)',
  );
});

it('deberia devolver la segunda zona del distrito 9', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('9').zones).toContain(
    'Zona 1° de Mayo (SubDistrito 30)',
  );
});

it('deberia devolver la tercera zona del distrito 9', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('9').zones).toContain(
    'Zona Pukara Grande Norte (SubDistrito 31)',
  );
});

it('deberia devolver la cuarta zona del distrito 9', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('9').zones).toContain(
    'Zona Pukara Grande Sur (SubDistrito 35)',
  );
});

it('deberia devolver la quinta zona del distrito 9', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('9').zones).toContain(
    'Zona Pukara Grande Oeste (SubDistrito 36)',
  );
});

it('deberia devolver la primera zona del distrito 10', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('10').district).toBe('Distrito 10');
  expect(model.getScheduleByDistrict('10').zones).toContain(
    'Zona Noroeste (SubDistrito 07)',
  );
});

it('deberia devolver la segunda zona del distrito 10', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('10').zones).toContain(
    'Zona Noreste (SubDistrito 08)',
  );
});

it('deberia devolver la tercera zona del distrito 10', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('10').zones).toContain(
    'Zona Sudoeste (SubDistrito 11)',
  );
});

it('deberia devolver la cuarta zona del distrito 10', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('10').zones).toContain(
    'Zona Sudeste (SubDistrito 12)',
  );
});

it('deberia devolver la primera zona del distrito 11', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('11').district).toBe('Distrito 11');
  expect(model.getScheduleByDistrict('11').zones).toContain(
    'Zona Muyurina (SubDistrito 09)',
  );
});

it('deberia devolver la segunda zona del distrito 11', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('11').zones).toContain(
    'Zona Las Cuadras (SubDistrito 13)',
  );
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

    it('deberia incrementar likes', () => {
      const model = new CollectionScheduleModel();

      const report = model.createReport({
        description: 'Basura',
        image: '',
      });

      const updated = model.likeReport(report.id);

      expect(updated.likes).toBe(1);
    });
});

beforeEach(() => {
  global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = value;
    },
  };
});
