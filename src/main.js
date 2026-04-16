import CollectionScheduleModel from './model.js';
import CollectionSchedulePresenter from './presenter.js';
import CollectionScheduleView from './view.js';
import './styles.css';

const districtSelect = document.querySelector('#district-select');
const resultContainer = document.querySelector('#schedule-result');

const model = new CollectionScheduleModel();
const view = new CollectionScheduleView({ districtSelect, resultContainer });
const presenter = new CollectionSchedulePresenter({ model, view });

presenter.initialize();
