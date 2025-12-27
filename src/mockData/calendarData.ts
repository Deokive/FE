const defaultLabelData: Record<string, string[]> = {
  "2025-12-01": ["label", "label", "label", "label"],
  "2025-12-02": ["label", "label", "label"],
  "2025-12-03": ["label", "label", "label"],
  "2026-01-04": ["label", "label", "label"],
};

const defaultStickerData: Record<string, string> = {
  "2025-12-01": "sticker",
  "2025-12-02": "sticker",
  "2025-12-03": "sticker",
};

export {
  defaultLabelData as labelDataMock,
  defaultStickerData as stickerDataMock,
};
