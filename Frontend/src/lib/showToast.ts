import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "info" | "success" | "error" | "warning" | "default";

export const showToast = (message: string, type: ToastType = "info", options?: ToastOptions) => {
  toast(message, {
    type,
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options,
  });
};
