export default class CollectionScheduleView {
  constructor({
    loginSection,
    homeSection,
    welcomeMessage,
    districtSelect,
    resultContainer,
    loginForm,
    guestButton,
    usernameInput,
    passwordInput,
    reportForm,
    reportDescription,
    reportImage,
    reportsList,
  }) {
    this.loginSection = loginSection;
    this.homeSection = homeSection;
    this.welcomeMessage = welcomeMessage;
    this.districtSelect = districtSelect;
    this.resultContainer = resultContainer;
    this.loginForm = loginForm;
    this.guestButton = guestButton;
    this.usernameInput = usernameInput;
    this.passwordInput = passwordInput;
    this.reportForm = reportForm;
    this.reportDescription = reportDescription;
    this.reportImage = reportImage;
    this.reportsList = reportsList;
  }

  showLogin() {
    this.loginSection.hidden = false;
    this.homeSection.hidden = true;
  }

  showHome(session) {
    this.loginSection.hidden = true;
    this.homeSection.hidden = false;
    this.welcomeMessage.textContent = `Bienvenido, ${session.name}`;
  }

  renderDistrictOptions(options) {
    this.districtSelect.innerHTML = '<option value="">Selecciona un distrito</option>';

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      this.districtSelect.append(optionElement);
    });
  }

  bindLogin(handler) {
    this.loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handler({
        username: this.usernameInput.value,
        password: this.passwordInput.value,
      });
    });
  }

  bindGuestAccess(handler) {
    this.guestButton.addEventListener('click', () => {
      handler();
    });
  }

  bindDistrictSelection(handler) {
    this.districtSelect.addEventListener('change', (event) => {
      handler(event.target.value);
    });
  }

  showInitialMessage() {
    this.resultContainer.innerHTML = `
      <h2>Horarios de recoleccion</h2>
      <p>Selecciona un distrito para ver su horario disponible.</p>
    `;
  }

  showSchedule(schedule) {
    this.resultContainer.innerHTML = `
      <h2>${schedule.district}</h2>
      <p><strong>Dias:</strong> ${schedule.days}</p>
      <p><strong>Hora:</strong> ${schedule.time}</p>
    `;
  }

  showScheduleNotFound() {
    this.resultContainer.innerHTML = `
      <h2>Distrito no disponible</h2>
      <p>No existe un horario registrado para el distrito seleccionado.</p>
    `;
  }

  bindCreateReport(handler) {
    this.reportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      handler({
        description: this.reportDescription.value,
        image: this.reportImage.value,
      });

      this.reportForm.reset();
    });
  }

  renderReports(reports, likeHandler) {
    this.reportsList.innerHTML = '';

    reports.forEach((report) => {
      const div = document.createElement('div');
      div.className = 'report-item';

      div.innerHTML = `
        <p>${report.description}</p>
        ${report.image ? `<img src="${report.image}" width="100" />` : ''}
        <p><strong>Likes:</strong> ${report.likes}</p>
        <button data-id="${report.id}">👍 Like</button>
      `;

      div.querySelector('button').addEventListener('click', () => {
        likeHandler(String(report.id));
      });

      this.reportsList.append(div);
    });
  }

}
