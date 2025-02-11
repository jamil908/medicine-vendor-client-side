import { useState } from "react";

const LiveChatSupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "Our support team will respond soon!", sender: "support" }]);
      }, 1500);
    }
  };

  return (
    <div className="p-6  rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Live Chat & Customer Support</h2>
      <div className="h-32 border-2 border-fuchsia-600 p-4 rounded-md shadow overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded-md ${msg.sender === "user" ? "bg-blue-800 text-white text-right" : "bg-gray-300"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Send</button>
      </div>
    </div>
  );
};

export default LiveChatSupport;
