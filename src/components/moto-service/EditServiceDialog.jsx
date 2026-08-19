import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MotoServiceForm } from "./MotoServiceForm";

export function EditServiceDialog({
  service,
  open,
  onOpenChange,
  onSubmit,
  isPending,
}) {
  if (!service) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>

          <DialogDescription>
            Update the motorcycle Services, Description, or price.
          </DialogDescription>
        </DialogHeader>

        <MotoServiceForm
          defaultValues={{
            name: service.name,
            description: service?.description,
            price: service.price,
          }}
          createMode={false}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isPending={isPending}
          submitLabel="Edit Service"
        />
      </DialogContent>
    </Dialog>
  );
}
