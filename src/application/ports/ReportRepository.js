/**
 * ReportRepository Port (Interface)
 * Defines the contract for report data access and persistence
 */
export default class ReportRepository {
  /**
   * Get all reports
   * @returns {Array} - Array of Report objects
   */
  getReports() {
    throw new Error('Method getReports() must be implemented');
  }

  /**
   * Create a new report
   * @param {Object} data - Report data { description, image, userId, scheduleId }
   * @returns {Object} - Created Report object
   */
  createReport(data) {
    throw new Error('Method createReport() must be implemented');
  }

  /**
   * Increment the likes count for a report
   * @param {string} id - Report identifier
   * @returns {Object|null} - Updated Report object or null if not found
   */
  incrementReportLikes(id) {
    throw new Error('Method incrementReportLikes() must be implemented');
  }
}
