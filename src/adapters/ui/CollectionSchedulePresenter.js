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
    if (this.view.bindManualLocationSelection) {
      this.view.bindManualLocationSelection((location) => {
        this.showScheduleForManualLocation(location);
      });
    }
    this.view.bindCreateReport((data) => this.createReport(data));
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
    const locationOptions = this.model.getLocationOptions
      ? this.model.getLocationOptions()
      : [];

    this.view.showHome(session);
    this.view.renderDistrictOptions(options);
    if (this.view.renderLocationOptions) {
      this.view.renderLocationOptions(locationOptions);
    }
    this.view.showInitialMessage();

    if (this.model.getReports && this.view.renderReports) {
      const reports = this.model.getReports();
      this.view.renderReports(reports, (id) => this.likeReport(id));
    }
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

  showScheduleForManualLocation(location) {
    if (!location) {
      this.view.showInitialMessage();
      return;
    }

    const schedule = this.model.getScheduleByManualLocation(location);

    if (!schedule) {
      this.view.showScheduleNotFound();
      return;
    }

    this.view.showSchedule(schedule);
  }

  createReport(data) {
    this.model.createReport(data);
    this.renderReports();
  }

  likeReport(id) {
    this.model.likeReport(id);
    this.renderReports();
  }

  renderReports() {
    const reports = this.model.getReports();
    this.view.renderReports(reports, (id) => this.likeReport(id));
  }
}
