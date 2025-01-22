import ReactMarkdown from "react-markdown"; // Import react-markdown for rendering markdown

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // Call the action provider with the message, which will handle the response
    this.actionProvider.respond(message);
  }

  // You can also add a method here to render markdown if needed in future
  renderMarkdown(message) {
    // This method returns the message formatted as ReactMarkdown for rendering
    return <ReactMarkdown>{message}</ReactMarkdown>;
  }
}

export default MessageParser;
