import { createContext, useReducer, useEffect } from "react";

export const SiteContext = createContext();

const SiteReducer = (state, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, { text: action.payload, sender: "user" }],
      };
      case "CHATBOT_REPLY":
      return {
        ...state,
        messages: [...state.messages, { text: action.payload, sender: "chatbot" }],
      };
      case 'CLEAR_CONVERSATION':
        return { ...state, messages: []}
      case "DARKMODE": 
      return { ...state, darkMode: false}
     default:
        return state
  }
};

export const SiteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SiteReducer, {
      user: null,
      messages: [],
      darkMode: true,
    });

  useEffect(() => {
  console.log(state)

  }, [state])

  return <SiteContext.Provider value={{...state, dispatch}}>{children}</SiteContext.Provider>;
};
