import React, { useState, useEffect, useRef, useContext } from 'react';
import './Chat.scss';


import { SiteContext } from '../SiteContext';
import Scroll from '../components/Scroll';


const Chat = () => {
  // state for holding the messages
  const { messages, dispatch } = useContext(SiteContext)

  // state for the "typing" indicator
  const [isTyping, setIsTyping] = useState(false);
  

  const messagesEndRef = useRef(null);

 

  // useEffect hook to update the messages state when the user submits a message
  useEffect(() => {
    if (messages.length > 0) {
      const [lastMessage] = messages.slice(-1);
      if (lastMessage.sender === 'user') {
        // start the chatbot's "typing" indicator
        startTyping();

        async function askChatBot() {
          console.log(lastMessage.text)
          try {
            const req = await fetch('https://come.motaa.ga/completions', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                prompt: lastMessage.text        
              })
            })

            const data = await req.json()

            if(req.status === 200) {
               stopTyping();
               dispatch({ type: "CHATBOT_REPLY", payload: data})
               console.log(data)
            }else {
              stopTyping()
              dispatch({ type: "CHATBOT_REPLY", payload: 'Error occured! Please retry.'})
            }

          } catch(error) {
            stopTyping()
            dispatch({ type: "CHATBOT_REPLY", payload: 'Error occured! Please retry.'})
            console.log(error)
          }
        }

        askChatBot()
      }
    }

    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
  messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
}, [isTyping]);


  // function for adding a message to the messages state
  const addMessage = (text, sender) => {
    dispatch({ type: "SEND_MESSAGE", payload: text})
  }

  // function for simulating the chatbot's "typing" indicator
  const startTyping = () => {
    setIsTyping(true);
  }

  // function for stopping the chatbot's "typing" indicator
  const stopTyping = () => {
    setIsTyping(false);
  }

  // function for handling the user's message submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // get the message from the form input
    const input = event.target.elements.message;
    const text = input.value;

    // add the user's message to the messages state
    addMessage(text, 'user');

    // clear the form input
    input.value = '';
  }


  return (
    <div className="chat">
              <Scroll>
      <div className="chat-messages">
        {messages && messages.length === 0 && 
         <>
         <h1>ChatWise</h1>
         <div className="info">
          <div className="row">
            <h3>Examples:</h3>
            <div className="info-card" onClick={() => addMessage("Who is the owner of facebook?", 'user')}>
              "Who is the owner of facebook?"
            </div>
            <div className="info-card" onClick={() => addMessage("Who is the owner of google?", 'user')}>
              "Who is the owner of google?"
            </div>
            <div className="info-card"  onClick={() => addMessage("Who is the owner of amazon?", 'user')}>
              "Who is the owner of amazon?"
            </div>
          </div>
          <div className="row">
            <h3>Limits:</h3>
            <div className="limit-card">
              Cannot remember recent conversations
            </div>
            <div className="limit-card">
              Cannot be able to work exactly like ChatGPT
            </div>
            <div className="limit-card">
             It may provide wrong information
            </div>
            </div>
         </div>
        
         </>
         }
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span>{message.sender === "user" ? "You: " : "ChatWise: "}</span><pre style={{ whiteSpace: 'pre-wrap', color : message.text === "Error occured! Please retry again." ? "darkred" : "gainsboro" }}>{message.text}</pre>
          </div>
        ))}
        {isTyping && (
          <div className="message chatbot typing">
            Chatbot is typing...
          </div>
        )}
          <div ref={messagesEndRef} />
      </div>
      </Scroll>
      <form className="chat-form" onSubmit={handleSubmit} >
        <textarea name="message" placeholder="Type a message..." required  />
        {!isTyping && <button type="submit">Send</button> }
        {isTyping && <button disabled>....</button> }
      </form>
    </div>
  );
};

export default Chat;
