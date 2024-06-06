import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceholder from './ChatMessagesPlaceHolder';
import SendMessagePlaceholder from './SendMessagePlaceholder';
import TokenManager from '../Services/TokenManager';


function Chat() {
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);

  useEffect(() => {
    const storedUsername = TokenManager.getUsername();
    if (storedUsername) {
      setUsername(storedUsername);
      setupStompClient(storedUsername);
    }
  }, []);

  const setupStompClient = (username) => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/publicmessages', (data) => {
        onMessageReceived(data);
      });
    };

    stompClient.activate();
    setStompClient(stompClient);
  };

  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'text': newMessage.text };
    stompClient.publish({ 'destination': '/topic/publicmessages', body: JSON.stringify(payload) });
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };

  return (
    <div className="App">
      <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
      <br />
      <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
    </div>
  );
}

export default Chat;
