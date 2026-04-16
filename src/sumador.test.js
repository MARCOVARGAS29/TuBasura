import { createDistrictOptions } from './model.js';

describe('CollectionScheduleModel', () => {
  it('deberia crear 15 opciones de distrito', () => {
    const options = createDistrictOptions();

    expect(options).toHaveLength(15);
    expect(options[0]).toEqual({ value: '1', label: 'Distrito 1' });
    expect(options[14]).toEqual({ value: '15', label: 'Distrito 15' });
  });
});
