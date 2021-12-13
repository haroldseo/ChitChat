import React from "react";
import { Channel, useChatContext, MessageSimple } from "stream-chat-react";
//Replace MessageSimple with Custom Message

import { ChannelInner, CreateChannel, EditChannel } from "./";

const ChannelContainer = ({ isCreating, isEditing, setIsCreating, setIsEditing, createType }) => {
  //Get info on the current specific channel
  const { channel } = useChatContext();

  //Creating a channel
  if (isCreating) {
    return (
      <div className='channel__container'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  //Editing a channel
  if (isEditing) {
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  //Create a chat with no messages yet
  const EmptyState = () => {
    return (
      <div className='channel-empty__container'>
        <p className='channel-empty__first'>Start chat here</p>
        <p className='channel-empty__second'>Send messages, attachments, links, emojis, and more!</p>
      </div>
    );
  };

  return (
    <div className='channel__container'>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
