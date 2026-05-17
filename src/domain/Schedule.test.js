import Schedule from './Schedule.js';

describe('Schedule Entity', () => {
  describe('Constructor', () => {
    it('should create a schedule with valid parameters', () => {
      const schedule = new Schedule('Norte', 'Lunes', '18:00', 'Chamochumbi');
      expect(schedule.getZone()).toBe('Norte');
      expect(schedule.getDay()).toBe('Lunes');
      expect(schedule.getTime()).toBe('18:00');
      expect(schedule.getDistrict()).toBe('Chamochumbi');
    });

    it('should throw error if zone is empty', () => {
      expect(() => new Schedule('', 'Lunes', '18:00', 'Chamochumbi')).toThrow(
        'Zone cannot be empty'
      );
    });

    it('should throw error if zone is only whitespace', () => {
      expect(() => new Schedule('   ', 'Lunes', '18:00', 'Chamochumbi')).toThrow(
        'Zone cannot be empty'
      );
    });

    it('should throw error if day is empty', () => {
      expect(() => new Schedule('Norte', '', '18:00', 'Chamochumbi')).toThrow(
        'Day cannot be empty'
      );
    });

    it('should throw error if day is only whitespace', () => {
      expect(() => new Schedule('Norte', '   ', '18:00', 'Chamochumbi')).toThrow(
        'Day cannot be empty'
      );
    });

    it('should throw error if time is empty', () => {
      expect(() => new Schedule('Norte', 'Lunes', '', 'Chamochumbi')).toThrow(
        'Time cannot be empty'
      );
    });

    it('should throw error if time is only whitespace', () => {
      expect(() => new Schedule('Norte', 'Lunes', '   ', 'Chamochumbi')).toThrow(
        'Time cannot be empty'
      );
    });

    it('should throw error if district is empty', () => {
      expect(() => new Schedule('Norte', 'Lunes', '18:00', '')).toThrow(
        'District cannot be empty'
      );
    });

    it('should throw error if district is only whitespace', () => {
      expect(() => new Schedule('Norte', 'Lunes', '18:00', '   ')).toThrow(
        'District cannot be empty'
      );
    });

    it('should throw error if any parameter is null', () => {
      expect(() => new Schedule(null, 'Lunes', '18:00', 'Chamochumbi')).toThrow();
      expect(() => new Schedule('Norte', null, '18:00', 'Chamochumbi')).toThrow();
      expect(() => new Schedule('Norte', 'Lunes', null, 'Chamochumbi')).toThrow();
      expect(() => new Schedule('Norte', 'Lunes', '18:00', null)).toThrow();
    });
  });

  describe('Accessor Methods', () => {
    const schedule = new Schedule('Sur', 'Miércoles', '08:00', 'Obrajes');

    it('getZone() should return zone', () => {
      expect(schedule.getZone()).toBe('Sur');
    });

    it('getDay() should return day', () => {
      expect(schedule.getDay()).toBe('Miércoles');
    });

    it('getTime() should return time', () => {
      expect(schedule.getTime()).toBe('08:00');
    });

    it('getDistrict() should return district', () => {
      expect(schedule.getDistrict()).toBe('Obrajes');
    });

    it('getScheduleTime() should return formatted string', () => {
      const formatted = schedule.getScheduleTime();
      expect(formatted).toBe('Miércoles a las 08:00');
    });

    it('isValid() should return true for valid schedule', () => {
      expect(schedule.isValid()).toBe(true);
    });
  });

  describe('Schedule time formatting', () => {
    it('should format schedule time correctly', () => {
      const schedule1 = new Schedule('Norte', 'Lunes', '18:00', 'Chamochumbi');
      expect(schedule1.getScheduleTime()).toBe('Lunes a las 18:00');

      const schedule2 = new Schedule('Este', 'Jueves', '06:30', 'Calacoto');
      expect(schedule2.getScheduleTime()).toBe('Jueves a las 06:30');
    });
  });
});
