import { Grid } from '@mui/material';
import ClueComponent from '../components/Cluecomponent';
import logoUrl from '../assets/LogoWithWords.svg';
import { useParams } from 'react-router-dom';

const MainPage = () => {
  // Access the clueId query parameter
  const { id } = useParams();
  console.log(id);
  const clueId = parseInt(id, 10);
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
        <ClueComponent clueId={clueId} />
      </>
    </Grid>
  );
};

export default MainPage;
