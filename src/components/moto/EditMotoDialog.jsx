import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MotoForm } from "./MotoForm";

export function EditMotorDialog({
  motor,
  motorBrands,
  open,
  onOpenChange,
  onSubmit,
  isPending,
}) {
  if (!motor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit motorcycle</DialogTitle>

          <DialogDescription>
            Update the motorcycle brand, model, or type.
          </DialogDescription>
        </DialogHeader>

        <MotoForm
          isCreate={false}
          motorBrands={motorBrands}
          defaultValues={{
            motorBrandId: motor.motorBrandId,
            model: motor.model,
            type: motor.type,
          }}
          submitLabel="Save Changes"
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
