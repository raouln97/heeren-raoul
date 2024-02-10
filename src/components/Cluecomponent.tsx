import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import WordInput from './WordInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logoUrl from '../assets/LogoWithWords.svg';
import CameraComponent from './CameraComponent';
import CameraCarousel from './CameraComponent';

const ClueComponent = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(
    theme.breakpoints.down('sm')
  );
  const [guessedClue, setGuessedClue] =
    useState('');
  const clueText =
    "In a realm where time weaves tales both old and new, Find the guardian that watched our story's debut. In a land where skyscrapers reach and boats gently sway, Where a fairy tale from afar finds its modern-day play. By the river, where the water's stories unfold, Seek the place where German tales are told.";
  //   const displayedText = useTypingEffect(
  //     clueText,
  //     100
  //   ); // Adjust typing speed as needed

  const handleChange = (event: {
    target: {
      value: React.SetStateAction<string>;
    };
  }) => {
    setGuessedClue(event.target.value);
  };

  return (
    <Grid
      container
      justifyContent="center"
      display="flex"
      flexDirection="column"
      maxWidth={isXs ? '95%' : '800px'}
      sx={{
        backgroundColor: '#feeee5',
        p: 3,
      }}
    >
      <Grid
        item
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'cursive',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
          }}
        >
          {clueText}
        </Typography>
      </Grid>
      <Grid
        item
        justifyContent="center"
        alignItems="center"
        display="flex"
        paddingTop="20px"
      >
        {/* <TextField
          variant="outlined"
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: 'center',
              padding: '10px',
            },
            pattern: '[A-Za-z]',
          }}
          value={guessedClue}
          onChange={e =>
            handleChange(e)
          }
        /> */}
        <WordInput length={10} />
      </Grid>
      <Grid
        item
        justifyContent="flex-end"
        alignItems="center"
        display="flex"
        paddingTop="20px"
      >
        <Button
          variant="contained"
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#e6dec6',
          }}
        >
          <Typography
            color="black"
            variant="caption"
          >
            Submit
          </Typography>
          <img
            src={logoUrl}
            alt="Description"
            width="50px"
            height="50px"
          />
        </Button>
      </Grid>
      <Grid
        item
        justifyContent="center"
        alignItems="center"
        display="flex"
        paddingTop="20px"
      >
        <CameraCarousel />
      </Grid>
    </Grid>
  );
};

export default ClueComponent;
