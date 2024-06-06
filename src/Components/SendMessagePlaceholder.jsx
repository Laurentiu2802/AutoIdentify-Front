import { useState } from "react";

const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState('');

  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
      return;
    }

    props.onMessageSend({ 'text': message });
    setMessage('');
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='message'>Message:</label>
      <input id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message}></input>
      <button onClick={onMessageSend}>Send</button>
    </form>
  );
}

export default SendMessagePlaceholder;
