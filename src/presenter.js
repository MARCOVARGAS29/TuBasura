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
    const session = this.model.login(credentials);

    if (!session) {
      return null;
    }

    this.showHome(session);
    return session;
  }

  enterAsGuest() {
    const session = this.model.loginAsGuest();
    this.showHome(session);

    return session;
  }

  showHome(session) {
    const options = this.model.getDistrictOptions();

    this.view.showHome(session);
    this.view.renderDistrictOptions(options);
    this.view.showInitialMessage();
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
