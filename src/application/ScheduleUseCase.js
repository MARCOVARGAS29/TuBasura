export default class ScheduleUseCase {
  constructor({ scheduleRepository }) {
    this.scheduleRepository = scheduleRepository;
  }

  getDistrictOptions() {
    return this.scheduleRepository.getDistrictOptions();
  }

  getLocationOptions() {
    return this.scheduleRepository.getLocationOptions();
  }

  getScheduleByDistrict(districtId) {
    return this.scheduleRepository.getScheduleByDistrict(districtId);
  }

  getScheduleByManualLocation(location) {
    const schedule = this.scheduleRepository.getScheduleByManualLocation(location);

    if (!schedule) {
      return null;
    }

    return {
      ...schedule,
      selectedLocation: location,
    };
  }
}
