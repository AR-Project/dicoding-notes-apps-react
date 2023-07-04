import { createContext } from "react";
import { LocaleContextValue } from '../global/types'

const LocaleContext = createContext<LocaleContextValue | null>(null)

export const LocaleProvider = LocaleContext.Provider;
export const LocaleConsumer = LocaleContext.Consumer;

export default LocaleContext;