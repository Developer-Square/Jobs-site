import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: 'Ksh 0',
  },
  {
    value: 5000,
    label: 'Ksh 5000',
  },
  {
    value: 10000,
    label: 'Ksh 10000',
  },
  {
    value: 20000,
    label: 'Ksh 20000',
  },
  {
    value: 30000,
    label: 'Ksh 30000+',
  },
];

function valuetext(value) {
  return `Ksh ${value}`;
}

export default function PayrateSlider({label}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        {label}
      </Typography>
      <Spacer />
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={1000}
        min={0}
        max={30000}
        marks={marks}
        valueLabelDisplay="on"
      />
    </div>
  );
}

const Spacer = styled.div`
    margin: 35px 0;
`