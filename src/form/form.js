import React from "react";
import { Button, TextField, Grid } from "@mui/material";
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, rgbToHex, ThemeProvider } from '@mui/material/styles';
import { styled } from "@mui/material/styles";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';



class Form extends React.Component {

    constructor(props) {
        super(props);
        // this.state = { salaryType: 'monthly', salary: 0, shouldPay: '?', percents: 0, deductible: 0 };
    }

    render() {

        // const handleInputChange = (e) => {
        //     this.setState({ value: e.target.value })
        // }

        const theme = createTheme({
            palette: {
                primary: {
                    main: 'rgb(150, 126, 195)',
                    darker: 'rgb(150, 126, 195)'
                },
                secondary: {
                    main: '#11cb5f',
                },
            },
        });
        const ToggleButton = styled(MuiToggleButton)({
            "&.MuiButtonBase-root": {
                backgroundColor: 'rgb(238, 241, 249)',
                borderRadius: '10px',
                border: 'none',
                width: '50%',
                textTransform: 'none'
            },
            "&.Mui-selected, &.Mui-selected:hover": {
                color: "white",
                backgroundColor: 'rgb(150, 126, 195)',
            },
            "&.Mui-selected.MuiToggleButtonGroup-grouped:not(:last-of-type), &.Mui-selected.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
                borderRadius: '10px',
                borderTopRightRadius: '10px',
            }
        });

        const ToggleButtonGroup = styled(MuiToggleButtonGroup)({
            "&.MuiToggleButtonGroup-root": {
                borderRadius: '10px',
                backgroundColor: 'rgb(238, 241, 249)',
                width: '100%',
            }
        });

        return (
            <ThemeProvider theme={theme} >
                <form>
                    <div className="label">
                        <label>Enter you salary</label>
                    </div>
                    <ToggleButtonGroup
                        color="primary"
                        value={this.props.salaryType}
                        exclusive
                        onChange={this.props.toggleHandler}
                        aria-label="Salary"
                        size="small"
                        name="salaryType"
                        sx={{mt: '10px'}}
                    >
                        <ToggleButton value="monthly">Monthly</ToggleButton>
                        <ToggleButton value="yearly">Yearly</ToggleButton>
                    </ToggleButtonGroup>
                    <FormControl fullWidth sx={{ mt: '10px', mb: '10px' }} label="Salary">
                        <OutlinedInput
                            type="number"
                            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            id="salary"
                            name="salary"
                            endAdornment={<InputAdornment position="end">kr.</InputAdornment>}
                            onChange={this.props.inputHandler}
                        />
                    </FormControl>
                    <div className="label">
                        <label>Enter you percentage</label>
                    </div>
                    <FormControl fullWidth sx={{ mt: '10px', mb: '10px' }} label="Percentage">
                        <OutlinedInput
                            type="number"
                            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            id="percentage"
                            name="percents"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            onChange={this.props.inputHandler}
                        />
                    </FormControl>
                    <div className="label">
                        <label>Enter you deductible</label>
                    </div>
                    <FormControl fullWidth sx={{ mt: '10px', mb: '10px' }} label="Deductible">
                        <OutlinedInput
                            type="number"
                            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            id="deductible"
                            name="deductible"
                            endAdornment={<InputAdornment position="end">kr.</InputAdornment>}
                            onChange={this.props.inputHandler}
                        />
                    </FormControl>

                    <Typography align="center" component={"div"} sx={{ fontWeight: "bold", fontSize: "1.3em" }}>Are you paying topskat?</Typography>

                    <Typography id="result" align="center" component={"div"}
                        sx={{ fontWeight: "bold", color: "rgb(150,126,195)" }}>{this.props.shouldPay}</Typography>

                    <Button id="calculate" onClick={this.props.caclulateSkat} fullWidth
                        sx={{ backgroundColor: 'rgb(48,47,78)', fontWeight: 'bold', color: '#fff', textTransform: 'none', fontSize: '1.5em' }}>Calculate</Button>
                </form>

            </ThemeProvider>
        )
    }
}

export default Form;