import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motoBrandSchema } from "@/validations/motoBrand.schema";

export function MotoNameForm({
  placeholder,
  defaultValues = { name: "" },
  submitLabel,
  onSubmit,
  onCancel,
  isPending,
  actions,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(motoBrandSchema),

    defaultValues: {
      name: defaultValues.name ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: defaultValues.name ?? "",
    });
  }, [defaultValues.name, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="brand-name">Brand name</Label>

        <Input
          id="brand-name"
          placeholder={placeholder || ""}
          autoComplete="off"
          autoFocus
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
        {actions}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
