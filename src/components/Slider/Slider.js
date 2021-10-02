import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "styled-components";
import { formatCurrency } from "utils";

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
    label: formatCurrency(0),
  },
  {
    value: 10000,
    label: formatCurrency(10000),
  },
  {
    value: 30000,
    label: formatCurrency(300000),
  },
];

export default function PayrateSlider({ label, setFilterObj }) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("");

  // Returns the current value on the slider.
  function valuetext(value) {
    setSelectedValue((curr) => (curr = value));
    return `Ksh ${value}`;
  }

  useEffect(() => {
    if (selectedValue) {
      setFilterObj({
        search: selectedValue.toString(),
      });
    }

    return () => {
      setFilterObj({});
    };
    // eslint-disable-next-line
  }, [selectedValue]);

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
`;
