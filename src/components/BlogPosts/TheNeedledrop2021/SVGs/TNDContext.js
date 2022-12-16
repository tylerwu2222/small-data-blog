import { createContext } from "react";

const TNDContext = createContext({});
// const TNDContext = createContext();

export const TNDProvider = TNDContext.Provider;

export default TNDContext;