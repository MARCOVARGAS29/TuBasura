import Report from './report.js';

describe('Report Entity (OOP Class)', () => {
  describe('Constructor', () => {
    it('should create a report with description, image, id', () => {
      const report = new Report({
        description: 'Basura acumulada',
        image: 'data:image/png;base64,...',
        id: 'report-123',
      });

      expect(report.getId()).toBe('report-123');
      expect(report.getDescription()).toBe('Basura acumulada');
      expect(report.getLikeCount()).toBe(0);
    });

    it('should generate UUID if id not provided', () => {
      const report1 = new Report({ description: 'Test 1' });
      const report2 = new Report({ description: 'Test 2' });

      expect(report1.getId()).toBeDefined();
      expect(report2.getId()).toBeDefined();
      expect(report1.getId()).not.toBe(report2.getId());
    });

    it('should set createdAt to current date', () => {
      const before = new Date();
      const report = new Report({ description: 'Test' });
      const after = new Date();

      const createdAt = report.getCreatedAt();
      expect(createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('should throw error if description is empty', () => {
      expect(() => new Report({ description: '' })).toThrow(
        'Description required'
      );
    });

    it('should throw error if description is only whitespace', () => {
      expect(() => new Report({ description: '   ' })).toThrow(
        'Description required'
      );
    });

    it('should throw error if description is null', () => {
      expect(() => new Report({ description: null })).toThrow(
        'Description required'
      );
    });

    it('should set userId if provided', () => {
      const report = new Report({
        description: 'Test',
        userId: 'user-123',
      });

      expect(report.getUserId()).toBe('user-123');
    });

    it('should set scheduleId if provided', () => {
      const report = new Report({
        description: 'Test',
        scheduleId: 'schedule-456',
      });

      expect(report.getScheduleId()).toBe('schedule-456');
    });
  });

  describe('Accessor Methods', () => {
    const report = new Report({
      description: 'Basura en calle',
      image: 'img.jpg',
      id: 'rep-1',
      userId: 'user-1',
      scheduleId: 'sch-1',
    });

    it('getId() should return report id', () => {
      expect(report.getId()).toBe('rep-1');
    });

    it('getDescription() should return description', () => {
      expect(report.getDescription()).toBe('Basura en calle');
    });

    it('getLikeCount() should return initial count of 0', () => {
      expect(report.getLikeCount()).toBe(0);
    });

    it('getUserId() should return user id', () => {
      expect(report.getUserId()).toBe('user-1');
    });

    it('getScheduleId() should return schedule id', () => {
      expect(report.getScheduleId()).toBe('sch-1');
    });

    it('getCreatedAt() should return Date object', () => {
      const createdAt = report.getCreatedAt();
      expect(createdAt instanceof Date).toBe(true);
    });
  });

  describe('Like/Unlike Operations', () => {
    it('like() should increment likeCount', () => {
      const report = new Report({ description: 'Test' });
      expect(report.getLikeCount()).toBe(0);

      const newCount = report.like();
      expect(newCount).toBe(1);
      expect(report.getLikeCount()).toBe(1);
    });

    it('like() should increment multiple times', () => {
      const report = new Report({ description: 'Test' });

      report.like();
      report.like();
      report.like();

      expect(report.getLikeCount()).toBe(3);
    });

    it('unlike() should decrement likeCount', () => {
      const report = new Report({ description: 'Test' });
      report.like();
      report.like();
      report.like();

      const newCount = report.unlike();
      expect(newCount).toBe(2);
      expect(report.getLikeCount()).toBe(2);
    });

    it('unlike() should not go below 0', () => {
      const report = new Report({ description: 'Test' });
      const newCount = report.unlike();
      expect(newCount).toBe(0);
      expect(report.getLikeCount()).toBe(0);
    });

    it('like() should set updatedAt', () => {
      const report = new Report({ description: 'Test' });
      expect(report.getUpdatedAt?.()).toBeNull();

      report.like();
      const updatedAt = report.getUpdatedAt?.();
      if (updatedAt) {
        expect(updatedAt instanceof Date).toBe(true);
      }
    });
  });

  describe('Ownership', () => {
    it('isOwnedBy() should return true for matching userId', () => {
      const report = new Report({
        description: 'Test',
        userId: 'user-123',
      });

      expect(report.isOwnedBy('user-123')).toBe(true);
    });

    it('isOwnedBy() should return false for non-matching userId', () => {
      const report = new Report({
        description: 'Test',
        userId: 'user-123',
      });

      expect(report.isOwnedBy('user-456')).toBe(false);
    });

    it('isOwnedBy() should return false if userId is null', () => {
      const report = new Report({ description: 'Test' });
      expect(report.isOwnedBy('user-123')).toBe(false);
    });
  });

  describe('Serialization', () => {
    it('toJSON() should return object with all properties', () => {
      const report = new Report({
        description: 'Test report',
        image: 'img.jpg',
        id: 'rep-1',
        userId: 'user-1',
        scheduleId: 'sch-1',
      });

      report.like();

      const json = report.toJSON();
      expect(json.id).toBe('rep-1');
      expect(json.description).toBe('Test report');
      expect(json.image).toBe('img.jpg');
      expect(json.likes).toBe(1);
      expect(json.userId).toBe('user-1');
      expect(json.scheduleId).toBe('sch-1');
    });
  });

  describe('Backward Compatibility (property access)', () => {
    it('should allow property access: report.id', () => {
      const report = new Report({
        description: 'Test',
        id: 'rep-1',
      });

      expect(report.id).toBe('rep-1');
    });

    it('should allow property access: report.description', () => {
      const report = new Report({ description: 'My report' });
      expect(report.description).toBe('My report');
    });

    it('should allow property access: report.likes', () => {
      const report = new Report({ description: 'Test' });
      expect(report.likes).toBe(0);

      report.like();
      expect(report.likes).toBe(1);
    });

    it('should allow property access: report.image', () => {
      const report = new Report({
        description: 'Test',
        image: 'img.jpg',
      });

      expect(report.image).toBe('img.jpg');
    });
  });
});
