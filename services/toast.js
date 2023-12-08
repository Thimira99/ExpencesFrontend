import { toast } from "react-toastify";

export class ToastService {
  /**
   * Display an error toast.
   * @param {string} message - The error message to be displayed.
   */
  static error(message) {
    toast.error(message);
  }

  /**
   * Display an info toast.
   * @param {string} message - The info message to be displayed.
   */
  static info(message) {
    toast.info(message);
  }

  /**
   * Display a success toast.
   * @param {string} message - The success message to be displayed.
   */
  static success(message) {
    toast.success(message);
  }
}
