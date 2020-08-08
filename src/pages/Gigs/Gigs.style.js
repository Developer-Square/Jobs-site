import styled from "styled-components";

export const CardWrapper = styled.div`
  margin: 30px 0 0 0;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  background: #fff;

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    padding: 15px 30px;
    color: #333;
    background-color: #fff;
    display: block;
    border-bottom: 1px solid #eaeaea;
    border-radius: 4px 4px 0 0;
  }

  @media (max-width: 1400px) {
    padding: 25px 40px;
  }
`;

export const FormWrapper = styled.div`
  margin: 0;
  padding: 15px 30px;
  color: #333;
  display: block;
<<<<<<< HEAD
  div {
=======
  input,
  label,
  select,
  textarea {
>>>>>>> f573809a8d81dbe7fae4681d06a100ddea7adfb6
    margin: 0 20px;
  }
`;
