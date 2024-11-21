declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";
declare module "*.gif";
declare module "*.webp";
declare module "*.ico";
declare module "*.bmp";
declare module "*.tiff";

type StaticImport = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};
