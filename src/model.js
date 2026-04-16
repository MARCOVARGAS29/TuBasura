function createDistrictOptions() {
  return Array.from({ length: 15 }, (_, index) => ({
    value: String(index + 1),
    label: `Distrito ${index + 1}`,
  }));
}

export { createDistrictOptions };
