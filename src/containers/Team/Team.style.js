import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 320px;
  width: 100%;
  padding: 25px 12px 18px;
  border: 1px solid #000000;
  border-radius: 10px;
  margin-top: 40px;
  flex-direction: column-reverse;
  justify-content: center;
  display: flex;
  margin-bottom: 30px;
`;

const StyledPhoto = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50px 50px;
  object-fit: cover;
`;

const Title = styled.h2`
  color: #2680eb;
  font-weight: 300;
  font-size: 1rem;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

// const Date = styled.div`
//   color: #2680eb;
//   font-weight: 300;
//   margin: 6px 0;
//   @media (max-width: 500px) {
//     font-size: 0.8rem;
//   }
// `;

const Review = styled.p`
  color: #000000;
  font-weight: 300;
  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

export { Title, Review, StyledContainer, StyledPhoto };
