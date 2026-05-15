import { users } from '../domain/users.js';

export default class InMemoryAuthRepository {
  login({ username, password }) {
    const user = users.find(
      (candidate) =>
        candidate.username === username && candidate.password === password,
    );

    if (!user) {
      return null;
    }

    return {
      name: user.name,
      accessType: 'registered',
    };
  }

  loginAsGuest() {
    return {
      name: 'Invitado',
      accessType: 'guest',
    };
  }
}
