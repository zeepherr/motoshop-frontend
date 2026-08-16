import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AttemptsExceededDialog({ message, onConfirm }) {
  return (
    <AlertDialog open={Boolean(message)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Verification attempts exceeded</AlertDialogTitle>

          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction className="cursor-pointer" onClick={onConfirm}>
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
