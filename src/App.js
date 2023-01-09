import logo from './logo.svg';
import './App.css';
import Form from './form/form';
import { Grid, Box } from "@mui/material";
import Typography from '@mui/material/Typography';


function App() {
  return (
    <Grid container
      spacing={0}
      // direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} md={9}>
        <Box
          sx={{
            // width: 1024,
            // height: 500,
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            // textAlign: 'center',
            p: 10,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 4,
          }}
        >
          <div>
          <Typography variant="h3" component="h1" align="center" sx={{fontWeight: "bold", mb: "20px"}}>Calculate Topskat</Typography>
          
          
            <Form />
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}

export default App;
