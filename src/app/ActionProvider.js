import OpenAI from "openai";

const openAI = new OpenAI({
    apiKey: `${process.env.NEXT_PUBLIC_apiKey}`,
    baseURL: "https://api.aimlapi.com/v1",
    dangerouslyAllowBrowser: true
});

class ActionProvider {
    createChatBotMessage;
    setState;
    createClientMessage;
    stateRef;
    createCustomMessage;

    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
        this.createCustomMessage = createCustomMessage;
    }

    callGenAI = async (prompt) => {
        try {
            prompt = prompt + "Do not give any formatting such as bold words or bullets, only use spaces and newline";
            const chatCompletion = await openAI.chat.completions.create({
                model: "gpt-4o",
                messages: [
                  { 
                    role: "system", 
                    content: "You are an expert marketeer with 25+ experience in industry both D2D and D2C type. Name : Marilyn"
                  },
                  { 
                    role: "user", 
                    content: prompt 
                  }
                ],
                temperature: 0.5,
                max_tokens: 150, // Increased max tokens
              });
              
          return chatCompletion.choices[0].message.content;
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.error("Rate limit hit. Retrying in 2 seconds...");
            await this.timer(2000); // Wait 2 seconds
            return this.callGenAI(prompt); // Retry the call
          }
          console.error("API call failed:", error);
          throw error; // Re-throw other errors
        }
      };

    timer = ms => new Promise(res => setTimeout(res, ms));

    generateResponseMessages = async (userMessage) => {
        const responseFromGPT = await this.callGenAI(userMessage);
        let message;
        const responseSections = responseFromGPT.split("\n\n"); // Assume each hat's response is separated by a double newline.

        for (const section of responseSections) {
            if (section.trim().length) {
                message = this.createChatBotMessage(section.trim());
                this.updateChatbotState(message);
            }
            await this.timer(1000); // Delay to simulate message typing.
        }
    };

    respond = (message) => {
        this.generateResponseMessages(message);
    };

    updateChatbotState = (message) => {
        this.setState(prevState => ({
            ...prevState,
            messages: [...prevState.messages, message]
        }));
    };
}

export default ActionProvider;
