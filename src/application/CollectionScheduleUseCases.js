import AuthUseCase from './AuthUseCase.js';
import ScheduleUseCase from './ScheduleUseCase.js';
import ReportUseCase from './ReportUseCase.js';

export default class CollectionScheduleUseCases {
  #auth;
  #schedule;
  #report;

  constructor({ authRepository, scheduleRepository, reportRepository }) {
    this.#auth = new AuthUseCase({ authRepository });
    this.#schedule = new ScheduleUseCase({ scheduleRepository });
    this.#report = new ReportUseCase({ reportRepository });
  }

  // Accessors for separated use cases
  get auth() {
    return this.#auth;
  }

  get schedule() {
    return this.#schedule;
  }

  get report() {
    return this.#report;
  }

  // Backward compatibility delegation methods
  login(credentials) {
    return this.#auth.login(credentials);
  }

  loginAsGuest() {
    return this.#auth.loginAsGuest();
  }

  getDistrictOptions() {
    return this.#schedule.getDistrictOptions();
  }

  getScheduleByDistrict(districtId) {
    return this.#schedule.getScheduleByDistrict(districtId);
  }

  getReports() {
    return this.#report.getReports();
  }

  createReport(data) {
    return this.#report.createReport(data);
  }

  incrementReportLikes(id) {
    return this.#report.incrementReportLikes(id);
  }

  likeReport(id) {
    return this.#report.likeReport(id);
  }
}
