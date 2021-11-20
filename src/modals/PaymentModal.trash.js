import React, { useEffect } from "react";
import styled from "styled-components";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useSubscription } from "react-apollo";

import FormikControl from "../containers/FormikContainer/FormikControl";
import { phoneNumberSchema } from "../containers/Authentication/validation.schema";
import Button from "components/Button/Button";
import { ONTRANSACTION_MESSAGE } from "graphql/subscriptions";
import Loader from "components/Loader/Loader";

const PaymentCallbacks = ({ transactionId }) => {
  const history = useHistory();
  const { data } = useSubscription(ONTRANSACTION_MESSAGE, {
    variables: {
      transactionId: transactionId,
    },
  });

  if (!transactionId) return <div />;
  if (data) {
    const cleanData = JSON.parse(JSON.parse(data.onTransactionMessage?.data));
    if (
      cleanData?.response?.result_description ===
      "The service request is processed successfully."
    ) {
      toast.success(
        `Payment (${cleanData?.checkout?.amount}) for ${cleanData?.checkout?.account_reference} was made successfully`,
      );
      history.push(`/dashboard`);
    }

    return (
      <Container>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold">
            <strong>Account Reference : </strong>
          </div>
          <div className="px-4 py-2">
            {cleanData?.checkout?.account_reference || "***************"}
          </div>
        </div>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold">
            <strong>Amount: </strong>
          </div>
          <div className="px-4 py-2">
            Ksh {cleanData?.checkout?.amount || "***************"}
          </div>
        </div>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold">
            <strong>Customer Message : </strong>
          </div>
          <div className="px-4 py-2">
            {cleanData?.response
              ? cleanData?.response?.result_description
              : cleanData?.checkout?.customer_message}
          </div>
        </div>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold">
            <strong>Phone: </strong>
          </div>
          <div className="px-4 py-2">
            {cleanData?.checkout?.phone || "***************"}
          </div>
        </div>
        <div className="grid md:grid-cols-2 text-sm">
          <div className="px-4 py-2 font-semibold">
            <strong>Mpesa Receipt No. : </strong>
          </div>
          <div className="px-4 py-2">
            {cleanData?.checkout?.mpesa_receipt_number || "***************"}
          </div>
        </div>
      </Container>
    );
  }
  return <Loader />;
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
