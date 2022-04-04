function createImage(name) {
  return new Image(name);
}
const image = createImage("photo.jpeg");
// gives us more freedom and add more types of images and refactoring

// const image = new Image(name); this will bind the image creation to One type of image

function createImage(name) {
  if (name.match(/\.jpe?g$/)) {
    return new ImageJpeg(name);
  } else if (name.match(/\.gif$/)) {
    return new ImageGif(name);
  } else if (name.match(/\.png$/)) {
    return new ImagePng(name);
  } else {
    throw new Error("Unsupported format");
  }
}

// example : knex : a SQL query builder that supports multiple databases. Its package exports just a function factory.