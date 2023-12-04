export class AuthService {
  static getIdToken() {
    const token = localStorage.getItem("token");

    return token ?? null;
  }
}
