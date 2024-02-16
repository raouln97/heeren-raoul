import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import confetti from 'canvas-confetti'; // Make sure you've run `npm install canvas-confetti`

const FlyingImages = ({ images, musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(-1);
  const audioRef = React.useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      confetti();

      setActiveImageIndex(index);
      index = (index + 1) % images.length;
    }, 3000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Background Images Grid - Always Blurred */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '10px',
          justifyItems: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          filter: activeImageIndex === -1 ? 'none' : 'blur(8px)', // Blur when an image is active
          transition: 'filter 0.5s ease-out', // Smooth transition for blur effect
          zIndex: 1,
        }}
      >
        {images.map((image, index) => (
          <Box
            component="img"
            key={index}
            src={image}
            alt={`Background ${index}`}
            sx={{
              maxWidth: '100px', // Adjust size as needed
              opacity: 0.5,
            }}
          />
        ))}
      </Box>

      {/* Active Image Overlay - Not Blurred */}
      {activeImageIndex !== -1 && (
        <Box
          component="img"
          src={images[activeImageIndex]}
          alt={`Active ${activeImageIndex}`}
          paddingTop="50px"
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)', // Adjust scaling as needed
            maxWidth: '250px', // Adjust size as needed
            height: '400px',
            zIndex: 2,
            transition: 'transform 0.5s ease-out', // Smooth transition for pop effect
          }}
        />
      )}

      <audio ref={audioRef} src={musicUrl} autoPlay loop />
      <IconButton
        onClick={togglePlay}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 10,
          color: '#FFE8D6',
        }}
        aria-label="play/pause"
      >
        {isPlaying ? (
          <PauseCircleFilledIcon fontSize="large" />
        ) : (
          <PlayCircleFilledWhiteIcon fontSize="large" />
        )}
      </IconButton>
    </Box>
  );
};

export default FlyingImages;
