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

  showScheduleForDistrict(districtId) {
    if (!districtId) {
      this.view.showInitialMessage();
      return;
    }

    const schedule = this.model.getScheduleByDistrict(districtId);

    if (!schedule) {
      this.view.showScheduleNotFound();
      return;
    }

    this.view.showSchedule(schedule);
  }
}
