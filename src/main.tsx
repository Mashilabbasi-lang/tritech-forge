import { createRoot } from "react-dom/client";
import App from "./App";
import { ChatProvider } from "./contexts/chat-context";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ChatProvider>
    <App />
  </ChatProvider>
);
