export default class ReportUseCase {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  getReports(options = {}) {
    let reports = this.reportRepository.getReports();

    if (options.district) {
      reports = reports.filter((report) => report.district === options.district);
    }

    if (options.sortBy === 'recent') {
      return [...reports].sort(
        (firstReport, secondReport) =>
          new Date(secondReport.createdAt) - new Date(firstReport.createdAt),
      );
    }

    if (options.sortBy === 'likes') {
      return [...reports].sort(
        (firstReport, secondReport) => secondReport.likes - firstReport.likes,
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