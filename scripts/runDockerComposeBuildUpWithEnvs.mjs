import fs from "fs";
import dotenv from "dotenv";
import { spawn } from "child_process";

async function loadEnvFiles(filePaths) {
    const env = {};
    for (const filePath of filePaths) {
        const data = await fs.promises.readFile(filePath, "utf8");
        Object.assign(env, dotenv.parse(data));
    }
    return { ...env, ...process.env };
}

const envFiles = ["./server/.env", "./app/.env"];

const dockerComposeArgs = [
    "compose",
    "-p",
    "tv-app",
    "up",
    "-d",
    "--build",
];

async function runDockerComposeWithEnvs() {
    try {
        const env = await loadEnvFiles(envFiles);
        const dockerCompose = spawn("docker", dockerComposeArgs, { env, stdio: "inherit" });

        dockerCompose.on("error", (error) => {
            console.error(error);
            process.exitCode = 1;
        });

        dockerCompose.on("close", (code) => {
            process.exitCode = code ?? 1;
        });
    } catch (error) {
        console.error(`Error reading environment file: ${error}`);
        process.exitCode = 1;
    }
}

runDockerComposeWithEnvs();
