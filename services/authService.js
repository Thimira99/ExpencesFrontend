export class AuthService {
  /**
   * Retrieve the authentication token from the local storage.
   * @returns {string|null} - The authentication token or null if not found.
   */
  static getIdToken() {
    const token = localStorage.getItem("token");

    return token ?? null;
  }
}
