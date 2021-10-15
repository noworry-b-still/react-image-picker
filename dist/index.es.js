import { getFieldError, attachField } from 'react-forms';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles, createStyles, Box, InputLabel, LinearProgress, IconButton, FormHelperText } from '@material-ui/core';
import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { get } from 'lodash';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var ImageCropper = function (props) {
    var base64 = props.base64, cropConfig = props.cropConfig, open = props.open, onClose = props.onClose, onComplete = props.onComplete;
    var _a = useState(__assign({ height: 50, width: 50, unit: "%", x: 25, y: 25 }, cropConfig)), crop = _a[0], setCrop = _a[1];
    var _b = useState(null), imgRef = _b[0], setImgRef = _b[1];
    var _c = useState(""), croppedImageBase64 = _c[0], setCroppedImageBase64 = _c[1];
    var makeClientCrop = function (crop) { return __awaiter(void 0, void 0, void 0, function () {
        var croppedImageUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCroppedImg(imgRef || getSampleImage(), crop).catch(function (err) {
                        throw err;
                    })];
                case 1:
                    croppedImageUrl = _a.sent();
                    getBase64ImageFromUrl(croppedImageUrl)
                        .then(function (result) { return setCroppedImageBase64(result); })
                        .catch(function (err) { return console.error(err); });
                    return [2 /*return*/];
            }
        });
    }); };
    var getSampleImage = function () {
        var _a;
        if (base64) {
            var img = document.createElement("img");
            img.src = base64;
            (_a = document.getElementById("test")) === null || _a === void 0 ? void 0 : _a.appendChild(img);
            img.id = "test-img";
            img.className = "ReactCrop__image";
            img.style.width = "100%";
            return img;
        }
        else
            return null;
    };
    var getBase64ImageFromUrl = function (imageUrl) { return __awaiter(void 0, void 0, void 0, function () {
        var res, blob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(imageUrl)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.blob()];
                case 2:
                    blob = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var reader = new FileReader();
                            reader.addEventListener("load", function () {
                                if (reader.result)
                                    resolve(reader.result);
                            }, false);
                            reader.onerror = function () {
                                return reject();
                            };
                            reader.readAsDataURL(blob);
                        })];
            }
        });
    }); };
    var getCroppedImg = function (image, crop) {
        // eslint-disable-next-line no-throw-literal
        if (!image)
            throw "";
        var canvas = document.createElement("canvas");
        var scaleX = image.naturalWidth / image.width;
        var scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        var ctx = canvas.getContext("2d");
        // eslint-disable-next-line no-throw-literal
        if (!ctx)
            throw "";
        ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
        return new Promise(function (resolve) {
            canvas.toBlob(function (blob) {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }
                var fileUrl = window.URL.createObjectURL(blob);
                // window.URL.revokeObjectURL(fileUrl);
                resolve(fileUrl);
            }, "image/png");
        });
    };
    var handleDoneClick = function () {
        onComplete === null || onComplete === void 0 ? void 0 : onComplete(croppedImageBase64);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    return (React.createElement(Dialog, { open: open, onClose: onClose, scroll: "paper" },
        React.createElement(DialogTitle, null, "Crop Image"),
        React.createElement(DialogContent, { dividers: true },
            React.createElement(ReactCrop, { crop: crop, src: base64, onChange: setCrop, onComplete: function (crop) { return makeClientCrop(crop); }, onImageLoaded: setImgRef, imageStyle: { width: "100%" }, 
                // locked
                minWidth: 50, minHeight: 50 })),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onClose, color: "primary" }, "Cancel"),
            React.createElement(Button, { onClick: handleDoneClick, color: "primary" }, "Done"))));
};

var helpers = {
    getPictureUrl: function (picture, width, height, quality) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (quality === void 0) { quality = 0; }
        if (!picture)
            return "";
        console.log("Picture", picture);
        var path = picture.url || picture.imagePath;
        // const path = picture.filePath || picture.imagePath;
        if (path) {
            var transformationAttr = [];
            if (width > 0)
                transformationAttr.push("w-" + Math.ceil(width));
            if (height > 0)
                transformationAttr.push("h-" + Math.ceil(height));
            if (quality > 0)
                transformationAttr.push("q-" + Math.ceil(height));
            var transformation = "" + transformationAttr.join(",");
            var imageUrl = path + "?tr=" + transformation;
            return imageUrl;
        }
        return "";
    },
};

