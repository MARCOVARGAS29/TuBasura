const schedulesByDistrict = {
  1: {
    district: 'Distrito 1',
    days: 'Lunes, miercoles y viernes',
    time: '07:00',
  },
  2: {
    district: 'Distrito 2',
    days: 'Martes, jueves y sabado',
    time: '08:00',
  },
  3: {
    district: 'Distrito 3',
    days: 'Lunes, jueves y sabado',
    time: '09:00',
  },
  4: {
    district: 'Distrito 4',
    days: 'Martes, viernes y domingo',
    time: '07:30',
  },
  5: {
    district: 'Distrito 5',
    days: 'Lunes, miercoles y viernes',
    time: '10:00',
  },
  6: {
    district: 'Distrito 6',
    days: 'Martes y jueves',
    time: '11:00',
  },
  7: {
    district: 'Distrito 7',
    days: 'Lunes, miercoles y sabado',
    time: '06:30',
  },
  8: {
    district: 'Distrito 8',
    days: 'Martes, jueves y domingo',
    time: '12:00',
  },
  9: {
    district: 'Distrito 9',
    days: 'Lunes, miercoles y viernes',
    time: '13:00',
  },
  10: {
    district: 'Distrito 10',
    days: 'Martes, jueves y sabado',
    time: '14:00',
  },
  11: {
    district: 'Distrito 11',
    days: 'Lunes y viernes',
    time: '15:00',
  },
  12: {
    district: 'Distrito 12',
    days: 'Miercoles y sabado',
    time: '16:00',
  },
  13: {
    district: 'Distrito 13',
    days: 'Martes, jueves y domingo',
    time: '17:00',
  },
  14: {
    district: 'Distrito 14',
    days: 'Lunes, miercoles y viernes',
    time: '18:00',
  },
  15: {
    district: 'Distrito 15',
    days: 'Martes, jueves y sabado',
    time: '19:00',
  },
};

function createDistrictOptions() {
  return Array.from({ length: 15 }, (_, index) => ({
    value: String(index + 1),
    label: `Distrito ${index + 1}`,
  }));
}

export default class CollectionScheduleModel {
  getDistrictOptions() {
    return createDistrictOptions();
  }

  getScheduleByDistrict(districtId) {
    return schedulesByDistrict[districtId] || null;
  }
}

export { createDistrictOptions, schedulesByDistrict };
