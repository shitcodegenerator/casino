import "./App.css";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

const DealBtn = styled.button`
  border: 1px solid #333;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 20px #33333320;
`;

const ioOptions = {
  withCredentials: true,
  extraHeaders: {
    "casino-header": "casino",
  },
};

const socket = io("//localhost:3000", ioOptions);

function App() {
  // same domain，different domain => const socket = io("https://server-domain.com");
  // const ws = useRef();

  useEffect(() => {
    // ws.current = io("//localhost:3000", ioOptions);
    socket.on("broadcast", (arg) => {
      console.log(arg);
    });
    return () => {
      // ws.current.close();
    };
  }, [socket]);

  const sendChips = () => {
    socket.emit("receive_chips", {
      chips: "content here",
    });
  };

  return (
    <div className="App">
      <header className="App-header">我是荷官</header>
      <DealBtn onClick={sendChips}>發牌</DealBtn>
    </div>
  );
}

export default App;
