import { createContext } from "react";
import { ThemeContextValue } from '../global/types'

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

export default ThemeContext;