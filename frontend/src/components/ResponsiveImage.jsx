export default function ResponsiveImage({
  src,
  alt = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  aspectRatio,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  className = "",
  style = {},
  onClick,
  ...rest
}) {
  if (!src) return null;

  const isLocalAsset = typeof src === "string" && src.startsWith("/assets/") && !src.includes("/optimized/");

  if (isLocalAsset) {
    const basePath = src.replace("/assets/", "/assets/optimized/").replace(/\.(jpe?g|png)$/i, "");
    const srcSet = `${basePath}-480.webp 480w, ${basePath}-960.webp 960w, ${basePath}-1600.webp 1600w`;
    const fallbackSrc = `${basePath}-960.webp`;

    return (
      <img
        src={fallbackSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding={decoding}
        width={width}
        height={height}
        className={className}
        style={{
          ...(aspectRatio ? { aspectRatio } : {}),
          ...style,
        }}
        onClick={onClick}
        {...rest}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      width={width}
      height={height}
      className={className}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
        ...style,
      }}
      onClick={onClick}
      {...rest}
    />
  );
}
