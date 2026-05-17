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

  likeReport(id) {
    return this.reportRepository.incrementReportLikes(id);
  }

  incrementReportLikes(id) {
    return this.reportRepository.incrementReportLikes(id);
  }
}
