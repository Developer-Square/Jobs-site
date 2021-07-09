import * as React from "react";

import { Message } from "../Message";

export const NotificationTemplate = ({ message, options, close }) => {
  return (
    <Message
      actionText={message.actionText}
      status={options.type}
      title={message.title}
      onClick={close}
    >
      {message.content}
    </Message>
  );
};
