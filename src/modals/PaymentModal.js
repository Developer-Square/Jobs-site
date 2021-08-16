import React, {useEffect} from 'react';
import styled from 'styled-components'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Form, Formik } from "formik";

import FormikControl from "../containers/FormikContainer/FormikControl"
import { phoneNumberSchema } from "../containers/Authentication/validation.schema";
import Button from "components/Button/Button";


export const PaymentModal = ({onClose, open, moreInfo, onSubmit, loading}) => {
  const initialValues = {}
  useEffect(() => {
    initialValues.phone = getPhoneNumber();
    // eslint-disable-next-line
  }, [])

 function getPhoneNumber ()  {
      let values;
      values = localStorage.getItem('registerValues');
      const newValues = JSON.parse(values);
      
      if (newValues) {
        return newValues.phone
      }
      // console.log("phone", newValues);
  };


  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{moreInfo ? 'Trial Period' : 'Payment options'}</DialogTitle>
      {/* <IconButton aria-label="close" onClick={handleClose}>
        here
      </IconButton> */}
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
                              <Title>The trial period does not include viewing job details. Upgrade to premium to enjoy everything that our site provides.</Title>
                              <Button
                                type="submit"
                                disabled={!formik.isValid}
                                fullwidth
                                loading={loading}
                                title={loading ? "Upgrading ... " : "Upgrade"}
                              />
                            </>
                          ): (
                            <>
                              <Title>Kinldy confirm whether you will be making transactions using this number: </Title>
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
                                  loading={loading}
                                  title={loading ? "Confirming ... " : "Confirm"}
                              />
                            </>
                          )}
                          
                      </Container>
                  </Form>
              )
          }}
      </Formik>
    </Dialog>
  );
}

  const Container = styled.div`
    margin: 10px 20px;
  `

  const Title = styled.p`
  margin: 12px 0 18px;
  font-size: 15px;
  color: black;
`