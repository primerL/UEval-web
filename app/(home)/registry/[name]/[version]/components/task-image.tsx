import { cn } from "@/lib/utils";

type TaskImageProps = {
  data?: string | null;
  alt?: string;
  label?: string;
  wrapperClassName?: string;
  figureClassName?: string;
  imageClassName?: string;
  captionClassName?: string;
};

export function TaskImage({
  data,
  alt = "Ground truth image",
  label,
  wrapperClassName,
  figureClassName,
  imageClassName,
  captionClassName,
}: TaskImageProps) {
  const imageSrc =
    typeof data === "string" && data.length > 0
      ? data.startsWith("data:")
        ? data
        : `data:image/png;base64,${data}`
      : null;

  if (!imageSrc) {
    return null;
  }

  const containerClassName = cn("flex justify-center", wrapperClassName);
  const figureClasses = cn(
    "flex w-full flex-col items-center gap-2",
    figureClassName,
  );
  const imageClasses = cn(
    "max-h-[32rem] rounded-md border bg-muted object-contain p-2",
    imageClassName,
  );
  const captionClasses = cn(
    "text-center text-sm text-muted-foreground",
    captionClassName,
  );

  return (
    <div className={containerClassName}>
      <figure className={figureClasses}>
        <img src={imageSrc} alt={alt} className={imageClasses} />
        {label && (
          <figcaption className={captionClasses}>{label}</figcaption>
        )}
      </figure>
    </div>
  );
}