var ImagePicker = function (props) {
    var _a = props.fieldProps, fieldProps = _a === void 0 ? {} : _a, fieldConfig = props.fieldConfig, _b = props.formikProps, formikProps = _b === void 0 ? {} : _b;
    var _c = fieldProps.name, name = _c === void 0 ? "" : _c, _d = fieldProps.label, label = _d === void 0 ? "Add Images" : _d, helperText = fieldProps.helperText, customParser = fieldProps.customParser, _e = fieldProps.imgHW, imgHW = _e === void 0 ? 90 : _e, 
    /* imagePlaceholderHeight = 50, */ propClasses = fieldProps.classes, helperTextProps = fieldProps.helperTextProps, 
    // imageUploadType,
    uploadPicture = fieldProps.uploadPicture, cropConfig = fieldProps.cropConfig;
    var classes = useStyles();
    var valueKey = (fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.valueKey) || "";
    var value = get(formikProps, "values." + name);
    // const [uploadingImgNum, setUploadingImgNum] = useState<number | undefined>();
    // const numAddedImages = typeof value?.length === 'number' ? value?.length : 0;
    var _f = useState(false), open = _f[0], setOpen = _f[1];
    var _g = useState(""), status = _g[0], setStatus = _g[1];
    var _h = useState(""), message = _h[0], setMessage = _h[1];
    // const cropConfig = returnImageCropSize(imageUploadType);
    var _j = useState(), croppedImage = _j[0], setCroppedImage = _j[1];
    var pictureUpload = function (prop) { return __awaiter(void 0, void 0, void 0, function () {
        var imgs, image, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setStatus("PROCESSING");
                    imgs = prop.imgs;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, uploadPicture(imgs[0])];
                case 2:
                    image = _a.sent();
                    if (image) {
                        setStatus("SUCCESS");
                        if (!customParser && formikProps)
                            formikProps.setFieldValue(valueKey, image);
                        else if (formikProps && customParser)
                            formikProps.setFieldValue(valueKey, customParser(image)); // Checking formikProps is only to workaround eslint warnings. If eslint updates allow disabling the error, this check can be removed.
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setStatus("ERROR");
                    setMessage(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // const pictureUploadTask = pictureUpload;
    /* useEffect(() => {
            if (pictureUploadTask.status !== 'PROCESSING') {
                setUploadingImgNum(undefined);
            }
        }, [pictureUploadTask.status]); */
    var fieldError = getFieldError(name, formikProps);
    var handleChange = function (event) {
        var files = event.target.files;
        if (files) {
            var file_1 = files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                var fileInfo = {
                    name: file_1.name,
                    type: file_1.type,
                    size: Math.round(file_1.size / 1000) + " kB",
                    base64: reader_1.result,
                    file: file_1,
                };
                setOpen(true);
                setCroppedImage(fileInfo);
            };
            reader_1.readAsDataURL(file_1);
        }
        // files &&
        //   processFilesWithCallback(
        //     files,
        //     (prop: { imgs: TFile[]; _rem: any[] }) => {
        //       pictureUploadTask.run(prop);
        //     }
        //   );
    };
    var handleUPloadtwo = function (croppedBase64) {
        // processFilesWithCallback(
        //   [{...croppedImage,base64:croppedBase64}],
        //   (prop: { imgs: TFile[]; _rem: any[] }) => {
        //     pictureUploadTask.run(prop);
        //   }
        // );
        if (croppedImage) {
            pictureUpload({
                imgs: [__assign(__assign({}, croppedImage), { base64: croppedBase64 !== null && croppedBase64 !== void 0 ? croppedBase64 : "" })],
                _rem: [],
            });
        }
    };
    var removeItem = function (event) {
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
    var isLoading = status === "PROCESSING";
    // console.log('True or false', value?.[0]?.[0], formikProps, name);
    return (React.createElement(Box, null,
        React.createElement(Box, { mb: 1 },
            React.createElement(InputLabel, { className: propClasses === null || propClasses === void 0 ? void 0 : propClasses.label, shrink: false }, label)),
        React.createElement(Box, { display: "flex" },
            React.createElement("div", { className: value && (value === null || value === void 0 ? void 0 : value.url) ? classes.hasImage : classes.imgPlaceholder },
                isLoading ? (React.createElement(LinearProgress, { color: "secondary", className: classes.loader })) : (React.createElement(React.Fragment, null,
                    !value || !(value === null || value === void 0 ? void 0 : value.url) ? (React.createElement(AddIcon, { color: "secondary", className: classes.icon })) : null,
                    value ? (React.createElement(Box, { overflow: "hidden" },
                        " ",
                        React.createElement("img", { className: classes.img, width: imgHW, src: helpers.getPictureUrl(value, imgHW), alt: "" }),
                        " ")) : null,
                    React.createElement("input", { accept: "image/*", title: "", type: "file", name: "" + name, onChange: function (event) { return handleChange(event); }, className: classes.input }),
                    (croppedImage === null || croppedImage === void 0 ? void 0 : croppedImage.base64) ? (React.createElement(React.Fragment, null,
                        React.createElement(ImageCropper, { open: open, onClose: function () { return setOpen(false); }, base64: croppedImage.base64, cropConfig: cropConfig, onComplete: handleUPloadtwo }))) : null)),
                React.createElement("div", { id: "imageRemoveOverlay", className: classes.imageRemoveOverlay },
                    React.createElement(IconButton, { onClick: function (event) { return removeItem(event); } },
                        React.createElement(RemoveIcon, null))))),
        helperText ||
            fieldError ||
            (status === "ERROR" && message === "request entity too large") ? (React.createElement(FormHelperText, __assign({}, helperTextProps, { className: propClasses === null || propClasses === void 0 ? void 0 : propClasses.helperText, error: !!fieldError }), fieldError || helperText)) : null));
};
var useStyles = makeStyles(function (theme) {
    return createStyles({
        root: {
            backgroundColor: "" + theme.palette.secondary.main,
            border: "1px dashed " + theme.palette.secondary.main,
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
            border: "1px dashed " + theme.palette.secondary.main,
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
    });
});

attachField("image-picker-with-crop", React.createElement(ImagePicker, null));

var index = "./lib";

export { index as default };
//# sourceMappingURL=index.es.js.map
