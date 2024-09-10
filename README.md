# React Image Picker

`react-image-picker` is a versatile React component that allows users to select images from a variety of sources. It's built using TypeScript and React, making it easy to integrate into any React project.

## Features

- Supports selecting images from the device's file system.
- Allows users to capture images using the device's camera.
- Supports selecting images from a URL.
- Provides a customizable UI for a seamless user experience.

To install `react-image-picker` in your project directly from GitHub, you can use npm or yarn:

### Install with npm
```bash
npm install git+https://github.com/noworry-b-still/react-image-picker.git
```

### Install with yarn
```bash
yarn add https://github.com/noworry-b-still/react-image-picker.git
```

## Usage

```bash
import React from 'react';
import ImagePicker from 'react-image-picker';

const App = () => {
  const handleImageSelect = (image) => {
    // Handle the selected image
  };

  return (
    <div>
      <h1>Image Picker Example</h1>
      <ImagePicker onImageSelect={handleImageSelect} />
    </div>
  );
};

export default App;
```

### Acknowledgments
- React - A JavaScript library for building user interfaces.
- TypeScript - A superset of JavaScript that adds static types.

