type TaskImageProps = {
  data?: string | null;
  alt?: string;
  label?: string;
  wrapperClassName?: string;
};

export function TaskImage({
  data,
  alt = "Ground truth image",
  label,
  wrapperClassName,
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

  const containerClassName = ["flex justify-center", wrapperClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <figure className="flex flex-col items-center gap-2">
        <img
          src={imageSrc}
          alt={alt}
          className="max-h-[32rem] rounded-md border bg-muted object-contain p-2"
        />
        {label && (
          <figcaption className="text-sm text-muted-foreground text-center">
            {label}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
