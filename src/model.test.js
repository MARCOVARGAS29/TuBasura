import CollectionScheduleModel, {
  createDistrictOptions,
  createLocationOptions,
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

  it('deberia crear opciones de ubicacion manual desde las zonas', () => {
    const options = createLocationOptions();

    expect(options).toContainEqual({
      value: 'Zona Aranjuez Alto (SubDistrito 25)',
      label: 'Zona Aranjuez Alto (SubDistrito 25)',
      districtId: '1',
    });
  });

  it('deberia devolver opciones de ubicacion manual desde el modelo', () => {
    const model = new CollectionScheduleModel();

    expect(model.getLocationOptions()).toContainEqual({
      value: 'Zona Aranjuez Alto (SubDistrito 25)',
      label: 'Zona Aranjuez Alto (SubDistrito 25)',
      districtId: '1',
    });
  });

  it('deberia devolver el horario del distrito seleccionado', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('5')).toMatchObject({
    district: 'Distrito 5',
    days: 'Lunes, miercoles y viernes',
    time: '10:00',
  });
});

  it('deberia devolver el horario desde una ubicacion manual', () => {
    const model = new CollectionScheduleModel();

    expect(
      model.getScheduleByManualLocation('Zona Aranjuez Alto (SubDistrito 25)'),
    ).toMatchObject({
      district: 'Distrito 1',
      selectedLocation: 'Zona Aranjuez Alto (SubDistrito 25)',
      days: 'Lunes, miercoles y viernes',
      time: '07:00',
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

it('deberia devolver la primera zona del distrito 12', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('12').district).toBe('Distrito 12');
  expect(model.getScheduleByDistrict('12').zones).toContain(
    'Zona Sarco (SubDistrito 02)',
  );
});

it('deberia devolver la segunda zona del distrito 12', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('12').zones).toContain(
    'Zona Cala Cala (SubDistrito 03)',
  );
});

it('deberia devolver la tercera zona del distrito 12', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('12').zones).toContain(
    'Zona Queru Queru (SubDistrito 04)',
  );
});

it('deberia devolver la cuarta zona del distrito 12', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('12').zones).toContain(
    'Zona Tupuraya (SubDistrito 05)',
  );
});

it('deberia devolver la quinta zona del distrito 12', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('12').zones).toContain(
    'Zona Hipódromo (SubDistrito 06)',
  );
});

it('deberia devolver la primera zona del distrito 13', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('13').district).toBe('Distrito 13');
  expect(model.getScheduleByDistrict('13').zones).toContain(
    'Zona Parque Nacional Tunari',
  );
});

it('deberia devolver la primera zona del distrito 14', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('14').district).toBe('Distrito 14');
  expect(model.getScheduleByDistrict('14').zones).toContain(
    'Zona Distrito 14',
  );
});

it('deberia devolver la primera zona del distrito 15', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('15').district).toBe('Distrito 15');
  expect(model.getScheduleByDistrict('15').zones).toContain(
    'Zona Valle Hermoso Oeste (SubDistrito 32)',
  );
});

it('deberia devolver la segunda zona del distrito 15', () => {
  const model = new CollectionScheduleModel();

  expect(model.getScheduleByDistrict('15').zones).toContain(
    'Zona Khara Khara Arrumani (SubDistrito 33)',
  );
});

  it('deberia tener horarios definidos para todos los distritos', () => {
    expect(Object.keys(schedulesByDistrict)).toHaveLength(15);
  });
});

describe('reportes', () => {
    it('deberia crear un reporte con usuario, distrito, fecha y hora', () => {
      const model = new CollectionScheduleModel();

      const report = model.createReport({
        description: 'Basura en la calle',
        image: '',
        userName: 'admin',
        district: 'Distrito 3',
      });

      expect(report.userName).toBe('admin');
      expect(report.district).toBe('Distrito 3');
      expect(report.createdAt).toBeDefined();
    });

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

      const updated = model.incrementReportLikes(report.id);

      expect(updated.likes).toBe(1);
    });

    it('deberia permitir solo un like por usuario en el mismo reporte', () => {
      const model = new CollectionScheduleModel();

      const report = model.createReport({
        description: 'Basura',
        image: '',
      });

      const firstLike = model.likeReport(report.id, 'admin');
      const secondLike = model.likeReport(report.id, 'admin');

      expect(firstLike.likes).toBe(1);
      expect(secondLike.likes).toBe(1);
      expect(secondLike.likedBy).toEqual(['admin']);
    });
    it('deberia ordenar reportes por mas recientes', () => {
  const model = new CollectionScheduleModel();

  model.createReport({
    description: 'Reporte antiguo',
    image: '',
    district: 'Distrito 1',
    createdAt: '2026-05-16T10:00:00',
  });

  model.createReport({
    description: 'Reporte reciente',
    image: '',
    district: 'Distrito 2',
    createdAt: '2026-05-17T10:00:00',
  });

  const reports = model.getReports({ sortBy: 'recent' });

  expect(reports[0].description).toBe('Reporte reciente');
  expect(reports[1].description).toBe('Reporte antiguo');
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


it('deberia persistir el like y encontrar el reporte al recargar', () => {
  const storage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = value; },
  };

  const repo1 = new CollectionScheduleModel({ storage });
  const report = repo1.createReport({ description: 'Prueba', image: '' });
  const id = report.id;

  const repo2 = new CollectionScheduleModel({ storage });
  const updated = repo2.likeReport(id);

  expect(updated).not.toBeNull();
  expect(updated.likes).toBe(1);
});
