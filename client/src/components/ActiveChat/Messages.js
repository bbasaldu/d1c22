import React, { useMemo } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";


const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const messagesInOrder = useMemo(() => {
    const messagesInOrder = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      messagesInOrder.push(messages[i]);
    }
    return messagesInOrder;
  }, [messages]);

  return (
    <Box>
      {messagesInOrder.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
