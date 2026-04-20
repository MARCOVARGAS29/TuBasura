import CollectionScheduleModel from './model.js';
import CollectionSchedulePresenter from './presenter.js';
import CollectionScheduleView from './view.js';
import './styles.css';

function initializeApp() {
  const model = new CollectionScheduleModel();
  const view = new CollectionScheduleView({
    loginSection: document.querySelector('#login-screen'),
    homeSection: document.querySelector('#home-screen'),
    welcomeMessage: document.querySelector('#welcome-message'),
    districtSelect: document.querySelector('#district-select'),
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
