import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  createServiceSchema,
  updateServiceSchema,
} from "@/validations/motoService.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
export const MotoServiceForm = ({
  createMode,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
  defaultValues = {
    name: "",
    description: "",
    price: "",
  },
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(
      createMode ? createServiceSchema : updateServiceSchema,
    ),
  });

  useEffect(() => {
    reset({
      name: defaultValues.name ?? "",
      description: defaultValues.description ?? "",
      price: defaultValues.price ?? 0,
    });
  }, [
    defaultValues.description,
    defaultValues.name,
    defaultValues.price,
    reset,
  ]);
  const handleSubmitFrom = (values) => {
    console.log(values);
    const changeData = {};
    if (dirtyFields.name) {
      changeData.name = values.name;
    }
    if (dirtyFields.description) {
      changeData.description = values.description;
    }
    if (dirtyFields.price) {
      changeData.price = values.price;
    }
    onSubmit(changeData);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitFrom)} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Service Name</FieldLabel>

          <Input
            id="name"
            placeholder="e.g. Engine Oil Change"
            {...register("name")}
          />

          <FieldError>{errors.name?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="description">
            Description
            <span className="ml-1 text-muted-foreground">(Optional)</span>
          </FieldLabel>

          <Textarea
            id="description"
            placeholder="Add some details about this service..."
            rows={4}
            {...register("description")}
          />

          <FieldError>{errors.description?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Price</FieldLabel>

          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            {...register("price")}
          />

          <FieldError>{errors.price?.message}</FieldError>
        </Field>
      </FieldGroup>

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
    </form>
  );
};
