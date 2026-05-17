import ScheduleRepository from '../application/ports/ScheduleRepository.js';
import {
  createDistrictOptions,
  schedulesByDistrict,
} from '../domain/schedules.js';

export default class DistrictScheduleRepository extends ScheduleRepository {
  getDistrictOptions() {
    return createDistrictOptions();
  }

  getScheduleByDistrict(districtId) {
    return schedulesByDistrict[districtId] || null;
  }
}
