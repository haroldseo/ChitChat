import React from "react";

import { AddChannel } from "../assets";

const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setIsEditing,
  setCreateType,
  setToggleContainer,
}) => {
  if (error) {
    return type === "team" ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>Connection Error, Try Again!</p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading'>{type === "team" ? "Channels" : "Messages"} loading...</p>
      </div>
    );
  }

  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>{type === "team" ? "Channels" : "Direct Messages"}</p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
          type={type === "team" ? "team" : "messaging"}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
