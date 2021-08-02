import React from 'react';
import styled from 'styled-components'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import { Form, Formik } from "formik";

import FormikControl from "../containers/FormikContainer/FormikControl"
import { signUpSchema } from "../containers/Authentication/validation.schema";
import Button from "components/Button/Button";


export const PaymentModal = ({onClose, open, moreInfo}) => {
    const [loading, setLoading] = React.useState(false);

    const getPhoneNumber = () => {
        let values;
        values = localStorage.getItem('registerValues');
        values = JSON.parse(values);
        
        if (values) {
          return values.phone
        }
    }
    const initialValues = {
        phone: getPhoneNumber()
    }
  
    const handleClose = () => {
      onClose();
    };

    // TODO: Add a mutation just like in Register.js
    const onSubmit = () => {
      setLoading(true);
    }
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{moreInfo ? 'Trial Period' : 'Payment options'}</DialogTitle>
        {/* <IconButton aria-label="close" onClick={handleClose}>
          here
        </IconButton> */}
        <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
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
                                <Title>Will you be making transactions using this number: </Title>
                                <FormikControl
                                    control="input"
                                    type="text"
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
  margin: 12px 0;
  font-size: 15px;
  color: black;
`