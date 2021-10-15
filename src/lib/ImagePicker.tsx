import {
  Box,
  createStyles,
  FormHelperText,
  FormHelperTextProps,
  IconButton,
  InputLabel,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";

import ImageCropper, { ImageCropperProps } from "./ImageCropper";
import { FormikProps } from "formik";
import React, { FC, useState } from "react";
import { getFieldError, IFieldProps, TFile } from "react-forms";

import { Picture } from "./Picture/@types";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddIcon from "@material-ui/icons/Add";
import { get } from "lodash";

export interface ImagePickerFieldProps {
  label: string;
  name?: string;
  imgHW?: number;
  helperText?: string;
  classes?: ImagePickerClasses;
  helperTextProps?: FormHelperTextProps;
  uploadPicture: (pictureObject: TFile) => Promise<Picture>;
  cropConfig?: ImageCropperProps["cropConfig"];
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
const ImagePicker: FC<ImagePickerProps> = (props) => {
  const {
    fieldProps = {} as ImagePickerFieldProps,
    fieldConfig,
    formikProps = {} as FormikProps<any>,
  } = props;
  const {
    name = "",
    label = "Add Images",
    helperText,
    imgHW = 90,
    /* imagePlaceholderHeight = 50, */ classes: propClasses,
    helperTextProps,
    uploadPicture,
    cropConfig,
  } = fieldProps;
  const classes = useStyles();
  const valueKey = fieldConfig?.valueKey || "";
  const value: any = get(formikProps, `values.${name}`);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const withCropping = true;
  const [croppedImage, setCroppedImage] = useState<TFile>();

  const pictureUpload = async (prop: { imgs: TFile[]; _rem: any[] }) => {
    setStatus("PROCESSING");
    const { imgs } = prop;
    try {
      const image = await uploadPicture(imgs[0]);
      if (image) {
        setStatus("SUCCESS");
        if (formikProps) formikProps.setFieldValue(valueKey, image);
        // else if (formikProps && customParser)
        //   formikProps.setFieldValue(valueKey, image)); // Checking formikProps is only to workaround eslint warnings. If eslint updates allow disabling the error, this check can be removed.
      }
    } catch (error) {
      setStatus("ERROR");
      setMessage(error.message);
    }
  };

  const fieldError = getFieldError(name, formikProps as any);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const fileInfo: TFile = {
          name: file.name,
          type: file.type,
          size: `${Math.round(file.size / 1000)} kB`,
          base64: reader.result,
          file,
        };
        setOpen(true);
        setCroppedImage(fileInfo);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (croppedBase64?: string) => {
    if (croppedImage) {
      pictureUpload({
        imgs: [{ ...croppedImage, base64: croppedBase64 ?? "" }],
        _rem: [],
      });
    }
  };

  const removeItem = (event: React.MouseEvent<HTMLElement>) => {
    if (value) {
      event.stopPropagation();
      event.preventDefault();
      formikProps.setFieldValue(name, undefined);
    }
  };

  const isLoading = status === "PROCESSING";
  return (
    <Box>
      <Box mb={1}>
        <InputLabel className={propClasses?.label} shrink={false}>
          {label}
        </InputLabel>
      </Box>
      <Box display="flex">
        <div
          className={
            value && value?.url ? classes.hasImage : classes.imgPlaceholder
          }
        >
          {isLoading ? (
            <LinearProgress color="secondary" className={classes.loader} />
          ) : (
            <>
              {!value || !value?.url ? (
                <AddIcon color="secondary" className={classes.icon} />
              ) : null}
              {value ? (
                <Box overflow="hidden">
                  {" "}
                  <img
                    className={classes.img}
                    width={imgHW}
                    src={typeof value === "string" ? value : value.url}
                    alt=""
                  />{" "}
                </Box>
              ) : null}
              <input
                accept="image/*"
                title=""
                type="file"
                name={`${name}`}
                onChange={(event) => handleChange(event)}
                className={classes.input}
              />
              {withCropping && croppedImage?.base64 ? (
                <>
                  <ImageCropper
                    open={open}
                    onClose={() => setOpen(false)}
                    base64={croppedImage.base64 as string}
                    cropConfig={cropConfig}
                    onComplete={handleUpload}
                  />
                </>
              ) : null}
            </>
          )}
          <div id="imageRemoveOverlay" className={classes.imageRemoveOverlay}>
            <IconButton onClick={(event) => removeItem(event)}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        </div>
      </Box>
      {helperText ||
      fieldError ||
      (status === "ERROR" && message === "request entity too large") ? (
        <FormHelperText
          {...helperTextProps}
          className={propClasses?.helperText}
          error={!!fieldError}
        >
          {fieldError || helperText}
        </FormHelperText>
      ) : null}
    </Box>
  );
};

export default ImagePicker;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: `${theme.palette.secondary.main}`,
      border: `1px dashed ${theme.palette.secondary.main}`,
      borderRadius: 3,
      position: "relative",
      zIndex: 1,
      verticalAlign: "middle",
      textAlign: "center",
      "&:not(:last-child)": {
        marginRight: 20,
      },
    },
    disabled: {
      backgroundColor: theme.palette.grey.A200,
      border: "none",
    },
    imgPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 3,
      border: `1px dashed ${theme.palette.secondary.main}`,
      position: "relative",
    },
    input: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0,
      width: "inherit",
      height: "inherit",
      zIndex: 2,
      "&:not([disabled])": {
        cursor: "pointer",
      },
    },
    hasImage: {
      border: "none",
      backgroundColor: "transparent",
      position: "relative",
      "&:hover #imageRemoveOverlay": {
        display: "flex",
      },
    },
    icon: {
      marginRight: "50%",
      marginLeft: "50%",
      transform: "translate(-50%, -50%)",
      marginTop: "50%",
      marginBottom: "50%",
      color: theme.palette.secondary.main,
    },
    disabledSVG: {
      opacity: 0,
    },
    img: {
      display: "inline-block",
      zIndex: 2,
      position: "relative",
    },
    loader: {
      transform: "translateY(-50%)",
      marginTop: "50%",
      marginBottom: "50%",
    },
    imageRemoveOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: "none",
      cursor: "pointer",
      width: "inherit",
      height: "inherit",
      zIndex: 9,
      justifyContent: "center",
      alignItems: "center",
      "& .icon": {
        zIndex: 9,
      },
      "&::before": {
        // backgroundColor: COLOR.secondary.blue,
        backgroundColor: "#675DF7",
        content: "' '",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        borderRadius: 3,
      },
    },
  })
);
