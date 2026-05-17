import createCollectionScheduleUseCases from './application/createCollectionScheduleUseCases.js';
import {
  createDistrictOptions,
  createLocationOptions,
  schedulesByDistrict,
} from './domain/schedules.js';

export default class CollectionScheduleModel {
  constructor({ storage = globalThis.localStorage, now } = {}) {
    return createCollectionScheduleUseCases({ storage, now });
  }
}

export { createDistrictOptions, createLocationOptions, schedulesByDistrict };
