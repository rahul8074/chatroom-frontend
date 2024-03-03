import axios from 'axios';
import React, { useState, useEffect ,useRef} from 'react';
import io from 'socket.io-client';
import './App.css'; // Import your CSS file for styling

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageContainerRef = useRef(null);
  

  useEffect(() => {
    const socket = io('https://chatroom-backend-ntl5.onrender.com:10000');
    // Connect to the Socket.IO server
    setSocket(socket);

    // Listen for incoming messages from the server
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    });

    return () => {
      // Disconnect from the Socket.IO server when component unmounts
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      // Emit the message to the server
      socket.emit('message', inputMessage);
      setInputMessage(''); // Clear the input field after sending the message
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };



  return (
    <div className="app">
      <div className="chat-container">
        <div className="chat" ref={messageContainerRef}>
          <div className=''>
            <ul>
              {messages.map((message, index) => {
                if (message.sender === socket.id) {
                  return (
                    <li className='leftside' key={index}>
                      <span className='' style={{ color: 'green' }}>You: </span>
                      {message.text}
                    </li>
                  );
                } else {
                  return (
                    <li className='rightside' key={index}>
                      <span style={{ color: 'blue' }}>Sender: </span>
                      {message.text}
                    </li>
                  );
                }
              })}

            </ul>
          </div>
          {/* Display the messages */}

        </div>
        <div className="input-container">
          <input
            className="input-field"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={handleKeyPress} // Call handleSendMessage on key press
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
