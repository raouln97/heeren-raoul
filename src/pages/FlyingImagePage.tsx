import { useEffect, useState } from 'react';
import FlyingImages from '../components/FlyingComponents/FlyingImages';
import { CircularProgress, Grid } from '@mui/material';
import logoUrl from '../assets/LogoWithWords.svg';

export const FlyingImagePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImages = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}aws/all`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const allImages = await response.json(); // Convert the response to JSON
    setImages(allImages);
    setLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Grid
      container
      alignItems="center"
      display="flex"
      style={{
        minHeight: '100vh',
      }}
      flexDirection="column"
    >
      <>
        <img src={logoUrl} alt="Description" width="150px" height="150px" />
        {loading && <CircularProgress color="secondary" />}
        {!loading && (
          <FlyingImages
            images={images}
            //   musicUrl={'https://youtu.be/zp7NtW_hKJI?si=UsKvaLDTVCIvuSvR&t=16'}
            musicUrl={
              'https://heeren-raoul-spotify.s3.amazonaws.com/spotifydown.com - A Sky Full of Stars.mp3'
            }
          />
        )}
      </>
    </Grid>
  );
};
