import React from "react";
import { styled } from "styles";

function TextError(props) {
  return (
    <ErrorContainer>
      <div
        dangerouslySetInnerHTML={{
          __html: props.children,
        }}
      />
      {/* {typeof props.children === String ? props.children: props.children.map((err, i)=>{
        return<p key={i}>err<br /></p>
      })} */}
    </ErrorContainer>
  );
}

export default TextError;

export const ErrorContainer = styled.div`
  color: palevioletred;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: italic;
  position: absolute;
  right: 0;
  line-height: 15px;
`;
