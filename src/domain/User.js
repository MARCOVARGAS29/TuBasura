export default class User {
  #name;
  #email;
  #id;
  #role;
  #registrationDate;

  constructor(name, email = null, id = null, role = 'user') {
    if (!name || name.trim() === '') {
      throw new Error('Name cannot be empty');
    }
    this.#name = name;
    this.#email = email;
    this.#id = id;
    this.#role = role;
    this.#registrationDate = email ? new Date() : null;
  }

  getName() {
    return this.#name;
  }

  getEmail() {
    return this.#email;
  }

  getId() {
    return this.#id;
  }

  getRole() {
    return this.#role;
  }

  getRegistrationDate() {
    return this.#registrationDate;
  }

  isRegistered() {
    return this.#email !== null && this.#id !== null;
  }

  isGuest() {
    return !this.isRegistered();
  }
}
