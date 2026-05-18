export default class ReportUseCase {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  getReports(options = {}) {
    const reports = this.reportRepository.getReports();

    if (options.sortBy === 'recent') {
      return [...reports].sort(
        (firstReport, secondReport) =>
          new Date(secondReport.createdAt) - new Date(firstReport.createdAt),
      );
    }

    return reports;
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