import { ImagePlus, RefreshCw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ProductImageField({
  currentImageUrl,
  file,
  onFileChange,
  onCancelFile,
  disabled,
}) {
  const inputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const handleChooseImage = () => {
    if (disabled) return;

    inputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");

    if (!ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
      setError("Only JPEG, PNG, and WebP images are allowed.");

      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_IMAGE_SIZE) {
      setError("Image must not exceed 5 MB.");

      event.target.value = "";
      return;
    }

    onFileChange(selectedFile);
  };

  const handleCancelImage = () => {
    setError("");

    onCancelFile();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const displayImage = previewUrl || currentImageUrl;

  const isNewImage = Boolean(file);
  const hasExistingImage = Boolean(currentImageUrl);

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">Product image</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {displayImage ? (
        <div
          className="
            group relative aspect-4/3 w-full
            overflow-hidden rounded-xl border
            bg-muted
          "
        >
          <img
            src={displayImage}
            alt="Product preview"
            className="size-full object-contain p-3"
          />

          <div
            className="
              absolute inset-x-0 bottom-0
              flex items-center justify-between gap-2
              bg-background/85 p-2
              backdrop-blur-sm
            "
          >
            <p className="min-w-0 truncate text-xs text-muted-foreground">
              {isNewImage ? file.name : "Current product image"}
            </p>

            {isNewImage ? (
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                onClick={handleCancelImage}
                disabled={disabled}
                aria-label="Cancel selected image"
                className="shrink-0"
              >
                <X className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleChooseImage}
                disabled={disabled}
                className="shrink-0"
              >
                <RefreshCw className="size-4" />
                Replace
              </Button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleChooseImage}
          disabled={disabled}
          className="
            flex aspect-4/3 w-full
            cursor-pointer flex-col
            items-center justify-center gap-3
            rounded-xl border border-dashed
            bg-muted/20 p-4 text-center
            transition-colors
            hover:bg-muted/40
            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          <div
            className="
              flex size-11 items-center justify-center
              rounded-lg border bg-background
            "
          >
            <ImagePlus className="size-5 text-muted-foreground" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Choose product image</p>

            <p className="text-xs text-muted-foreground">
              JPEG, PNG or WebP · Max 5MB
            </p>
          </div>
        </button>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!error && !hasExistingImage && !isNewImage && (
        <p className="text-xs text-muted-foreground">Optional</p>
      )}
    </div>
  );
}
