import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MotoNameForm } from "./MotoNameFrom";
export function CreateMotoNameDialog({
  placeholder,
  open,
  onOpenChange,
  onSubmit,
  isPending,
  name,
}) {
  function handleSubmit(values) {
    onSubmit(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add motorcycle {name}</DialogTitle>

          <DialogDescription>
            Add a new motorcycle {name} to your shop.
          </DialogDescription>
        </DialogHeader>

        <MotoNameForm
          placeholder={placeholder}
          submitLabel={`Add ${name}`}
          onSubmit={handleSubmit}
          onCancel={() => {
            onOpenChange(false);
          }}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
