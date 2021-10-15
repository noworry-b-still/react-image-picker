import { FC } from "react";
import { ReactCropProps } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export interface ImageCropperProps {
    base64: string;
    cropConfig?: ReactCropProps["crop"];
    onClose?: () => void;
    onComplete?: (base64: string) => void;
    open: boolean;
}
declare const ImageCropper: FC<ImageCropperProps>;
export default ImageCropper;
