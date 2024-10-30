import Swal from "sweetalert2";

interface ShowDialogParams {
  title: string;
  text: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  confirmButtonColor?: string;
  isConfirmation?: boolean;
  autoCloseTimer?: number;
}

const showDialog = async ({
  title,
  text,
  icon,
  confirmButtonColor,
  isConfirmation = false,
  autoCloseTimer = 0,
}: ShowDialogParams): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: isConfirmation,
    confirmButtonColor: confirmButtonColor || "#16a26e",
    cancelButtonColor: "#0009",
    confirmButtonText: isConfirmation ? "Confirmar" : "Aceptar",
    cancelButtonText: isConfirmation ? "Cancelar" : undefined,
    background: "",
    color: "#000",
    timer: autoCloseTimer > 0 ? autoCloseTimer : undefined,
    timerProgressBar: autoCloseTimer > 0,
    willClose: () => {
      if (autoCloseTimer > 0) {
        Swal.stopTimer();
      }
    },
  });

  return result.isConfirmed;
};

export default showDialog;
