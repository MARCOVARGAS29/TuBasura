export default class ScheduleUseCase {
  constructor({ scheduleRepository }) {
    this.scheduleRepository = scheduleRepository;
  }

  getDistrictOptions() {
    return this.scheduleRepository.getDistrictOptions();
  }

  getScheduleByDistrict(districtId) {
    return this.scheduleRepository.getScheduleByDistrict(districtId);
  }
}
