import fs from "fs";
import dotenv from "dotenv";
import { spawn } from "child_process";

async function loadEnvFiles(filePaths) {
    try {
        for (const filePath of filePaths) {
            const data = await fs.promises.readFile(filePath, "utf8");
            process.env = { ...process.env, ...dotenv.parse(data) };
        }
    } catch (error) {
        console.error(`Error reading environment file: ${error}`);
    }
}

const envFiles = ["./server/.env", "./app/.env"];

const dockerComposeArgs = [
    "-p",
    "tv-app",
    "--env-file",
    ".",
    "up",
    "-d",
    "--build",
];

async function runDockerComposeWithEnvs() {
    await loadEnvFiles(envFiles);
    const dockerCompose = spawn("docker-compose", dockerComposeArgs);

    dockerCompose.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    dockerCompose.stderr.on("data", (error) => {
        console.error(error.toString());
    });

    dockerCompose.on("close", (code) => {
        console.log(`docker-compose exited with code: ${code}`);
    });
}

runDockerComposeWithEnvs();
