const helpers = {
  getPictureUrl: (picture: any, width = 0, height = 0, quality = 0) => {
    if (!picture) return "";
    console.log("Picture", picture);
    const path = picture.url || picture.imagePath;
    // const path = picture.filePath || picture.imagePath;
    if (path) {
      const transformationAttr = [];
      if (width > 0) transformationAttr.push(`w-${Math.ceil(width)}`);
      if (height > 0) transformationAttr.push(`h-${Math.ceil(height)}`);
      if (quality > 0) transformationAttr.push(`q-${Math.ceil(height)}`);

      const transformation = `${transformationAttr.join(",")}`;
      const imageUrl = `${path}?tr=${transformation}`;
      return imageUrl;
    }
    return "";
  },
};
export default helpers;
