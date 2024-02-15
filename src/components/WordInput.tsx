import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const WordInput = ({ length, handleChange, guessedClue }) => {
  console.log('HERE', length);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTextField-root': {
          m: 1,
          width: '40px',
        },
        flexWrap: 'wrap',
        // gap: '10px',
        // padding: '10px',
      }}
    >
      {guessedClue.map((char, index) => (
        <TextField
          key={index}
          id={`input-${index}`}
          variant="outlined"
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: 'center',
              padding: '10px',
            },
            pattern: '[A-Za-z]',
          }}
          value={char}
          onChange={e => handleChange(index, e)}
          onKeyUp={e => {
            if (
              (e.target as HTMLInputElement).value === '' &&
              e.key === 'Backspace' &&
              index > 0
            ) {
              // Move focus to previous input on backspace if current is empty
              document.getElementById(`input-${index - 1}`).focus();
            }
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      ))}
    </Box>
  );
};

export default WordInput;
