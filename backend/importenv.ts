// config.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const envVariables: Record<string, string> = {};
for (const key of Object.keys(process.env)) {
    envVariables[key] = process.env[key] || '';
}

export default envVariables;