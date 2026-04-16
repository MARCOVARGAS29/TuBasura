const schedulesByDistrict = {
  5: {
    district: 'Distrito 5',
    days: 'Lunes, miercoles y viernes',
    time: '10:00',
  },
};

function createDistrictOptions() {
  return Array.from({ length: 15 }, (_, index) => ({
    value: String(index + 1),
    label: `Distrito ${index + 1}`,
  }));
}

export default class CollectionScheduleModel {
  getScheduleByDistrict(districtId) {
    return schedulesByDistrict[districtId] || null;
  }
}

export { createDistrictOptions };
