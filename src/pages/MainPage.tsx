import { Grid } from '@mui/material';
import ClueComponent from '../components/Cluecomponent';
import logoUrl from '../assets/LogoWithWords.svg';

const MainPage = () => {
  return (
    <Grid
      container
      alignItems="center"
      display="flex"
      style={{ minHeight: '100vh' }}
      flexDirection="column"
    >
      <>
        <img
          src={logoUrl}
          alt="Description"
          width="150px"
          height="150px"
        />
        <ClueComponent />
      </>
    </Grid>
  );
};

export default MainPage;
