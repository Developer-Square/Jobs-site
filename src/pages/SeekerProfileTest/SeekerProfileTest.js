import React from "react";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import lodash from "lodash";
import {
  Card,
  CardHeader,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepContent,
  LinearProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const personaTitles = [
  { label: "Student", value: "Student" },
  { label: "Sir", value: "Sir" },
  { label: "Ma'am", value: "Ma'am" },
  { label: "Madam", value: "Madam" },
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
  { label: "Ms", value: "Ms" },
  { label: "Miss", value: "Miss" },
  { label: "Engineer", value: "Engineer" },
];

const steps = [
  {
    label: "Desired Role",
    description: `Help Us understand more about you.`,
    fields: [
      {
        type: "number",
        name: "idNumber",
        description: "Enter ID or passport Number as a legal identifier",
        control: "input",
      },
      {
        name: "title",
        description: "Current Status as a Job Seeker",
        control: "mui-radio",
        options: personaTitles,
      },
    ],
  },
  {
    label: "Ideal Culture",
    description: "Ideal Culture",
    fields: [
      {
        name: "phone",
        description: "Current Status as a Job Seeker",
        control: "input",
      },
    ],
  },
  {
    label: "Job Experience",
    description: `how to resolve approval issues.`,
    fields: [
      {
        type: "text",
        name: "location",
        description: "Current Status as a Job Seeker",
        control: "input",
      },
    ],
  },
  {
    label: "Upload Resume",
    description: `find out how to tell .`,
    fields: [
      {
        type: "text",
        name: "title",
        description: "Current Status as a Job Seeker",
        control: "input",
      },
    ],
  },
];

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1849B1",
  },
}))(LinearProgress);

const SeekerProfileTest = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [activeQuestion, setActiveQuestion] = React.useState(
    steps[activeStep]?.fields[0],
  );

  React.useEffect(() => {
    setActiveQuestion(steps[activeStep].fields[0]);
  }, [activeStep]);

  const isStepOptional = (step) => {
    return step === 6;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  console.log(typeof handleBack, typeof handleNext, typeof handleSkip);
  const initialValues = {};
  const onSubmit = ({ values }) => {
    console.log(values);
  };
  const isAnswered = (formik, item) => {
    const val = formik.values[`${item.name}`];
    if (val === undefined || val === null) {
      return false;
    } else {
      return true;
    }
  };
  const isActiveQuestion = (item) => {
    if (item?.name === activeQuestion?.name) {
      return true;
    } else return false;
  };
  const getQuestionNumber = () => {
    const val = steps[activeStep]?.fields?.find(
      ({ name }) => name === activeQuestion?.name,
    );
    const num = (lodash.findIndex(steps[activeStep].fields, val) || 0) + 1;
    const len = steps[activeStep]?.fields?.length || 0;
    const percentage = ((parseInt(num) * 100) / parseInt(len)).toFixed(0) || 0;
    console.log("precet", percentage);
    return [num, len, percentage];
  };

  const mapFields = (formik, currentStep) =>
    currentStep.fields.map((stepField, i) => {
      return isActiveQuestion(stepField) ? (
        <>
          <p className={"m-2 tracking-loose font-bold mt-4 text-gray-700"}>
            {stepField?.description}
          </p>

          <FormikControl key={i} {...stepField} />
          <Box sx={{ mb: 2, mr: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Button
                variant="contained"
                onClick={
                  i === currentStep.fields.length
                    ? null
                    : () => {
                        setActiveQuestion(currentStep.fields[i + 1]);
                      }
                }
                sx={{ borderRadius: 5, height: 30 }}
              >
                Next
              </Button>
              <Button
                disabled={i === 0}
                onClick={
                  i === 0
                    ? null
                    : () => {
                        setActiveQuestion(currentStep.fields[i - 1]);
                      }
                }
                sx={{ borderRadius: 5, height: 30 }}
              >
                Back
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Card
          onClick={() => {
            setActiveQuestion(stepField);
          }}
          sx={{ maxWidth: 345 }}
          style={{ margin: 10 }}
        >
          <CardHeader
            avatar={
              <i
                className={`${
                  isAnswered(formik, stepField)
                    ? "fa fa-check-circle text-green-600 text-lg"
                    : "fa fa-check-circle-o text-lg"
                }`}
              />
            }
            action={
              <div
                className={`block align-middle mt-3 mr-3 font-medium text-base-theme-blue leading-snug`}
              >
                Edit
              </div>
            }
            title={stepField?.description}
          />
        </Card>
      );
    });

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={vacancySchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        console.log("formik values", formik?.values);
        return (
          <div className="mt-20">
            <div className="grid grid-cols-3">
              <div class="col-span-1 bg-white lg:block hidden">
                <nav className=" rounded-md flex-col justify-between">
                  <div className=" bg-white">
                    <div className="pl-10">
                      <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                          <Step key={step.label}>
                            <StepLabel
                              optional={
                                index === 2 ? (
                                  <Typography variant="caption">
                                    Last step
                                  </Typography>
                                ) : null
                              }
                            >
                              {step.label}
                            </StepLabel>
                            <StepContent>
                              {step?.fields?.map((f, k) => (
                                <Typography
                                  variant="caption"
                                  display="block"
                                  key={k}
                                >
                                  <i
                                    className={`${
                                      isAnswered(formik, f)
                                        ? "fa fa-check-circle text-green-600 text-lg"
                                        : "fa fa-check-circle-o text-lg"
                                    }`}
                                  />{" "}
                                  {f?.description}
                                </Typography>
                              ))}
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>
                    </div>
                  </div>
                </nav>{" "}
              </div>
              <div class="lg:col-span-2 col-span-3 bg-gray-100 space-y-8">
                <Form>
                  <section className="container px-6 py-4 mx-auto">
                    {steps?.map((step, k) => {
                      return (
                        <div key={k}>
                          {activeStep === k && (
                            <>
                              <p
                                className={
                                  "m-2 tracking-loose font-semibold text-5xl"
                                }
                              >
                                {steps[activeStep].label}
                              </p>
                              <p
                                className={
                                  "m-2 tracking-loose font-bold text-gray-700"
                                }
                              >
                                {steps[activeStep].description}
                              </p>

                              <Box sx={{ width: "50%", mr: 1, mt: 5, mb: 5 }}>
                                <p className={"font-bold text-gray-900"}>
                                  {getQuestionNumber()[0]} of{" "}
                                  {getQuestionNumber()[1]} questions in this
                                  step
                                </p>

                                <BorderLinearProgress
                                  variant="determinate"
                                  value={getQuestionNumber()[2]}
                                />
                              </Box>
                              {mapFields(formik, steps[activeStep])}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </section>
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SeekerProfileTest;
