import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Marketing Bot",
  initialMessages: [
    createChatBotMessage(
      "Welcome! I'm Marilyn, a marketing expert bot. What's Up?"
    ),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#4F4789",
    },
    chatButton: {
      backgroundColor: "#201335",
    },
  },
};

export default config;
