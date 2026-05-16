import {
  createDistrictOptions,
  schedulesByDistrict,
} from '../domain/schedules.js';

export default class DistrictScheduleRepository {
  getDistrictOptions() {
    return createDistrictOptions();
  }

  getScheduleByDistrict(districtId) {
    return schedulesByDistrict[districtId] || null;
  }
}
