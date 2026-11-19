/// <reference types="vite/client" />

/** Output of the `?photo`, `?photo-sm` and `?logo` imagetools presets (see vite.config.ts). */
type ResponsiveImage = {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

declare module '*?photo' {
  const image: ResponsiveImage
  export default image
}
declare module '*?photo-sm' {
  const image: ResponsiveImage
  export default image
}
declare module '*?logo' {
  const image: ResponsiveImage
  export default image
}
