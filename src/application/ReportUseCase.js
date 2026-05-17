export default class ReportUseCase {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  getReports() {
    return this.reportRepository.getReports();
  }

  createReport(data) {
    return this.reportRepository.createReport(data);
  }

  likeReport(id, userName = null) {
    return this.reportRepository.incrementReportLikes(id, userName);
  }

  incrementReportLikes(id, userName = null) {
    return this.reportRepository.incrementReportLikes(id, userName);
  }
}
