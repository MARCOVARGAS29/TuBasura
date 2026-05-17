import Schedule from './Schedule.js';

export default class District {
  #name;
  #schedules;

  constructor(name, schedules = []) {
    if (!name || name.trim() === '') {
      throw new Error('District name cannot be empty');
    }
    this.#name = name;
    this.#schedules = [...schedules];
  }

  getName() {
    return this.#name;
  }

  getSchedules() {
    return [...this.#schedules];
  }

  getSchedule() {
    return this.#schedules[0] || null;
  }

  addSchedule(schedule) {
    if (!(schedule instanceof Schedule)) {
      throw new Error('Must be Schedule instance');
    }
    this.#schedules.push(schedule);
  }

  getZonesSet() {
    return [...new Set(this.#schedules.map(s => s.getZone()))];
  }
}
