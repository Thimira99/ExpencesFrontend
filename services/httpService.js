import axios from "axios";
import { AuthService } from "./authService";
import { host } from "@/utils/ApiRequests";

// Create an axios instance without authentication headers
const instanceWithoutAuth = axios.create({
  baseURL: host,
});

// HttpService class for handling HTTP requests
class HttpService {
  // Get an axios instance with authentication headers
  static get instance() {
    return axios.create({
      baseURL: host,
      headers: {
        Authorization: `Bearer ${AuthService.getIdToken()}`,
      },
    });
  }

  // Get an axios instance without authentication headers
  static get instanceWithoutAuth() {
    return axios.create({
      baseURL: host,
    });
  }

  // Generic method to perform HTTP requests
  static async fetch(method, path, data, params, anonymous) {
    // Determine the axios instance based on the 'anonymous' parameter
    const axios = anonymous ? this.instanceWithoutAuth : this.instance;

    // Make the HTTP request
    const response = axios({
      method,
      url: path,
      data,
      params,
    });

    // Throw an error if the response is falsy (null or undefined)
    if (!response) throw new Error(response);

    // Return the response
    return response;
  }

  // Method for making a GET request
  static async get(path, query) {
    return this.fetch("GET", path, null, query);
  }

  // Method for making a POST request
  static async post(path, data, query) {
    return this.fetch("POST", path, data, query);
  }

  // Method for making a PUT request
  static async put(path, data, query) {
    return this.fetch("PUT", path, data, query);
  }

  // Method for making a PATCH request
  static async patch(path, data, query) {
    return this.fetch("PATCH", path, data, query);
  }

  // Method for making a DELETE request
  static async delete(path, query) {
    return this.fetch("DELETE", path, null, query);
  }

  // Method for making a GET request without authentication
  static async getAnonymous(path, query) {
    return this.fetch("GET", path, null, query, true);
  }
}

// Export the HttpService class
export default HttpService;
