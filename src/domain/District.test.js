import District from './District.js';
import Schedule from './Schedule.js';

describe('District Entity', () => {
  describe('Constructor', () => {
    it('should create a district with name and empty schedules', () => {
      const district = new District('Chamochumbi');
      expect(district.getName()).toBe('Chamochumbi');
      expect(district.getSchedules()).toEqual([]);
    });

    it('should create a district with name and schedules', () => {
      const schedule1 = new Schedule('Norte', 'Lunes', '18:00', 'Chamochumbi');
      const schedule2 = new Schedule('Sur', 'Miércoles', '08:00', 'Chamochumbi');
      
      const district = new District('Chamochumbi', [schedule1, schedule2]);
      expect(district.getName()).toBe('Chamochumbi');
      expect(district.getSchedules()).toHaveLength(2);
    });

    it('should throw error if district name is empty', () => {
      expect(() => new District('')).toThrow('District name cannot be empty');
    });

    it('should throw error if district name is only whitespace', () => {
      expect(() => new District('   ')).toThrow('District name cannot be empty');
    });

    it('should throw error if district name is null', () => {
      expect(() => new District(null)).toThrow('District name cannot be empty');
    });
  });

  describe('Accessor Methods', () => {
    it('getName() should return district name', () => {
      const district = new District('Obrajes');
      expect(district.getName()).toBe('Obrajes');
    });

    it('getSchedules() should return array of schedules', () => {
      const schedule1 = new Schedule('Este', 'Lunes', '18:00', 'Obrajes');
      const schedule2 = new Schedule('Oeste', 'Martes', '09:00', 'Obrajes');
      
      const district = new District('Obrajes', [schedule1, schedule2]);
      const schedules = district.getSchedules();
      
      expect(schedules).toHaveLength(2);
      expect(schedules[0].getZone()).toBe('Este');
      expect(schedules[1].getZone()).toBe('Oeste');
    });

    it('getSchedule() should return first schedule or null', () => {
      const schedule = new Schedule('Norte', 'Lunes', '18:00', 'Calacoto');
      const district = new District('Calacoto', [schedule]);
      
      expect(district.getSchedule()).toBe(schedule);
      expect(district.getSchedule().getZone()).toBe('Norte');
    });

    it('getSchedule() should return null if no schedules', () => {
      const district = new District('Calacoto');
      expect(district.getSchedule()).toBeNull();
    });
  });

  describe('Adding Schedules', () => {
    it('addSchedule() should add a schedule to the district', () => {
      const district = new District('San Antonio');
      const schedule = new Schedule('Sur', 'Jueves', '15:00', 'San Antonio');
      
      district.addSchedule(schedule);
      expect(district.getSchedules()).toHaveLength(1);
      expect(district.getSchedules()[0]).toBe(schedule);
    });

    it('addSchedule() should throw error if not a Schedule instance', () => {
      const district = new District('San Antonio');
      
      expect(() => district.addSchedule({ zone: 'Sur' })).toThrow(
        'Must be Schedule instance'
      );
    });

    it('addSchedule() should allow adding multiple schedules', () => {
      const district = new District('San Antonio');
      const schedule1 = new Schedule('Sur', 'Jueves', '15:00', 'San Antonio');
      const schedule2 = new Schedule('Norte', 'Sábado', '10:00', 'San Antonio');
      
      district.addSchedule(schedule1);
      district.addSchedule(schedule2);
      
      expect(district.getSchedules()).toHaveLength(2);
    });
  });

  describe('Zones Set', () => {
    it('getZonesSet() should return unique zones from schedules', () => {
      const schedule1 = new Schedule('Norte', 'Lunes', '18:00', 'Chamochumbi');
      const schedule2 = new Schedule('Sur', 'Miércoles', '08:00', 'Chamochumbi');
      const schedule3 = new Schedule('Norte', 'Jueves', '14:00', 'Chamochumbi');
      
      const district = new District('Chamochumbi', [schedule1, schedule2, schedule3]);
      const zones = district.getZonesSet();
      
      expect(zones).toHaveLength(2);
      expect(zones).toContain('Norte');
      expect(zones).toContain('Sur');
    });

    it('getZonesSet() should return empty array if no schedules', () => {
      const district = new District('Chamochumbi');
      expect(district.getZonesSet()).toEqual([]);
    });
  });

  describe('Schedules immutability', () => {
    it('getSchedules() should return a copy of schedules array', () => {
      const schedule = new Schedule('Norte', 'Lunes', '18:00', 'Chamochumbi');
      const district = new District('Chamochumbi', [schedule]);
      
      const schedules = district.getSchedules();
      schedules.push(new Schedule('Sur', 'Martes', '09:00', 'Chamochumbi'));
      
      expect(district.getSchedules()).toHaveLength(1);
    });
  });
});
