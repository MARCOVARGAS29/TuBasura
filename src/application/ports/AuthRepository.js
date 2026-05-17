/**
 * AuthRepository Port (Interface)
 * Defines the contract for authentication data access
 */
export default class AuthRepository {
  /**
   * Authenticate a user with credentials
   * @param {Object} credentials - { username, password }
   * @returns {Object|null} - { name, accessType } or null if invalid
   */
  login(credentials) {
    throw new Error('Method login() must be implemented');
  }

  /**
   * Create a guest session
   * @returns {Object} - { name, accessType }
   */
  loginAsGuest() {
    throw new Error('Method loginAsGuest() must be implemented');
  }
}
