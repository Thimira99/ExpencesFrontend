import { toast } from "react-toastify";

export class ToastService {
  static error(message) {
    toast.error(message);
  }

  static info(message) {
    toast.info(message);
  }

  static success(message) {
    toast.success(message);
  }
}
