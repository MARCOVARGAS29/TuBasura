import ScheduleRepository from '../application/ports/ScheduleRepository.js';
import {
  createDistrictOptions,
  createLocationOptions,
  schedulesByDistrict,
} from '../domain/schedules.js';

export default class DistrictScheduleRepository extends ScheduleRepository {
  getDistrictOptions() {
    return createDistrictOptions();
  }

  getLocationOptions() {
    return createLocationOptions();
  }

  getScheduleByDistrict(districtId) {
    return schedulesByDistrict[districtId] || null;
  }
}
