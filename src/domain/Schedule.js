export default class Schedule {
  #zone;
  #day;
  #time;
  #district;

  constructor(zone, day, time, district) {
    if (!zone || zone.trim() === '') {
      throw new Error('Zone cannot be empty');
    }
    if (!day || day.trim() === '') {
      throw new Error('Day cannot be empty');
    }
    if (!time || time.trim() === '') {
      throw new Error('Time cannot be empty');
    }
    if (!district || district.trim() === '') {
      throw new Error('District cannot be empty');
    }

    this.#zone = zone;
    this.#day = day;
    this.#time = time;
    this.#district = district;
  }

  getZone() {
    return this.#zone;
  }

  getDay() {
    return this.#day;
  }

  getTime() {
    return this.#time;
  }

  getDistrict() {
    return this.#district;
  }

  getScheduleTime() {
    return `${this.#day} a las ${this.#time}`;
  }

  isValid() {
    return true;
  }
}
