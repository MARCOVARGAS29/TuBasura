import CollectionScheduleModel, { createDistrictOptions } from './model.js';

describe('CollectionScheduleModel', () => {
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
});
