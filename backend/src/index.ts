import app from "./app.js";
import config from "../config.json" assert {type: "json"};
import { join, dirname} from "path";
import {readdir, stat, access, constants} from "fs/promises";
import { fileURLToPath } from 'url';
import Data from "./routes/_interface.js";

const host = config.host || "localhost";
const port = config.port || 3078;
const __dirname = dirname(fileURLToPath(import.meta.url));

async function checkPathExists(path) {
  try {
    await access(path, constants.F_OK);
    return true; // Path exists
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false; // Path does not exist
    } else {
      throw error; // Other error occurred
    }
  }
}
async function loadRoutes() {
    const routeDir = join(__dirname, "routes");
    const routeFiles = await readdir(routeDir);
    for (const routeFile of routeFiles) {
        let routePath = join(routeDir, routeFile);
        if (!routeFile.startsWith("_")) {
            if (routeFile.endsWith(".js")){
                // no-op
            } else if ((await stat(routePath)).isDirectory() && await checkPathExists(join(routePath, "index.js"))){
                routePath = join(routePath, "index.js");
            } else {
                continue;
            }
            const data: Data = (await import(routePath)).default;
            app.use(data.prefix, data.router);
        }
    }
}

async function main() {
    await loadRoutes();
    app.listen(port, host, () => {
        console.log(`Listening on ${host}:${port}`);
    });
}

main().catch(function (error){
    throw error;
});
