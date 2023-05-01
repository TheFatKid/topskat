import logo from './logo.svg';
import './App.css';
import Form from './form/form';
import { Grid, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function App() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const centerText = {
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        console.log(chart)
        // Get ctx from string
        var ctx = chart.ctx;

        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt.split(' ');
        var line = '';
        var lines = [];

        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (var n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    }
  }

  const options = {
    elements: {
      center: {
        text: '777.000 DKK',
        color: '#FFF', // Default is #000000
        fontStyle: 'Arial', // Default is Arial
        sidePadding: 10, // Default is 20 (as a percentage)
        minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
        lineHeight: 10 // Default is 25 (in px), used for when text wraps
      }
    },
    cutout: '80%'
  }
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
            <Doughnut data={data} plugins={[centerText]} options={options} />
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