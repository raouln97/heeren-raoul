import {
  useState,
  useEffect,
} from 'react';

export const useTypingEffect = (
  text,
  typingSpeed = 150
) => {
  const [
    displayedText,
    setDisplayedText,
  ] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(
        prev =>
          prev + text.charAt(index)
      );
      index++;
      if (index === text.length)
        clearInterval(timer);
    }, typingSpeed);

    return () => clearInterval(timer); // Clean up on component unmount
  }, [text, typingSpeed]);

  return displayedText;
};
