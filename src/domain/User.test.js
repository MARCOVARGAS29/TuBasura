import User from './User.js';

describe('User Entity', () => {
  describe('Constructor', () => {
    it('should create a user with name only (defaults for other fields)', () => {
      const user = new User('Alice');
      expect(user.getName()).toBe('Alice');
      expect(user.getEmail()).toBeNull();
      expect(user.getId()).toBeNull();
      expect(user.getRole()).toBe('user');
    });

    it('should create a user with all parameters', () => {
      const user = new User('Bob', 'bob@example.com', 'bob-123', 'admin');
      expect(user.getName()).toBe('Bob');
      expect(user.getEmail()).toBe('bob@example.com');
      expect(user.getId()).toBe('bob-123');
      expect(user.getRole()).toBe('admin');
    });

    it('should create a user with partial parameters', () => {
      const user = new User('Charlie', 'charlie@example.com');
      expect(user.getName()).toBe('Charlie');
      expect(user.getEmail()).toBe('charlie@example.com');
      expect(user.getId()).toBeNull();
      expect(user.getRole()).toBe('user');
    });

    it('should throw error if name is empty', () => {
      expect(() => new User('')).toThrow('Name cannot be empty');
    });

    it('should throw error if name is only whitespace', () => {
      expect(() => new User('   ')).toThrow('Name cannot be empty');
    });

    it('should throw error if name is null', () => {
      expect(() => new User(null)).toThrow('Name cannot be empty');
    });

    it('should set registrationDate when email is provided', () => {
      const before = new Date();
      const user = new User('David', 'david@example.com', 'david-456');
      const after = new Date();
      
      const registrationDate = user.getRegistrationDate?.();
      if (registrationDate) {
        expect(registrationDate.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(registrationDate.getTime()).toBeLessThanOrEqual(after.getTime());
      }
    });

    it('should NOT set registrationDate when email is null', () => {
      const user = new User('Eve');
      const registrationDate = user.getRegistrationDate?.();
      expect(registrationDate).toBeNull();
    });
  });

  describe('Accessor Methods', () => {
    it('getName() should return the name', () => {
      const user = new User('Frank');
      expect(user.getName()).toBe('Frank');
    });

    it('getEmail() should return email or null', () => {
      const user1 = new User('Grace', 'grace@example.com');
      expect(user1.getEmail()).toBe('grace@example.com');

      const user2 = new User('Henry');
      expect(user2.getEmail()).toBeNull();
    });

    it('getId() should return id or null', () => {
      const user1 = new User('Iris', 'iris@example.com', 'iris-789');
      expect(user1.getId()).toBe('iris-789');

      const user2 = new User('Jack', 'jack@example.com');
      expect(user2.getId()).toBeNull();
    });

    it('getRole() should return role', () => {
      const user1 = new User('Kate', null, null, 'admin');
      expect(user1.getRole()).toBe('admin');

      const user2 = new User('Leo');
      expect(user2.getRole()).toBe('user');
    });
  });

  describe('Registration State Methods', () => {
    it('isGuest() should return true when no email and no id', () => {
      const user = new User('Alice');
      expect(user.isGuest()).toBe(true);
    });

    it('isRegistered() should return true when has email and id', () => {
      const user = new User('Bob', 'bob@example.com', 'bob-123');
      expect(user.isRegistered()).toBe(true);
    });

    it('isGuest() should return true when has email but no id', () => {
      const user = new User('Charlie', 'charlie@example.com', null);
      expect(user.isGuest()).toBe(true);
    });

    it('isGuest() should return true when has id but no email', () => {
      const user = new User('David', null, 'david-456');
      expect(user.isGuest()).toBe(true);
    });

    it('isRegistered() and isGuest() should be mutually exclusive', () => {
      const registeredUser = new User('Eve', 'eve@example.com', 'eve-789');
      const guestUser = new User('Frank');

      expect(registeredUser.isRegistered()).toBe(true);
      expect(registeredUser.isGuest()).toBe(false);

      expect(guestUser.isRegistered()).toBe(false);
      expect(guestUser.isGuest()).toBe(true);
    });
  });
});
