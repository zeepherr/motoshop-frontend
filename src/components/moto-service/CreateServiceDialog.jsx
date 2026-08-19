import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MotoServiceForm } from "./MotoServiceForm";
export function CreateServiceDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
}) {
  const handleSubmit = (values) => {
    onSubmit(values);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Service</DialogTitle>

          <DialogDescription>Add a new service to your shop.</DialogDescription>
        </DialogHeader>

        <MotoServiceForm
          createMode={true}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
          submitLabel="Add Service"
        />
      </DialogContent>
    </Dialog>
  );
}
