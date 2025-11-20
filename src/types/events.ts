export type SignalEvents = NodeJS.Signals;

export type ProcessEvents =
	| "beforeExit"
	| "disconnect"
	| "exit"
	| "message"
	| "rejectionHandled"
	| "uncaughtException"
	| "unhandledRejection"
	| "uncaughtExceptionMonitor"
	| "warning"
	| "worker"
	| SignalEvents;
