import {
  createDistrictOptions,
  schedulesByDistrict,
} from '../domain/schedules.js';

export default class StaticScheduleRepository {
  getDistrictOptions() {
    return createDistrictOptions();
  }

  getScheduleByDistrict(districtId) {
    return schedulesByDistrict[districtId] || null;
  }
}
