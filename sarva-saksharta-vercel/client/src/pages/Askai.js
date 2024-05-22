import React, { useState } from 'react';
import axios from 'axios';

const Askai = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleButtonClick = async () => {
        if (inputText.trim() !== '') {
            const newMessage = { text: inputText, sender: 'user' };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputText('');
            await handleBotResponse(inputText);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };

    const handleBotResponse = async (userMessage) => {
        try {
            const response = await axios.post('https://sasa-back-vercel.vercel.app/api/askai', { message: userMessage });
            const botMessage = response.data.message;
            setMessages(prevMessages => [...prevMessages, { text: botMessage, sender: 'bot' }]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1 className="font-mono text-black drop-shadow-2xl text-6xl -ml-20 z-100 fixed top-4 left-1/2 font-bold underline mt-4">Ask AI</h1>
            <div className="border-black border-2 bg-white bg-opacity-10 fixed h-3/4 mt-8 w-11/12 bg-transparent rounded-2xl left-28 top-24 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`p-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`bg-black rounded-lg p-2 inline-block ${message.sender === 'user' ? 'bg-black text-white' : 'bg-white bg-opacity-20 border-black border-2'}`} style={{ wordWrap: 'break-word' }}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex fixed bottom-4 w-full justify-center">
                <input
                    type="text"
                    placeholder="Enter your message..."
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="bg-black bg-opacity-70 text-white w-10/12 h-16 rounded-lg border-black border-2 p-2 text-xl pl-4 ml-16 rounded-xl outline-none"
                ></input>
                <button
                    onClick={handleButtonClick}
                    className="bg-black bg-opacity-70 text-white w-28 h-16 ml-4 rounded-lg border-black border-2 text-xl p-3 outline-none"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Askai;
