import createCollectionScheduleUseCases from './application/createCollectionScheduleUseCases.js';
import CollectionSchedulePresenter from './adapters/ui/CollectionSchedulePresenter.js';
import CollectionScheduleView from './adapters/ui/CollectionScheduleView.js';
import './styles.css';

function initializeApp() {
  const model = createCollectionScheduleUseCases();
  const view = new CollectionScheduleView({
    loginSection: document.querySelector('#login-screen'),
    homeSection: document.querySelector('#home-screen'),
    welcomeMessage: document.querySelector('#welcome-message'),
    districtSelect: document.querySelector('#district-select'),
    manualLocationSelect: document.querySelector('#manual-location-select'),
    manualSelectionPanel: document.querySelector('#manual-selection-panel'),
    manualSelectionLink: document.querySelector('#manual-selection-link'),
    reportsPanel: document.querySelector('#reports-panel'),
    schedulePanel: document.querySelector('#schedule-page'),
    reportsLink: document.querySelector('#reports-link'),
    resultContainer: document.querySelector('#schedule-result'),
    loginForm: document.querySelector('#login-form'),
    guestButton: document.querySelector('#guest-access-button'),
    usernameInput: document.querySelector('#username'),
    passwordInput: document.querySelector('#password'),
    reportForm: document.querySelector('#report-form'),
    reportDescription: document.querySelector('#report-description'),
    reportImage: document.querySelector('#report-image'),
    reportsList: document.querySelector('#reports-list'),
  });
  const presenter = new CollectionSchedulePresenter({ model, view });

  presenter.initialize();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
