import ReportRepository from '../application/ports/ReportRepository.js';
import { createReport, incrementReportLikes } from '../domain/report.js';

export default class LocalStorageReportRepository extends ReportRepository {
  constructor({ storage, now = () => Date.now().toString() }) {
    super();
    this.storage = storage;
    this.generateId = now;
    this.reports = this.loadReports();
  }

  loadReports() {
    const stored = this.storage.getItem('reports');
    if (!stored) {
      return [];
    }
    return JSON.parse(stored);
  }

  getReports() {
    return this.reports;
  }

  createReport(data) {
    const newReport = createReport({
      ...data,
      id: this.generateId(),
    });

    this.reports.push(newReport);
    this.persistReports();

    return newReport;
  }

  incrementReportLikes(id) {
    const reportIndex = this.reports.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      return null;
    }

    const updatedReport = incrementReportLikes(this.reports[reportIndex]);
    this.reports[reportIndex] = updatedReport;
    this.persistReports();

    return updatedReport;
  }

  persistReports() {
    this.storage.setItem('reports', JSON.stringify(this.reports));
  }

  persistReports() {
    this.storage.setItem('reports', JSON.stringify(this.reports));
  }
}
