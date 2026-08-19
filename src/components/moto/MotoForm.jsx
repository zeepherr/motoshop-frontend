import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MOTOR_TYPES } from "@/constants/moto";
import { createMotorSchema } from "@/validations/moto.schema";
import { useEffect } from "react";

export function MotoForm({
  motorBrands,
  defaultValues = {
    motorBrandId: undefined,
    model: "",
    type: "",
  },
  submitLabel = "Save",
  onSubmit,
  onCancel,
  isPending,
}) {
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(createMotorSchema),
    defaultValues: {
      motorBrandId: defaultValues.motorBrandId,
      model: defaultValues.model ?? "",
      type: defaultValues.type ?? "",
    },
  });
  useEffect(() => {
    reset({
      motorBrandId: defaultValues.motorBrandId,
      model: defaultValues.model ?? "",
      type: defaultValues.type ?? "",
    });
  }, [
    defaultValues.motorBrandId,
    defaultValues.model,
    defaultValues.type,
    reset,
  ]);
  const handleFromSubmit = (values) => {
    const changedData = {};

    if (dirtyFields.motorBrandId) {
      changedData.motorBrandId = values.motorBrandId;
    }

    if (dirtyFields.model) {
      changedData.model = values.model;
    }

    if (dirtyFields.type) {
      changedData.type = values.type;
    }

    onSubmit(changedData);
  };
  return (
    <form onSubmit={handleSubmit(handleFromSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Brand */}
        <div className="space-y-2">
          <Label>Motor brand</Label>

          <Controller
            name="motorBrandId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select motor brand" />
                </SelectTrigger>

                <SelectContent>
                  {motorBrands?.map((brand) => (
                    <SelectItem key={brand.id} value={String(brand.id)}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.motorBrandId && (
            <p className="text-sm text-destructive">
              {errors.motorBrandId.message}
            </p>
          )}
        </div>

        {/* Motor Type */}
        <div className="space-y-2">
          <Label>Motor type</Label>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select motor type" />
                </SelectTrigger>

                <SelectContent>
                  {MOTOR_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.type && (
            <p className="text-sm text-destructive">{errors.type.message}</p>
          )}
        </div>
      </div>

      {/* Model */}
      <div className="space-y-2">
        <Label htmlFor="motor-model">Model</Label>

        <Input
          id="motor-model"
          placeholder="e.g. Wave 125i"
          autoComplete="off"
          {...register("model")}
        />

        {errors.model && (
          <p className="text-sm text-destructive">{errors.model.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
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
