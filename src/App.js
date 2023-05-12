import './App.css';
import logo from './logo.svg';
import Form from './form/form';
import { Grid, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      salaryType: 'monthly',
      salary: 0,
      shouldPay: '?',
      percents: 0,
      deductible: 0,
      beforeNetTax: 0,
      topskat: 0,
      skat: 0,
      afterTax: 0,
    };
    this.resultRef = React.createRef()  
  }

  render() {
 //   const resultRef = useRef(null);
    ChartJS.register(ArcElement, Tooltip);
    const centerText = {
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
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
          var elementHamSkat = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the hamSkat of label.
          var fontSizeToUse = Math.min(newFontSize, elementHamSkat, maxFontSize);
          var minFontSize = centerConfig.minFontSize;
          var lineHamSkat = centerConfig.lineHamSkat || 25;
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

          // Move the center up depending on line hamSkat and number of lines
          centerY -= (lines.length / 2) * lineHamSkat;

          for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHamSkat;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
      }
    }

    const options = {
      legend: {
        display: false
      },
      elements: {
        center: {
          text: this.state.salary + ' DKK',
          color: '#FFF', // Default is #000000
          fontStyle: 'Arial', // Default is Arial
          sidePadding: 10, // Default is 20 (as a percentage)
          minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
          lineHamSkat: 10 // Default is 25 (in px), used for when text wraps
        }
      },
      cutout: '80%',
    };
    const data = {
      labels: ['Income after tax', 'Tax', 'Top Skat'],
      datasets: [
        {
          label: 'DKK',
          data: [
            this.state.afterTax,

            this.state.skat,
            //this.state.beforeNetTax,
            this.state.topskat],
          backgroundColor: [
            'rgba(156, 211, 194, 1)',
            'rgba(151,126,196, 1)',
            //   'rgba(223,136,133, 1)',
            'rgba(223,136,133, 1)',
          ],
          borderColor: [
            'rgba(156, 211, 194, 1)',
            'rgba(151,126,196, 1)',
            //  'rgba(223,136,133, 1)',
            'rgba(223,136,133, 1)',
          ],
          // borderWidth: 1,
        },
      ],
    };

    const handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      if (target.type === 'number' && target.value < 0) {
        target.value = 0;
      }

      if (name === 'percents' && target.value > 100) {
        target.value = 100;
      }

      this.setState({
        [name]: value
      });
    }

    const handleToggleChange = (event, newValue) => {
      if (newValue.length) {
        this.setState({ salaryType: newValue })
      }
    }

    const caclulateSkat = () => {
      const multiplier = this.state.salaryType === 'monthly' ? 12 : 1;
      const percentage = this.state.percents;

      const amount = this.state.salary ;
      const amSkat = amount * 0.08;
      this.setState({ beforeNetTax: amount - amSkat })
      const tax = (amount - amSkat - this.state.deductible) * percentage / 100;

      console.log(amSkat, tax, this.state.deductible, amount - amSkat - this.state.deductible)
      this.setState({ skat: tax });

      if (amount * multiplier - amount * multiplier * 0.08 >= 568900.4) {
        const topskat = (this.state.salary * multiplier - 568900.4) * 0.15 / 12
        this.setState({ shouldPay: "YES" })
        this.setState({ topskat: topskat })
        this.setState({ afterTax: this.state.salary - amSkat - tax - topskat })
      } else if (amount * multiplier - amount * multiplier * 0.08 < 568900.4) {
        this.setState({ shouldPay: "NO" })
        this.setState({ afterTax: this.state.salary - amSkat - tax })
      } else {
        this.setState({ shouldPay: "?" })
      }
      setTimeout(() => this.resultRef.current.scrollIntoView({ behavior: "smooth"}), 2);
      
    }

    const numberFormatter = Intl.NumberFormat('dk-DK', { style: 'currency', currency: 'DKK' });
    return (
      <Grid container
        spacing={0}
        // direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} md={9} bgcolor={'rgb(249, 251, 253)'} borderRadius={'15px 15px 0px 0px'} marginTop={'10px'} >
          <Box
            sx={{
              // width: 1024,
              // hamSkat: 500,
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
              <img src="logo.svg" className='logo' />
              {/* <Typography variant="h3" component="h1" align="center" sx={{ fontWamSkat: "bold", mb: "20px" }}>Calculate Topskat</Typography> */}
              <Form inputHandler={handleInputChange} toggleHandler={handleToggleChange} caclulateSkat={caclulateSkat} salaryType={this.state.salaryType} shouldPay={this.state.shouldPay} resultRef={this.resultRef} />
            </div>
          </Box>
        </Grid>
        {this.state.skat != 0 &&
          <Grid ref={this.resultRef} item xs={12} md={9} bgcolor={'rgb(48,47,78)'}>
            <Box
              sx={{
                // width: 1024,
                // hamSkat: 500,
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
        }
        {this.state.skat != 0 &&
          <Grid item xs={12} md={9} bgcolor={'rgb(238, 241, 249)'}>
            <Box
              sx={{
                // width: 1024,
                // hamSkat: 500,
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
                  <span className='calc_label_tax'>Tax</span><strong className='amount'>{numberFormatter.format(this.state.skat)}</strong>
                </div>
                <div className='calc_result'>
                  <span className='calc_label_top'>Top tax</span><strong className='amount'>{numberFormatter.format(this.state.topskat)}</strong>
                </div>
                <div className='calc_result'>
                  <span className='calc_label_total_tax'>Total tax</span><strong className='amount'>{numberFormatter.format(this.state.skat + this.state.topskat)}</strong>
                </div>
                <div className='calc_result'>
                  <span className='calc_label_income'>Income after tax</span><strong className='amount'>{numberFormatter.format(this.state.afterTax)}</strong>
                </div>
              </div>
            </Box>
          </Grid>
        }
      </Grid>
    )
  }
}
export default App;