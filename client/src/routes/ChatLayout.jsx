
import { Outlet } from "react-router-dom";
import { ChatProvider } from "../context/ChatContext";

const ChatLayout = () => {
  return (
    <ChatProvider>
      <Outlet />
    </ChatProvider>
  );
};

export default ChatLayout;
