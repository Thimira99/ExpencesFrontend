import axios from "axios";
import { AuthService } from "./authService";
import { host } from "@/utils/ApiRequests";

const instanceWithoutAuth = axios.create({
  baseURL: host,
});

class HttpService {
  static get instance() {
    return axios.create({
      baseURL: host,
      headers: {
        Authorization: `Bearer ${AuthService.getIdToken()}`,
      },
    });
  }

  static get instanceWithoutAuth() {
    return axios.create({
      baseURL: host,
    });
  }

  static async fetch(method, path, data, params, anonymous) {
    const axios = anonymous ? this.instanceWithoutAuth : this.instance;

    console.log(axios);

    const response = axios({
      method,
      url: path,
      data,
      params,
    });

    if (!response) throw new Error(response);

    return response;
  }

  static async get(path, query) {
    return this.fetch("GET", path, null, query);
  }

  static async post(path, data, query) {
    return this.fetch("POST", path, data, query);
  }

  static async put(path, data, query) {
    return this.fetch("PUT", path, data, query);
  }

  static async patch(path, data, query) {
    return this.fetch("PATCH", path, data, query);
  }

  static async delete(path, query) {
    return this.fetch("DELETE", path, null, query);
  }

  static async getAnonymous(path, query) {
    return this.fetch("GET", path, null, query, true);
  }
}

export default HttpService;
