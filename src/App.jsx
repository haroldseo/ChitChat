import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer } from "./components";

import "./App.css";

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

const App = () => {
  return (
    <div className='app__wrapper'>
      <Chat client={client}>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
