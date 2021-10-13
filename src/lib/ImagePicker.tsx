import {
    Box,
    createStyles,
    FormHelperText,
    FormHelperTextProps,
    IconButton,
    InputLabel,
    LinearProgress,
    makeStyles,
} from '@material-ui/core';
import { ReactCropProps } from 'react-image-crop';
import ImageCropper from "./ImageCropper";
import { FormikProps } from 'formik';
import React, { FC, useState } from 'react';
import { getFieldError, IFieldProps, TFile } from 'react-forms';



import { get } from 'lodash';
import useAsyncTask from 'Hooks/useAsyncTask';
import PictureModel from 'Models/Picture';
import { Picture } from 'Models/Picture/@types';
import { parsePicture } from 'Models/Picture/pictureParser';
import helpers from 'Utils/helpers';
import { COLOR } from 'Theme/themeConstants';
import RemoveIcon from 'Components/RemoveIcon';
import PgIcon from 'Components/PgIcon';

export interface ImagePickerFieldProps {
    label: string;
    name?: string;
    imgHW?: number; // This has to be a number because this is the width that will be applied for transforming the url using imageKit's api.
    // imagePlaceholderHeight: number | string;
    customParser?: (img: any) => Picture | string;
    helperText?: string;
    classes?: ImagePickerClasses;
    helperTextProps?: FormHelperTextProps;
    imageUploadType?: string;
}

interface ImagePickerClasses {
    label?: string;
    subtitle?: string;
    helperText?: string;
    root?: string;
}
// export interface TFile {
// 	name: string;
// 	type: string;
// 	size: number | string;
// 	base64: string | ArrayBuffer | null;
// 	file: any;
// }

const returnImageCropSize = (
    imageUploadType?: string
): ReactCropProps['crop'] => {
    if (imageUploadType === 'mainEventImage') {
        return {
            height: 90,
            width: 90,
            y: 5,
            x: 5,
            unit: '%',
            aspect: 1 / 1,
        };
    }
    if (imageUploadType === 'coverImage') {
        return {
            height: 27.1,
            width: 90,
            unit: '%',
            y: 36,
            x: 5,
            aspect: 216 / 65,
        };
    }
    return {
        height: 90,
        width: 90,
        unit: '%',
    };
};

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
        name = '',
        label = 'Add Images',
        helperText,
        customParser,
        imgHW = 90,
        /* imagePlaceholderHeight = 50, */ classes: propClasses,
        helperTextProps,
        imageUploadType,
    } = fieldProps;
    const classes = useStyles();
    const valueKey = fieldConfig?.valueKey || '';
    const value: any = get(formikProps, `values.${name}`);
    // const [uploadingImgNum, setUploadingImgNum] = useState<number | undefined>();
    // const numAddedImages = typeof value?.length === 'number' ? value?.length : 0;
    const [open, setOpen] = useState(false);
    // const { withCropping = true, cropConfig={} } = props;
    const withCropping = true;
    const cropConfig = returnImageCropSize(imageUploadType);
    const [croppedImage, setCroppedImage] = useState<TFile>();
    const pictureUpload = async (prop: { imgs: TFile[]; _rem: any[] }) => {
        const { imgs } = prop;
        const image = await PictureModel.upload(imgs[0]);
        if (image) {
            if (!customParser && formikProps)
                formikProps.setFieldValue(valueKey, parsePicture(image));
            else if (formikProps && customParser)
                formikProps.setFieldValue(valueKey, customParser(image)); // Checking formikProps is only to workaround eslint warnings. If eslint updates allow disabling the error, this check can be removed.
        }
    };
    const pictureUploadTask = useAsyncTask(pictureUpload);
    /* useEffect(() => {
          if (pictureUploadTask.status !== 'PROCESSING') {
              setUploadingImgNum(undefined);
          }
      }, [pictureUploadTask.status]); */
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
        // files &&
        //   processFilesWithCallback(
        //     files,
        //     (prop: { imgs: TFile[]; _rem: any[] }) => {
        //       pictureUploadTask.run(prop);
        //     }
        //   );
    };

    const handleUPloadtwo = (croppedBase64?: string) => {
        // processFilesWithCallback(
        //   [{...croppedImage,base64:croppedBase64}],
        //   (prop: { imgs: TFile[]; _rem: any[] }) => {
        //     pictureUploadTask.run(prop);
        //   }
        // );
        if (croppedImage) {
            pictureUploadTask.run({
                imgs: [{ ...croppedImage, base64: croppedBase64 ?? '' }],
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
    // const handleComplete = (croppedBase64: string) => {
    // 	console.count('handleComplete');
    // 	if (croppedImage)
    // 		props.onDone?.([{ ...croppedImage, base64: croppedBase64 }]);
    // };
    const isLoading = pictureUploadTask.status === 'PROCESSING';
    // console.log('True or false', value?.[0]?.[0], formikProps, name);
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
                                <PgIcon
                                    icon="icon-add"
                                    color="secondary"
                                    styleClass={classes.icon}
                                />
                            ) : null}
                            {value ? (
                                <Box overflow="hidden">
                                    {' '}
                                    <img
                                        className={classes.img}
                                        width={imgHW}
                                        src={helpers.getPictureUrl(value, imgHW)}
                                        alt=""
                                    />{' '}
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
                                        onComplete={handleUPloadtwo}
                                    />
                                </>
                            ) : null}
                        </>
                    )}
                    <div id="imageRemoveOverlay" className={classes.imageRemoveOverlay}>
                        <IconButton onClick={(event) => removeItem(event)}>
                            <RemoveIcon color="contrast" />
                        </IconButton>
                    </div>
                </div>
            </Box>
            {helperText ||
            fieldError ||
            (pictureUploadTask.status === 'ERROR' &&
                pictureUploadTask.message === 'request entity too large') ? (
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
            position: 'relative',
            zIndex: 1,
            verticalAlign: 'middle',
            textAlign: 'center',
            '&:not(:last-child)': {
                marginRight: 20,
            },
        },
        disabled: {
            backgroundColor: theme.palette.grey.A200,
            border: 'none',
        },
        imgPlaceholder: {
            width: 100,
            height: 100,
            borderRadius: 3,
            border: `1px dashed ${theme.palette.secondary.main}`,
            position: 'relative',
        },
        input: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0,
            width: 'inherit',
            height: 'inherit',
            zIndex: 2,
            '&:not([disabled])': {
                cursor: 'pointer',
            },
        },
        hasImage: {
            border: 'none',
            backgroundColor: 'transparent',
            position: 'relative',
            '&:hover #imageRemoveOverlay': {
                display: 'flex',
            },
        },
        icon: {
            marginRight: '50%',
            marginLeft: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '50%',
            marginBottom: '50%',
            color: theme.palette.secondary.main,
        },
        disabledSVG: {
            opacity: 0,
        },
        img: {
            display: 'inline-block',
            zIndex: 2,
            position: 'relative',
        },
        loader: {
            transform: 'translateY(-50%)',
            marginTop: '50%',
            marginBottom: '50%',
        },
        imageRemoveOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'none',
            cursor: 'pointer',
            width: 'inherit',
            height: 'inherit',
            zIndex: 9,
            justifyContent: 'center',
            alignItems: 'center',
            '& .icon': {
                zIndex: 9,
            },
            '&::before': {
                backgroundColor: COLOR.secondary.blue,
                content: "' '",
                position: 'absolute',
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
