/**
 * ScheduleRepository Port (Interface)
 * Defines the contract for schedule data access
 */
export default class ScheduleRepository {
  /**
   * Get all district options
   * @returns {Array} - Array of { value, label }
   */
  getDistrictOptions() {
    throw new Error('Method getDistrictOptions() must be implemented');
  }

  /**
   * Get all manual location options
   * @returns {Array} - Array of { value, label, districtId }
   */
  getLocationOptions() {
    throw new Error('Method getLocationOptions() must be implemented');
  }

  /**
   * Get schedule for a specific district
   * @param {string} districtId - District identifier
   * @returns {Object|null} - Schedule object or null if not found
   */
  getScheduleByDistrict(_districtId) {
    throw new Error('Method getScheduleByDistrict() must be implemented');
  }

  /**
   * Get schedule for a manually selected location
   * @param {string} location - Location name
   * @returns {Object|null} - Schedule object or null if not found
   */
  getScheduleByManualLocation(_location) {
    throw new Error('Method getScheduleByManualLocation() must be implemented');
  }
}
