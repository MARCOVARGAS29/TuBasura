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
}
