import { FormHelperTextProps } from "@material-ui/core";
import { ImageCropperProps } from "./ImageCropper";
import { FC } from "react";
import { IFieldProps, TFile } from "react-forms";
import { Picture } from "./Picture/@types";
export interface ImagePickerFieldProps {
    label: string;
    name?: string;
    imgHW?: number;
    customParser?: (img: any) => Picture | string;
    helperText?: string;
    classes?: ImagePickerClasses;
    helperTextProps?: FormHelperTextProps;
    parsePicture: (response: any) => Picture;
    uploadPicture: (pictureObject: TFile) => Picture;
    cropConfig: ImageCropperProps["cropConfig"];
}
interface ImagePickerClasses {
    label?: string;
    subtitle?: string;
    helperText?: string;
    root?: string;
}
export interface ImagePickerProps extends IFieldProps {
    fieldProps?: ImagePickerFieldProps;
}
declare const ImagePicker: FC<ImagePickerProps>;
export default ImagePicker;
