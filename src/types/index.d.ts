import type { ClientOptions } from "discord.js";

interface AppConfig {
    clientOptions: ClientOptions;
    env: Env;
    owners: string[];
};

interface Generic<T = any> {
    [key: string]: T;
};

type Env = Generic<string | undefined>;

export { 
    AppConfig,
    Env,
    Generic
}