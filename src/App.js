import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Subscribe to the event stream
    const eventSource = new EventSource("http://localhost:3000/subscribe");
    eventSource.addEventListener("message", handleReceiveMessage);
    return () => {
      // Remove event listener and close the connection on unmount
      eventSource.removeEventListener("message", handleReceiveMessage);
      eventSource.close();
    };
  }, []);

  // Get the message and store it in the state
  const handleReceiveMessage = (event) => {
    const eventData = JSON.parse(event.data);
    setData((data) => data.concat(eventData));
    toast.success(eventData.message)
  };

  // Send 5 random chars to the server
  const handleSendMessage = () => {
    axios.post("http://localhost:3000/message", {
      message: "Your Transaction is success",
    });
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <ToastContainer />
      <div>
        <h4>Click to send a message</h4>
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h4>Message List</h4>
        <p>Number of messages: {data.length}</p>
        {data.map((item, index) => (
          <div key={index}>{item.message}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
