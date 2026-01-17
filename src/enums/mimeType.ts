// TODO: 백엔드랑 통일 되어있는 지 확인 필요 - mime type이라 일단 여러개 추가
export enum MimeType {
  // Video
  VIDEO_MP4 = "video/mp4",
  VIDEO_WEBM = "video/webm",
  VIDEO_OGG = "video/ogg",
  VIDEO_MOV = "video/quicktime",
  VIDEO_AVI = "video/x-msvideo",

  // Image
  IMAGE_JPEG = "image/jpeg",
  IMAGE_PNG = "image/png",
  IMAGE_GIF = "image/gif",
  IMAGE_WEBP = "image/webp",
  IMAGE_SVG = "image/svg+xml",

  // Audio
  AUDIO_MP3 = "audio/mpeg",
  AUDIO_WAV = "audio/wav",
  AUDIO_OGG = "audio/ogg",
  AUDIO_AAC = "audio/aac",

  // Document
  APPLICATION_PDF = "application/pdf",
  APPLICATION_JSON = "application/json",
  APPLICATION_XML = "application/xml",
  APPLICATION_ZIP = "application/zip",

  // Text
  TEXT_PLAIN = "text/plain",
  TEXT_HTML = "text/html",
  TEXT_CSS = "text/css",
  TEXT_CSV = "text/csv",
}
