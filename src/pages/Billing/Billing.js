import * as React from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLazyQuery } from "react-apollo";
import { Form, Formik } from "formik";

import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { showSuccessNotification, useTimer } from "helpers";

import MpesaLogo from "image/m-pesa.webp";
import { phoneNumberSchema } from "containers/Authentication/validation.schema";
import FormikControl from "containers/FormikContainer/FormikControl";
import Button from "components/Button/Button";
import { TypedMakePayment } from "graphql/mutations";
import {
  GET_ONLINE_CHECKOUT,
  GET_ONLINE_CHECKOUT_RESPONSE,
} from "graphql/queries";

import PlanCards from "./PlanCards";
import PlanCard from "./PlanCard";

const StepOne = (props) => {
  return (
    <PlanCards
      selectedPlan={props?.selectedPlan}
      selectPlan={props?.setSelectedPlan}
      handleBack={props?.handleBack}
      handleNext={props?.handleNext}
    />
  );
};
const StepTwo = (props) => {
  return (
    <>
      <div className="py-4 px-4 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl  mx-auto md:mx-0 grid grid-cols-2">
        <PlanCard
          selectPlan={props?.setSelectedPlan}
          plan={props?.selectedPlan}
          selectedPlan={props?.selectedPlan}
          step={props?.step}
          handleBack={props?.handleBack}
          handleNext={props?.handleNext}
          className="col-span-1 lg:block"
        />
        <div className="col-span-1 lg:block space-y-8 px-12">
          <div className="w-sm">
            <div className="mt-4 text-green-600 text-center">
              <img
                className="w-64"
                src={MpesaLogo}
                alt="mpesa"
                style={{ margin: "0 auto" }}
              />

              <h1 className="text-xl font-bold">Make Payment</h1>
              <p className="mt-4 text-gray-600">
                (Payments are secure and records for all payments are kept.)
              </p>
              <Formik
                initialValues={props?.initialValues}
                validationSchema={phoneNumberSchema}
                onSubmit={
                  props?.transactionId || props?.checkoutRequestId
                    ? null
                    : props?.onSubmit
                }
              >
                {(formik) => {
                  return (
                    <Form className="mt-8" noValidate>
                      <FormikControl
                        control="phone"
                        type="number"
                        label="Mpesa Number"
                        name="phone"
                        icon="ln ln-icon-Mail"
                      />
                      <Button
                        type="submit"
                        disabled={
                          !formik.isValid ||
                          props?.transactionId ||
                          props?.checkoutRequestId
                        }
                        fullwidth
                        isLoading={formik.isLoading}
                        title={formik.isLoading ? "Initiating ... " : "Pay"}
                        className="mt-8 mb-4 py-2 px-14 rounded-full bg-green-600 text-white tracking-widest hover:bg-green-500 transition duration-200"
                      />
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StepThree = (props) => {
  const noData = "***************";
  const [phone, setPhone] = React.useState(noData);
  const [amount, setAmount] = React.useState(noData);
  const [accountReference, setAccountReference] = React.useState(noData);
  const [mpesaReceiptNumber, setMpesaReceiptNumber] = React.useState(noData);
  const [message, setMessage] = React.useState(noData);
  const [requestId, setRequestId] = React.useState();

  const [fetchPaymentResponse, { data, loading, stopPolling }] = useLazyQuery(
    requestId ? GET_ONLINE_CHECKOUT_RESPONSE : GET_ONLINE_CHECKOUT,
    {
      fetchPolicy: "no-cache",
      variables: requestId
        ? {
            checkoutRequestId: requestId,
          }
        : { id: props?.transactionId },
    },
  );
  const red = useTimer(60);
  React.useEffect(() => {
    fetchPaymentResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (data?.onlineCheckout?.customerMessage) {
      setMessage(data?.onlineCheckout?.customerMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId, message]);
  const fetchResponse = () => {
    fetchPaymentResponse();
  };
  if (red === 0) {
    stopPolling();
  }

  if (data && !requestId) {
    if (
      data?.onlineCheckout?.checkoutRequestId &&
      data?.onlineCheckout?.checkoutRequestId !== ""
    ) {
      setRequestId(data?.onlineCheckout?.checkoutRequestId);
    }
  }

  if (data && phone === noData) {
    if (data.onlineCheckout) {
      setPhone(data?.onlineCheckout?.phone);
      setAmount(data?.onlineCheckout?.amount);
      setAccountReference(data?.onlineCheckout?.accountReference);
    }
  }
  if (data && mpesaReceiptNumber === noData) {
    if (
      data?.onlineCheckoutResponses &&
      data?.onlineCheckoutResponses.length > 0
    ) {
      setMpesaReceiptNumber(
        data?.onlineCheckoutResponses[0]?.mpesaReceiptNumber,
      );
      setMessage(data?.onlineCheckoutResponses[0]?.resultDescription);
    }
  }

  if (message === "The service request is processed successfully.") {
    stopPolling();
    toast.success(
      `Payment (${amount}) for ${accountReference} was made successfully`,
    );
    setTimeout(function () {
      props?.handleNext();
    }, 3000);
  }
  return (
    <div className="py-4 px-4 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl mx-auto md:mx-0">
      <div className="mt-4 text-green-600 text-center">
        <div className="mx-auto my-4 text-xl font-bold">
          <div className="flex justify-center items-center">
            Payment Details{" "}
          </div>
        </div>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold ml-auto">
            <strong>Safaricom Message : </strong>
          </div>
          <div className="px-4 py-2 mr-auto">{message}</div>
        </div>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold ml-auto">
            <strong>Account Reference : </strong>
          </div>
          <div className="px-4 py-2 mr-auto">{accountReference}</div>
        </div>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold ml-auto">
            <strong>Amount : </strong>
          </div>
          <div className="px-4 py-2 mr-auto">Ksh {amount}</div>
        </div>

        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold ml-auto">
            <strong>Phone : </strong>
          </div>
          <div className="px-4 py-2 mr-auto">{phone}</div>
        </div>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold ml-auto">
            <strong>Mpesa Receipt No. : </strong>
          </div>
          <div className="px-4 py-2 mr-auto">{mpesaReceiptNumber}</div>
        </div>
        <div className="mx-auto text-sm">
          <button
            disable={
              message === "The service request is processed successfully."
            }
            onClick={
              message === "Success. Request accepted for processing" ||
              message === noData
                ? fetchResponse
                : null
            }
            className="mt-8 mb-4 py-2 px-14 rounded-full bg-green-600 text-white tracking-widest hover:bg-green-500 transition duration-200"
          >
            {message === "The service request is processed successfully."
              ? "Payment Successful"
              : message === "Success. Request accepted for processing" ||
                message === noData
              ? loading
                ? " Loading . . ."
                : "Confirm Payment"
              : "Payment Failed"}
          </button>
        </div>
      </div>
    </div>
  );
};

const steps = ["Plans", "Pay", "Confirm"];
const Billing = () => {
  const history = useHistory();
  const alert = useAlert();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedPlan, setSelectedPlan] = React.useState({});
  const [transactionId, setTransactionId] = React.useState();
  const [checkoutRequestId, setCheckoutRequestId] = React.useState();

  const initialValues = { phone: "" };

  const isStepOptional = (step) => {
    return step === 3;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
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

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };
  const makePaymentFn = (values, makePayment) => {
    // TODO: Add variables to into an object then remove the empty keys and values.
    // make the removefunction a global utility.
    if (selectedPlan?.id !== "" && selectedPlan?.periodAmountMoney !== 0) {
      makePayment({
        variables: {
          planId: selectedPlan?.id,
          amount: selectedPlan?.periodAmountMoney?.amount,
          billingPhone: values.phone,
        },
      }).then(({ data }) => {
        console.log("after mpesa push", data);

        if (data.makePayment.success) {
          console.log(data.makePayment.onlineCheckout);
          setTransactionId(data.makePayment.onlineCheckout.id);
          setCheckoutRequestId(
            data.makePayment.onlineCheckout.checkoutRequestId,
          );
          handleNext();
        }

        // console.log(data);
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Payment completed - you&apos;ve purchased a package.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Start</Button>
            <Button onClick={() => history.push(`/dashboard`)}>
              Go to Dashboard
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <StepOne
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
          {activeStep === 1 && (
            <TypedMakePayment
              onCompleted={(data, errors) =>
                showSuccessNotification(data, alert, errors)
              }
            >
              {(makePayment, { loading }) => {
                function onPaymentSubmit(values) {
                  makePaymentFn(values, makePayment);
                }

                return (
                  <StepTwo
                    step={activeStep}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    onSubmit={onPaymentSubmit}
                    initialValues={initialValues}
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    transactionId={transactionId}
                    checkoutRequestId={checkoutRequestId}
                  />
                );
              }}
            </TypedMakePayment>
          )}
          {activeStep === 2 && (
            <StepThree
              transactionId={transactionId}
              checkoutRequestId={checkoutRequestId}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
        </React.Fragment>
      )}
    </Box>
  );
};
export default Billing;
