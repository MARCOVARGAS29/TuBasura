import CollectionScheduleView from './view.js';

describe('CollectionScheduleView', () => {
  it('deberia renderizar las opciones en el select', () => {
    const districtSelect = {
      append: jest.fn(),
    };
    const resultContainer = {
      innerHTML: '',
    };
    const originalDocument = global.document;
    global.document = {
      createElement: jest.fn(() => ({ value: '', textContent: '' })),
    };

    const view = new CollectionScheduleView({ districtSelect, resultContainer });
    view.renderDistrictOptions([{ value: '1', label: 'Distrito 1' }]);

    expect(global.document.createElement).toHaveBeenCalledWith('option');
    expect(districtSelect.append).toHaveBeenCalled();

    global.document = originalDocument;
  });
});
