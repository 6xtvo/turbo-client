import os from "node:os";
import git from "git-state";

interface GitState {
	branch: string;
	commit: string;
}

async function getGitState(): Promise<GitState> {
	const UNKNOWN = "Unknown";
	const cwd = process.cwd();

	try {
		return {
			branch: git.branchSync(cwd) ?? UNKNOWN,
			commit: git.commitSync(cwd) ?? UNKNOWN
		};
	} catch {
		return { branch: UNKNOWN, commit: UNKNOWN };
	}
}

function printLine(label: string, value: string): void {
	const padded = label.padEnd(22, " ");
	console.log(`   ${padded}::  ${value}`);
}

function formatMemoryUsage(): string {
	const total = os.totalmem() / 1e9;
	const used = (os.totalmem() - os.freemem()) / 1e9;
	return `${used.toFixed(2)}/${total.toFixed(2)} GB`;
}

export async function printInfo(
	version: string,
	banner?: string
): Promise<void> {
	console.log("");

	if (banner) {
		console.log(banner);
		console.log("");
	}

	printLine("Version", `v${version}`);

	const { branch, commit } = await getGitState();

	printLine("Branch", branch);
	printLine("Commit", commit);

	printLine(
		"Architecture",
		`${os.platform()} ${os.arch()} (${os.release()} Release)`
	);

	const user = os.userInfo().username;
	const host = os.hostname();

	printLine("Current User", `${user} (${host})`);
	printLine("Memory Usage", formatMemoryUsage());

	console.log("");
	console.log("");
}
