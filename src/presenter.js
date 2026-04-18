export default class CollectionSchedulePresenter {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }

  initialize() {
    this.view.showLogin();
    this.view.bindLogin((credentials) => {
      this.login(credentials);
    });
    this.view.bindGuestAccess(() => {
      this.enterAsGuest();
    });
    this.view.bindDistrictSelection((districtId) => {
      this.showScheduleForDistrict(districtId);
    });
  }

  login(credentials) {
    return this.model.login(credentials);
  }

  enterAsGuest() {
    return this.model.loginAsGuest();
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
