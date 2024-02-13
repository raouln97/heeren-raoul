import React, { useEffect, useState } from 'react';
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

type Props = {
  clueId: number;
};

const ClueComponent: React.FC<Props> = props => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const [guessedClue, setGuessedClue] = useState('');
  const [clueText, setClueText] = useState('');
  const [answerLength, setAnswerLength] = useState<number | undefined>(
    undefined
  );
  const getClueData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}applications/${props.clueId}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const clueData = await response.json(); // Convert the response to JSON
    setClueText(clueData.clue);
    console.log(clueData.answerLength);
    setAnswerLength(clueData.answerLength);
  };

  useEffect(() => {
    console.log(props.clueId);
    if (props.clueId) getClueData();
  }, [props.clueId]);
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

  return clueText ? (
    <Grid
      container
      justifyContent="center"
      display="flex"
      flexDirection="column"
      maxWidth={isXs ? '95%' : '800px'}
      sx={{
        // backgroundColor: '#7E7774',
        p: 3,
      }}
    >
      <Grid item justifyContent="center" alignItems="center" display="flex">
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'cursive',
            fontSize: '20px',
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
        <WordInput length={answerLength} />
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
            backgroundColor: '#FFE8D6',
          }}
        >
          <Typography color="black" variant="caption">
            Submit
          </Typography>
          <img src={logoUrl} alt="Description" width="50px" height="50px" />
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
  ) : (
    <></>
  );
};

export default ClueComponent;
