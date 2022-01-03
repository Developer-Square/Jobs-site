import React from "react";
import { Form, Formik } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
// import { vacancySchema } from "./validation.schema";

import {
  Card,
  CardHeader,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepContent,
} from "@material-ui/core";

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
    description: `Desired Role.`,
    fields: [
      {
        type: "number",
        name: "idNumber",
        description: "Current Status as a Job Seeker",
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

const SeekerProfileTest = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [activeQuestion, setActiveQuestion] = React.useState();

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
  console.log(activeStep);

  const mapFields = (formik, currentStep) =>
    currentStep.fields.map((stepField, i) => {
      return isActiveQuestion(stepField) ? (
        <>
          <p className={"m-2 tracking-loose text-l mt-4"}>
            {stepField?.description}
          </p>
          <FormikControl key={i} {...stepField} />
          <Box sx={{ mb: 2, mr: 0 }}>
            <div>
              <Button
                disabled={i === 0}
                onClick={
                  i === 0
                    ? null
                    : () => {
                        setActiveQuestion(currentStep.fields[i - 1]);
                      }
                }
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={
                  i === currentStep.fields.length
                    ? null
                    : () => {
                        setActiveQuestion(currentStep.fields[i + 1]);
                      }
                }
                sx={{ mt: 1, mr: 1 }}
              >
                Next
              </Button>
            </div>
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
              <p className="text-xl text-cyan-500 mx-auto my-auto">Edit</p>
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
                              {/* <Box sx={{ mb: 2 }}>
                                <div>
                                  <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    {index === steps.length - 1
                                      ? "Finish"
                                      : "Continue"}
                                  </Button>
                                  <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Back
                                  </Button>
                                </div>
                              </Box> */}
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
                                  "m-2 tracking-loose font-bold text-5xl"
                                }
                              >
                                {steps[activeStep].label}
                              </p>
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
