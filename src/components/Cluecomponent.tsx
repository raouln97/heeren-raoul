import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Fade,
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
import { postData } from '../services/services';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type Props = {
  clueId: number;
};

const ClueComponent: React.FC<Props> = props => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const [answerLength, setAnswerLength] = useState<number | undefined>(
    undefined
  );
  const [guessedClue, setGuessedClue] = useState(Array(answerLength).fill(''));
  const [clueText, setClueText] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null); // true for success, false for failure
  const [showFeedback, setShowFeedback] = useState(false);
  const [images, setImages] = useState([]);

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

  const submitClue = async () => {
    const body = {
      answer: guessedClue.join(''),
      clueId: props.clueId,
    };
    const response = await postData(
      `${process.env.REACT_APP_BACKEND_URL}applications/answer`,
      body
    );
    console.log('response is:', response);
    setSubmissionResult(response); // Assume response has a correct property
    setShowFeedback(true);
    if (response) {
      const body = { bufferImages: images, clueAnswer: guessedClue.join('') };
      await postData(`${process.env.REACT_APP_BACKEND_URL}aws/multiple`, body);
    }
    setTimeout(() => {
      setShowFeedback(false);
      if (response) window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    console.log(props.clueId);
    if (props.clueId) getClueData();
  }, [props.clueId]);

  useEffect(() => {
    setGuessedClue(Array(answerLength).fill(''));
  }, [answerLength]);

  const handleChange = (index, event) => {
    const newWord = [...guessedClue];
    newWord[index] = event.target.value.toUpperCase().substring(0, 1);
    setGuessedClue(newWord);

    // Move focus to next input if not the last one and if a character is entered
    if (index < answerLength - 1 && event.target.value) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  return clueText && answerLength > 1 ? (
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
      {showFeedback && (
        <Fade in={showFeedback} timeout={600}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '4rem',
            }}
          >
            {submissionResult ? (
              <CheckCircleOutlineIcon
                style={{ color: 'green', fontSize: 'inherit' }}
              />
            ) : (
              <HighlightOffIcon style={{ color: 'red', fontSize: 'inherit' }} />
            )}
          </Box>
        </Fade>
      )}
      {!showFeedback && (
        <>
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
            <WordInput
              length={answerLength}
              handleChange={handleChange}
              guessedClue={guessedClue}
            />
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
              onClick={submitClue}
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
            <CameraCarousel images={images} setImages={setImages} />
          </Grid>
        </>
      )}
    </Grid>
  ) : (
    <></>
  );
};

export default ClueComponent;
