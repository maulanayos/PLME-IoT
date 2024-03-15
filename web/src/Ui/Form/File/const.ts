export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  PDF = "pdf",
  EXCEL = "excel",
  CSV = "csv",
}

export const fileTypesArray = [
  {
    key: "image",
    value: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  },
  {
    key: "video",
    value: ["video/mp4", "video/quicktime"],
  },
  {
    key: "pdf",
    value: ["application/pdf"],
  },
  {
    key: "excel",
    value: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ],
  },
  {
    key: "csv",
    value: ["text/csv"],
  },
];
