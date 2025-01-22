import React from "react";
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../ActionProvider';
import MessageParser from '../MessageParser';
import config from '../config';

import 'react-chatbot-kit/build/main.css';

function ChatComponent() {
  return (
    <div className="chatui">
      {/* Adding error boundary */}
      <ErrorBoundary>
        <Chatbot 
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser} 
        />
      </ErrorBoundary>
    </div>
  );
}

// Optional: Create an error boundary to catch any runtime errors.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chatbot encountered an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with the chatbot. Please try again later.</div>;
    }
    return this.props.children;
  }
}

export default ChatComponent;
