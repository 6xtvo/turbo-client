declare global {
	namespace NodeJS {
		interface ProcessEnv {
			CLIENT_ID: string;
			CLIENT_SECRET: string;
			GUILD_ID: string;
			TOKEN: string;
		}
	}
}

export {};
