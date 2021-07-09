import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import NoResultSvg from "./no-result.svg";
import { NoResultWrapper, ImageWrapper, ButtonWrapper } from "./NoResult.style";
import Button from "../Button/Button";
import { ArrowPrev } from "components/AllSvgIcon";
import { SearchContext } from "contexts/search/search.context";

const NoResultFound = ({ id }) => {
  const history = useHistory();
  const location = useLocation();
  const { dispatch } = React.useContext(SearchContext);

  function onClickButton() {
    dispatch({
      type: "RESET"
    });
    const href = location.pathname;

    history.push(href, href, { shallow: true });
  }
  return (
    <NoResultWrapper id={id}>
      <h3>Sorry, No result found :(</h3>

      <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" />
      </ImageWrapper>

      <ButtonWrapper>
        <div onClick={onClickButton}>
          <Button title="Go Back" iconPosition="left" icon={<ArrowPrev />} />
        </div>
      </ButtonWrapper>
    </NoResultWrapper>
  );
};

export default NoResultFound;
