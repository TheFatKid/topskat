import logo from './logo.svg';
import './App.css';
import Form from './form/form';
import { Grid, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function App() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    datasets: [
      {
        label: 'Amount, DKK',
        data: [488154, 192189, 19664, 56000],
        backgroundColor: [
          'rgba(156, 211, 194, 1)',
          'rgba(151,126,196, 1)',
          'rgba(223,136,133, 1)',
          'rgba(235,187,132, 1)',
        ],
        borderColor: [
          'rgba(156, 211, 194, 1)',
          'rgba(151,126,196, 1)',
          'rgba(223,136,133, 1)',
          'rgba(235,187,132, 1)',
        ],
        // borderWidth: 1,
      },
    ],
  };
  return (
    <Grid container
      spacing={0}
      // direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} md={9} bgcolor={'white'}>
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

            borderRadius: 4,
          }}
        >
          <div>
            <Typography variant="h3" component="h1" align="center" sx={{ fontWeight: "bold", mb: "20px" }}>Calculate Topskat</Typography>
            <Form />
          </div>
        </Box>

      </Grid>
      <Grid item xs={12} md={9} bgcolor={'rgb(48,47,78)'}>
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

            borderRadius: 4,
          }}
        >
          <div>
            <Doughnut data={data} />
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} md={9} bgcolor={'rgb(238, 241, 249)'}>
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
            pt: 5,
            m: 1,

            borderRadius: 4,
          }}
        >
          <div className="label">
            <label>Your yearly overview</label>
          </div>
          <div className='result_wrapper'>
            <div className='calc_result'>
              <span className='calc_label_tax'>Tax</span><strong className='amount'>192189 kr.</strong>
            </div>
            <div className='calc_result'>
              <span className='calc_label_top'>Top tax</span><strong className='amount'>56000 kr.</strong>
            </div>
            <div className='calc_result'>
              <span className='calc_label_total'>Total tax</span><strong className='amount'>19664 kr.</strong>
            </div>
            <div className='calc_result'>
              <span className='calc_label_income'>Income after tax</span><strong className='amount'>488154 kr.</strong>
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}
export default App;
