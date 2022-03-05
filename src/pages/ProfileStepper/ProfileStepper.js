import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik, FieldArray } from "formik";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
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

const ProfileStepper = (props) => {
  const {
    steps,
    sets,
    // onProfileInitialSubmit,
    // onProfileSubmit,
    // setRefetchUser,
    // isEdit,
  } = props;
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [activeSection, setActiveSection] = React.useState(steps[activeStep]);
  const dbActiveStep = () => {
    if (!sets) {
      return 0;
    }
    if (!sets) {
      return 0;
    }
    if (sets?.skills === true) return 3;
    if (sets?.education === true) return 2;
    if (sets?.settings === true) return 1;
    if (sets?.settings === false) return 0;
    if (sets?.education === false) return 0;
    if (sets?.skills === false) return 0;
    if (sets?.experience === false) return 0;

    // if (sets?.experience === true) history.push(`/dashboard`);

    history.push(`/dashboard`);
  };
  React.useEffect(() => {
    setActiveStep(dbActiveStep());
    setActiveSection(steps[dbActiveStep()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setActiveSection(steps[activeStep]);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  console.log(typeof handleBack, typeof handleNext, typeof handleSkip);
  const initialValues = {};

  const isAnswered = (formik, item) => {
    const val = formik.values[`${item.name}`];
    if (val === undefined || val === null) {
      return false;
    } else {
      return true;
    }
  };

  const isActiveSection = (item) => {
    if (item?.label === activeSection?.label) {
      return true;
    } else return false;
  };

  const onFormSubmit = (props, { set }) => {
    const { seekerData, seekerLoading, seekerError } =
      steps[activeStep]?.mutation(props);
    console.log("00000000000", seekerData, seekerLoading, seekerError);
    handleNext();
    setActiveSection(steps[activeStep + 1]);
    setActiveStep(activeStep + 1);
  };

  const mapFields = (formik, currentStep) =>
    currentStep.fields.map((stepField, i) => {
      return (
        <>
          <p className={"m-2 tracking-loose font-bold mt-4 text-gray-700"}>
            {stepField?.description}
          </p>
          {stepField?.type === "custom" ? (
            stepField?.Component
          ) : (
            <FormikControl key={i} {...stepField} />
          )}
        </>
      );
    });

  const mapArrayFields = (formik, currentStep, path) =>
    currentStep.fields.map((stepField, i) => {
      return (
        <>
          <p className={"m-2 tracking-loose font-bold mt-4 text-gray-700"}>
            {stepField?.description}
          </p>
          {stepField?.type === "custom" ? (
            stepField?.Component
          ) : (
            <FormikControl
              key={i}
              {...stepField}
              name={`${path}.${stepField.name}`}
            />
          )}
        </>
      );
    });

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={vacancySchema}
      onSubmit={onFormSubmit}
      enableReinitialize
    >
      {(formik) => {
        console.log("formik values", formik?.values);
        return (
          <div className="mt-20">
            <div className="grid grid-cols-3">
              <div className="col-span-1 bg-white lg:block hidden">
                <nav className=" rounded-md flex-col justify-between">
                  <div className=" bg-white">
                    <div className="pl-10">
                      <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                          <Step key={step.label}>
                            <StepLabel
                              optional={
                                index === steps.length - 1 ? (
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
              <div className="lg:col-span-2 col-span-3 bg-gray-100 space-y-8">
                <section className="container px-6 py-4 mx-auto">
                  {steps?.map((step, k) => {
                    return isActiveSection(steps[activeStep]) ? (
                      <div key={k}>
                        {activeStep === k && (
                          <Form>
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
                            {steps[activeStep]?.useFieldArray ? (
                              <FieldArray
                                name={steps[activeStep]?.label}
                                render={(arrayHelpers) => (
                                  <div>
                                    {formik.values[
                                      `${steps[activeStep]?.label}`
                                    ] &&
                                    formik.values[`${steps[activeStep]?.label}`]
                                      .length > 0 ? (
                                      formik.values[
                                        `${steps[activeStep]?.label}`
                                      ].map((experience, index) => (
                                        <div key={index}>
                                          {mapArrayFields(
                                            formik,
                                            steps[activeStep],
                                            `${steps[activeStep]?.label}.${index}`,
                                          )}
                                          <button
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            } // remove a friend from the list
                                          >
                                            -
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              arrayHelpers.insert(index, "")
                                            } // insert an empty string at a position
                                          >
                                            +
                                          </button>
                                        </div>
                                      ))
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.push(
                                            steps[activeStep]?.blankValues,
                                          )
                                        }
                                      >
                                        Add Another
                                      </button>
                                    )}
                                    <div>
                                      <button type="submit">Submit</button>
                                    </div>
                                  </div>
                                )}
                              />
                            ) : (
                              mapFields(formik, steps[activeStep])
                            )}
                            <Box sx={{ mb: 2, mr: 0 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row-reverse",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  type="submit"
                                  sx={{ borderRadius: 5, height: 30 }}
                                >
                                  Save and Proceed
                                </Button>
                              </Box>
                            </Box>
                          </Form>
                        )}
                      </div>
                    ) : (
                      <Card
                        onClick={() => {
                          setActiveSection(steps[k]);
                          setActiveStep(k);
                        }}
                        sx={{ maxWidth: 345 }}
                        style={{ margin: 10 }}
                      >
                        <CardHeader
                          avatar={
                            <i
                              className={`${"fa fa-check-circle text-green-600 text-lg"}`}
                            />
                          }
                          action={
                            <div
                              className={`block align-middle mt-3 mr-3 font-medium text-base-theme-blue leading-snug`}
                            >
                              Edit
                            </div>
                          }
                          title={steps[k]?.label}
                        />
                      </Card>
                    );
                  })}
                </section>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ProfileStepper;
