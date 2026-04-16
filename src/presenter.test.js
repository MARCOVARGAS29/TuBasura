import CollectionSchedulePresenter from './presenter.js';

describe('CollectionSchedulePresenter', () => {
  it('deberia inicializar la vista con opciones y mensaje inicial', () => {
    const options = [{ value: '1', label: 'Distrito 1' }];
    const model = {
      getDistrictOptions: jest.fn(() => options),
    };
    const view = {
      renderDistrictOptions: jest.fn(),
      showInitialMessage: jest.fn(),
      bindDistrictSelection: jest.fn(),
    };

    const presenter = new CollectionSchedulePresenter({ model, view });
    presenter.initialize();

    expect(view.renderDistrictOptions).toHaveBeenCalledWith(options);
    expect(view.showInitialMessage).toHaveBeenCalled();
    expect(view.bindDistrictSelection).toHaveBeenCalledWith(expect.any(Function));
  });
});
