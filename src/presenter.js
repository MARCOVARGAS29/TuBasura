export default class CollectionSchedulePresenter {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  initialize() {
    const options = this.model.getDistrictOptions();
    this.view.renderDistrictOptions(options);
    this.view.showInitialMessage();
    this.view.bindDistrictSelection(() => {});
  }
}
