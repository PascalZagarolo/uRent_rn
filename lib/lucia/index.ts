import { Lucia, TimeSpan } from "lucia"
import adapter from "./adapter"

export const lucia = new Lucia(adapter, {
    sessionExpiresIn : new TimeSpan(2, "w")
})