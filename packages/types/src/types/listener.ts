import type { ClientEvents } from "discord.js";
import type { ProcessEvents } from "./events";

export type ListenerEmitter = "client" | "process"; // todo: add client.ws
export type ListenerName = keyof ClientEvents | ProcessEvents;
