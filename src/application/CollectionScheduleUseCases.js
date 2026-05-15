export default class CollectionScheduleUseCases {
  constructor({ authRepository, scheduleRepository, reportRepository }) {
    this.authRepository = authRepository;
    this.scheduleRepository = scheduleRepository;
    this.reportRepository = reportRepository;
  }

  login(credentials) {
    return this.authRepository.login(credentials);
  }

  loginAsGuest() {
    return this.authRepository.loginAsGuest();
  }

  getDistrictOptions() {
    return this.scheduleRepository.getDistrictOptions();
  }

  getScheduleByDistrict(districtId) {
    return this.scheduleRepository.getScheduleByDistrict(districtId);
  }

  getReports() {
    return this.reportRepository.getReports();
  }

  createReport(data) {
    return this.reportRepository.createReport(data);
  }

  likeReport(id) {
    return this.reportRepository.likeReport(id);
  }
}
