export default class CollectionScheduleView {
  constructor({ districtSelect, resultContainer }) {
    this.districtSelect = districtSelect;
    this.resultContainer = resultContainer;
  }

  renderDistrictOptions(options) {
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      this.districtSelect.append(optionElement);
    });
  }

  bindDistrictSelection(handler) {
    this.districtSelect.addEventListener('change', (event) => {
      handler(event.target.value);
    });
  }

  showInitialMessage() {
    this.resultContainer.innerHTML = `
      <h2>Horario de recoleccion</h2>
      <p>Selecciona un distrito para ver su horario.</p>
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
}
