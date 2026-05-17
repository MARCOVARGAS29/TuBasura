export default class AuthUseCase {
  constructor({ authRepository }) {
    this.authRepository = authRepository;
  }

  login(credentials) {
    return this.authRepository.login(credentials);
  }

  loginAsGuest() {
    return this.authRepository.loginAsGuest();
  }
}
