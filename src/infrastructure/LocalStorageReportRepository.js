import { createReport, incrementReportLikes } from '../domain/report.js';

export default class LocalStorageReportRepository {
  constructor({ storage, now = () => Date.now().toString() }) {
    this.storage = storage;
    this.generateId = now;
    this.reports = this.loadReports();
  }

  loadReports() {
    return JSON.parse(this.storage.getItem('reports')) || [];
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
