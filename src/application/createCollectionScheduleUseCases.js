import CollectionScheduleUseCases from './CollectionScheduleUseCases.js';
import InMemoryAuthRepository from '../infrastructure/InMemoryAuthRepository.js';
import LocalStorageReportRepository from '../infrastructure/LocalStorageReportRepository.js';
import StaticScheduleRepository from '../infrastructure/StaticScheduleRepository.js';

function createCollectionScheduleUseCases({
  storage = globalThis.localStorage,
  now = () => Date.now().toString(),
} = {}) {
  return new CollectionScheduleUseCases({
    authRepository: new InMemoryAuthRepository(),
    scheduleRepository: new StaticScheduleRepository(),
    reportRepository: new LocalStorageReportRepository({ storage, now }),
  });
}

export default createCollectionScheduleUseCases;
