export default class CollectionScheduleView {
  constructor({
    loginSection,
    homeSection,
    welcomeMessage,
    districtSelect,
    manualLocationSelect,
    manualSelectionPanel,
    manualSelectionLink,
    reportsPanel,
    schedulePanel,
    reportsLink,
    scheduleLink,
    resultContainer,
    loginForm,
    guestButton,
    usernameInput,
    passwordInput,
    reportForm,
    reportDescription,
    reportDistrict,
    reportImage,
    reportsList,
    reportConfirmation,
    reportModal,
    reportModalOkButton,
  }) {
    this.loginSection = loginSection;
    this.homeSection = homeSection;
    this.welcomeMessage = welcomeMessage;
    this.districtSelect = districtSelect;
    this.manualLocationSelect = manualLocationSelect;
    this.manualSelectionPanel = manualSelectionPanel;
    this.manualSelectionLink = manualSelectionLink;
    this.reportsPanel = reportsPanel;
    this.schedulePanel = schedulePanel;
    this.reportsLink = reportsLink;
    this.scheduleLink = scheduleLink;
    this.resultContainer = resultContainer;
    this.loginForm = loginForm;
    this.guestButton = guestButton;
    this.usernameInput = usernameInput;
    this.passwordInput = passwordInput;
    this.reportForm = reportForm;
    this.reportDescription = reportDescription;
    this.reportDistrict = reportDistrict;
    this.reportImage = reportImage;
    this.reportsList = reportsList;
    this.reportConfirmation = reportConfirmation;
    this.reportModal = reportModal;
    this.reportModalOkButton = reportModalOkButton;
  }

  showLogin() {
    this.loginSection.hidden = false;
    this.homeSection.hidden = true;
  }

  showHome(session) {
    this.loginSection.hidden = true;
    this.homeSection.hidden = false;
    if (this.manualSelectionPanel) {
      this.manualSelectionPanel.hidden = true;
    }
    if (this.reportsPanel) {
      this.reportsPanel.hidden = true;
    }
    if (this.schedulePanel) {
      this.schedulePanel.hidden = false;
    }
    this.welcomeMessage.textContent = `Bienvenido, ${session.name}`;
  }

  renderDistrictOptions(options) {
    this.districtSelect.innerHTML =
      '<option value="">Selecciona un distrito</option>';

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      this.districtSelect.append(optionElement);
    });
  }

  renderLocationOptions(options) {
    this.manualLocationSelect.innerHTML =
      '<option value="">Selecciona una zona</option>';

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      this.manualLocationSelect.append(optionElement);
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

  bindManualLocationSelection(handler) {
    this.manualLocationSelect.addEventListener('change', (event) => {
      handler(event.target.value);
    });
  }

  bindManualSelectionNavigation() {
    if (!this.manualSelectionLink || !this.manualSelectionPanel) {
      return;
    }

    this.manualSelectionLink.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.schedulePanel) {
        this.schedulePanel.hidden = false;
      }
      if (this.reportsPanel) {
        this.reportsPanel.hidden = true;
      }
      this.manualSelectionPanel.hidden = false;
      if (this.manualSelectionPanel.scrollIntoView) {
        this.manualSelectionPanel.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  bindScheduleNavigation() {
    if (!this.scheduleLink || !this.schedulePanel) {
      return;
    }

    this.scheduleLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.schedulePanel.hidden = false;
      if (this.reportsPanel) {
        this.reportsPanel.hidden = true;
      }
      if (this.manualSelectionPanel) {
        this.manualSelectionPanel.hidden = true;
      }
      if (this.schedulePanel.scrollIntoView) {
        this.schedulePanel.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  bindReportModalDismiss() {
    if (!this.reportModalOkButton || !this.reportModal) {
      return;
    }

    this.reportModalOkButton.addEventListener('click', () => {
      this.reportModal.hidden = true;
    });
  }

  bindReportsNavigation() {
    if (!this.reportsLink || !this.reportsPanel) {
      return;
    }

    this.reportsLink.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.schedulePanel) {
        this.schedulePanel.hidden = true;
      }
      if (this.manualSelectionPanel) {
        this.manualSelectionPanel.hidden = true;
      }
      this.reportsPanel.hidden = false;
      if (this.reportsPanel.scrollIntoView) {
        this.reportsPanel.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  showInitialMessage() {
    this.resultContainer.innerHTML = `
      <h2>Horarios de recoleccion</h2>
      <p>Selecciona un distrito para ver su horario disponible.</p>
    `;
  }

  buildZonesHTML(zones) {
    if (!zones || zones.length === 0) {
      return '';
    }

    const zoneItems = zones.map((zone) => `<li>${zone}</li>`).join('');

    return `
      <div class="zones-container">
        <p><strong>Zonas que abarca:</strong></p>
        <ul class="zones-list">${zoneItems}</ul>
      </div>
    `;
  }

  showSchedule(schedule) {
    this.resultContainer.innerHTML = `
      <h2>${schedule.district}</h2>
      ${
        schedule.selectedLocation
          ? `<p><strong>Ubicacion:</strong> ${schedule.selectedLocation}</p>`
          : ''
      }
      <p><strong>Días:</strong> ${schedule.days}</p>
      <p><strong>Hora:</strong> ${schedule.time}</p>
      ${this.buildZonesHTML(schedule.zones)}
    `;
  }

  showScheduleNotFound() {
    this.resultContainer.innerHTML = `
      <h2>Distrito no disponible</h2>
      <p>No existe un horario registrado para el distrito seleccionado.</p>
    `;
  }

  bindCreateReport(handler) {
    this.reportForm.addEventListener('submit', (event) => {
      event.preventDefault();

      handler({
        description: this.reportDescription.value,
        district: this.reportDistrict.value,
        image: this.reportImage.value,
      });

      this.reportForm.reset();
    });
  }

  formatReportDateTime(createdAt) {
    if (!createdAt) {
      return 'Sin fecha';
    }

    const date = createdAt instanceof Date ? createdAt : new Date(createdAt);

    return date.toLocaleString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  showReportConfirmation(report) {
    if (!this.reportConfirmation) {
      return;
    }

    this.reportConfirmation.innerHTML = `
      <div class="confirmation-card">
        <h2>Reporte enviado correctamente</h2>
        <p><strong>Descripcion:</strong> ${report.description}</p>
        <p><strong>Ubicacion:</strong> ${report.district}</p>
        <p><strong>Fecha y hora:</strong> ${this.formatReportDateTime(
          report.createdAt,
        )}</p>
        <p><strong>Usuario:</strong> ${report.userName}</p>
      </div>
    `;
    if (this.reportModal) {
      this.reportModal.hidden = false;
    }
  }

  showReportError(message) {
    if (!this.reportConfirmation) {
      return;
    }

    this.reportConfirmation.innerHTML = `
      <div class="confirmation-card confirmation-card-error">
        <p>${message}</p>
      </div>
    `;
    if (this.reportModal) {
      this.reportModal.hidden = false;
    }
  }

  renderReports(reports, likeHandler) {
    this.reportsList.innerHTML = '';

    reports.forEach((report) => {
      const div = document.createElement('div');
      div.className = 'report-item';

      div.innerHTML = `
        <p>${report.description}</p>
        <p><strong>Usuario:</strong> ${report.userName || 'Invitado'}</p>
        <p><strong>Distrito:</strong> ${report.district || 'Sin distrito'}</p>
        <p><strong>Fecha y hora:</strong> ${this.formatReportDateTime(
          report.createdAt,
        )}</p>
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
