import { useEffect, useRef } from "react";

const useDialog = () => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const delay = 2000; // 2s

  // TODO: find a better way to do this
  useEffect(() => {
    const dialog = dialogRef.current;

    setTimeout(() => {
      if (dialog) {
        dialog.classList.remove("animate-dialog-in");
        dialog.classList.add("animate-dialog-out");
      }
    }, delay);
  }, []);

  return dialogRef;
};

export default useDialog;
