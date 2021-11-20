import React, { useEffect } from "react";
import styled from "styled-components";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "react-apollo";

import FormikControl from "../containers/FormikContainer/FormikControl";
import { phoneNumberSchema } from "../containers/Authentication/validation.schema";
import Button from "components/Button/Button";
// import { ONTRANSACTION_MESSAGE } from "graphql/subscriptions";
import {
  GET_ONLINE_CHECKOUT,
  GET_ONLINE_CHECKOUT_RESPONSE,
} from "graphql/queries";
import Loader from "components/Loader/Loader";
import { useTimer } from "helpers";

const PaymentCallbacks = ({ transactionId, checkoutRequestId }) => {
  const noData = "***************";
  const history = useHistory();
  const [phone, setPhone] = React.useState(noData);
  const [amount, setAmount] = React.useState(noData);
  const [accountReference, setAccountReference] = React.useState(noData);
  const [mpesaReceiptNumber, setMpesaReceiptNumber] = React.useState(noData);
  const [message, setMessage] = React.useState(noData);
  const [requestId, setRequestId] = React.useState();

  const { data, loading, stopPolling } = useQuery(
    requestId ? GET_ONLINE_CHECKOUT_RESPONSE : GET_ONLINE_CHECKOUT,
    {
      variables: requestId
        ? {
            checkoutRequestId: requestId,
          }
        : { id: transactionId },
      pollInterval: 2000,
    },
  );
  const red = useTimer(60);
  useEffect(() => {
    if (data?.onlineCheckout?.customerMessage) {
      setMessage(data?.onlineCheckout?.customerMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId, message]);
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
  if (
    data?.onlineCheckoutResponses &&
    data?.onlineCheckoutResponses.length > 0
  ) {
    setMpesaReceiptNumber(data?.onlineCheckout?.mpesaReceiptNumber);
    setMessage(
      data?.onlineCheckoutResponses[data.onlineCheckoutResponses?.length - 1]
        ?.resultDescription,
    );
  }
  if (message === "The service request is processed successfully.") {
    setTimeout(function () {
      stopPolling();
      toast.success(`Payment (${amount}) for ${amount} was made successfully`);
      history.push(`/dashboard`);
    }, 3000);
  }

  return (
    <Container>
      <div className="grid md:grid-cols-2 text-sm">
        <div className="flex justify-center items-center">
          Payment Details {loading && <Loader />}
        </div>
      </div>
      <div className="grid md:grid-cols-2 text-sm">
        <div className="px-4 py-2 font-semibold">
          <strong>Safaricom Message : </strong>
        </div>
        <div className="px-4 py-2">{message}</div>
      </div>
      <div className="grid md:grid-cols-2 text-sm">
        <div className="px-4 py-2 font-semibold">
          <strong>Account Reference : </strong>
        </div>
        <div className="px-4 py-2">{accountReference}</div>
      </div>
      <div className="grid md:grid-cols-2 text-sm">
        <div className="px-4 py-2 font-semibold">
          <strong>Amount: </strong>
        </div>
        <div className="px-4 py-2">Ksh {amount}</div>
      </div>

      <div className="grid md:grid-cols-2 text-sm">
        <div className="px-4 py-2 font-semibold">
          <strong>Phone: </strong>
        </div>
        <div className="px-4 py-2">{phone}</div>
      </div>
      <div className="grid md:grid-cols-2 text-sm">
        <div className="px-4 py-2 font-semibold">
          <strong>Mpesa Receipt No. : </strong>
        </div>
        <div className="px-4 py-2">{mpesaReceiptNumber}</div>
      </div>
    </Container>
  );
};

export const PaymentModal = ({
  onClose,
  open,
  moreInfo,
  onSubmit,
  loading,
  transactionId,
  checkoutResponseId,
}) => {
  const initialValues = {};
  useEffect(() => {
    initialValues.phone = getPhoneNumber();
    // eslint-disable-next-line
  }, []);

  function getPhoneNumber() {
    let values;
    values = localStorage.getItem("registerValues");
    const newValues = JSON.parse(values);

    if (newValues) {
      return newValues.phone;
    }
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        {moreInfo ? "Trial Period" : "Payment options"}
      </DialogTitle>
      {/* <IconButton aria-label="close" onClick={handleClose}>
        here
      </IconButton> */}
      {transactionId ? (
        <PaymentCallbacks
          transactionId={transactionId}
          checkoutResponseId={checkoutResponseId}
        />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={phoneNumberSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form noValidate>
                <Container>
                  {/* Re-using the payment modal to remind the seeker/employer to pay for the denied services */}
                  {moreInfo ? (
                    <>
                      <Title>
                        The trial period does not include viewing job details.
                        Upgrade to premium to enjoy everything that our site
                        provides.
                      </Title>
                      <Button
                        type="submit"
                        disabled={!formik.isValid}
                        fullwidth
                        isLoading={loading}
                        title={loading ? "Upgrading ... " : "Upgrade"}
                      />
                    </>
                  ) : (
                    <>
                      <Title>
                        Kinldy confirm whether you will be making transactions
                        using this number:{" "}
                      </Title>
                      <FormikControl
                        control="input"
                        type="number"
                        label="Mpesa Number"
                        name="phone"
                        icon="ln ln-icon-Mail"
                      />
                      <Button
                        type="submit"
                        disabled={!formik.isValid}
                        fullwidth
                        isLoading={loading}
                        title={loading ? "Confirming ... " : "Confirm"}
                      />
                    </>
                  )}
                </Container>
              </Form>
            );
          }}
        </Formik>
      )}
    </Dialog>
  );
};

const Container = styled.div`
  margin: 10px 20px;
`;

const Title = styled.p`
  margin: 12px 0 18px;
  font-size: 15px;
  color: black;
`;
