import { attachField } from "react-forms";
import ImagePicker from "./ImagePicker";
import React from "react";
export * from "./ImagePicker";

attachField("image-picker-with-crop", <ImagePicker />);
