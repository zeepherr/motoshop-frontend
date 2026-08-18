import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MotoForm } from "./MotoForm";

export function CreateMotorDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  motorBrands,
  motorTypes,
}) {
  function handleSubmit(values) {
    onSubmit(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add motorcycle</DialogTitle>

          <DialogDescription>
            Add a motorcycle model and assign its brand and type.
          </DialogDescription>
        </DialogHeader>

        <MotoForm
          motorBrands={motorBrands}
          motorTypes={motorTypes}
          submitLabel="Add Motorcycle"
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
