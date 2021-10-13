import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import React, { FC, useState } from 'react';
import ReactCrop, { Crop, ReactCropProps } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export interface ImageCropperProps {
    base64: string;
    cropConfig?: Crop;
    onClose?: () => void;
    onComplete?: (base64: string) => void;
    open: boolean;
}

const ImageCropper: FC<ImageCropperProps> = (props) => {
    const { base64, cropConfig, open, onClose, onComplete } = props;
    const [crop, setCrop] = useState<ReactCropProps['crop']>({
        height: 50,
        width: 50,
        unit: '%',
        x: 25,
        y: 25,
        ...cropConfig,
    });
    const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
    const [croppedImageBase64, setCroppedImageBase64] = useState<string>('');

    const makeClientCrop = async (crop: Required<Crop>) => {
        const croppedImageUrl = await getCroppedImg(
            imgRef || getSampleImage(),
            crop,
        ).catch((err) => {
            throw err;
        });
        getBase64ImageFromUrl(croppedImageUrl)
            .then((result) => setCroppedImageBase64(result))
            .catch((err) => console.error(err));
    };

    const getSampleImage = () => {
        if (base64) {
            var img = document.createElement('img');
            img.src = base64;
            document.getElementById('test')?.appendChild(img);
            img.id = 'test-img';
            img.className = 'ReactCrop__image';
            img.style.width = '100%';
            return img;
        } else return null;
    };

    const getBase64ImageFromUrl = async (imageUrl: string): Promise<string> => {
        var res = await fetch(imageUrl);
        var blob = await res.blob();

        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.addEventListener(
                'load',
                function () {
                    if (reader.result) resolve(reader.result as string);
                },
                false
            );

            reader.onerror = () => {
                return reject();
            };
            reader.readAsDataURL(blob);
        });
    };

    const getCroppedImg = (
        image: HTMLImageElement | null,
        crop: Required<Crop>,
    ): Promise<string> => {
        // eslint-disable-next-line no-throw-literal
        if (!image) throw '';
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        try {
            // eslint-disable-next-line no-throw-literal
            if (!ctx) throw '';
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        } catch (err) {
            console.log(err);
        }

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                let fileUrl = window.URL.createObjectURL(blob);
                // window.URL.revokeObjectURL(fileUrl);
                resolve(fileUrl);
            }, 'image/png');
        });
    };

    const handleDoneClick = () => {
        onComplete?.(croppedImageBase64);
        onClose?.();
    };

    return (
        <Dialog open={open} onClose={onClose} scroll={'paper'}>
            <DialogTitle>Crop Image</DialogTitle>
            <DialogContent dividers>
                <ReactCrop
                    crop={crop}
                    src={base64}
                    onChange={setCrop}
                    onComplete={(crop) => makeClientCrop(crop as Required<Crop>)}
                    onImageLoaded={setImgRef}
                    imageStyle={{ width: '100%' }}
                    // locked
                    minWidth={50}
                    minHeight={50}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDoneClick} color="primary">
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageCropper;
