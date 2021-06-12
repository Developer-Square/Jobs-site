import React from "react";

import { Icon } from "../Icon";
import * as S from "./styles";

export const Message = ({
  title,
  status = "neutral",
  children,
  onClick,
  actionText,
}) => {
  const isAction = !!actionText;

  return (
    <S.Wrapper status={status} data-test="alert">
      <S.TopWrapper>
        <S.Title>{title}</S.Title>
        {isAction ? (
          !children && (
            <S.ActionButton onClick={onClick}>{actionText}</S.ActionButton>
          )
        ) : (
          <S.CloseButton status={status} onClick={onClick}>
            <Icon name="x" size={15} />
          </S.CloseButton>
        )}
      </S.TopWrapper>
      {children && <S.Content>{children}</S.Content>}
      {children && isAction && (
        <S.ActionButton onClick={onClick} style={{ marginTop: "1rem" }}>
          {actionText}
        </S.ActionButton>
      )}
    </S.Wrapper>
  );
};
