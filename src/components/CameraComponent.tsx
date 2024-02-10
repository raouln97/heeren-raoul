import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Delete,
  ArrowBackIosNew,
  ArrowForwardIos,
} from '@mui/icons-material';

const ImageCaptureCarousel = () => {
  const [images, setImages] = useState(
    []
  );
  const [
    currentImage,
    setCurrentImage,
  ] = useState(0);

  const handleCapture = event => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl =
        URL.createObjectURL(file);
      setImages(prevImages => [
        ...prevImages,
        imageUrl,
      ]);
      setCurrentImage(images.length); // Focus on the newly added image
    }
  };

  const deleteImage = index => {
    setImages(prevImages =>
      prevImages.filter(
        (_, i) => i !== index
      )
    );
    setCurrentImage(prevCurrentImage =>
      prevCurrentImage > 0
        ? prevCurrentImage - 1
        : 0
    );
  };

  const goToNextImage = () => {
    setCurrentImage(
      prevCurrentImage =>
        (prevCurrentImage + 1) %
        images.length
    );
  };

  const goToPreviousImage = () => {
    setCurrentImage(
      prevCurrentImage =>
        (prevCurrentImage -
          1 +
          images.length) %
        images.length
    );
  };

  return (
    <Box textAlign="center">
      <input
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        id="icon-button-file"
        type="file"
        onChange={handleCapture}
      />
      <label htmlFor="icon-button-file">
        <Button
          variant="contained"
          component="span"
        >
          Open Camera
        </Button>
      </label>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        {images.length > 0 && (
          <>
            <IconButton
              onClick={
                goToPreviousImage
              }
              disabled={
                images.length < 2
              }
            >
              <ArrowBackIosNew />
            </IconButton>
            <Box
              position="relative"
              sx={{
                display: 'inline-block',
              }}
            >
              <img
                src={
                  images[currentImage]
                }
                alt="Capture"
                style={{
                  width: '100%',
                  maxHeight: '300px',
                }}
              />
              <IconButton
                color="error"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
                onClick={() =>
                  deleteImage(
                    currentImage
                  )
                }
              >
                <Delete />
              </IconButton>
            </Box>
            <IconButton
              onClick={goToNextImage}
              disabled={
                images.length < 2
              }
            >
              <ArrowForwardIos />
            </IconButton>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ImageCaptureCarousel;
