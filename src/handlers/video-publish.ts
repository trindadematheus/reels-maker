import { IgApiClient } from "instagram-private-api";
import path from "path";
import { readFile } from "fs";
import { promisify } from "util";

import logger from "../utils/logger";

require("dotenv").config();

const readFileAsync = promisify(readFile);
const ig = new IgApiClient();

async function login() {
  const username = process.env.INSTAGRAM_USERNAME;
  const password = process.env.INSTAGRAM_PASSWORD;

  if (!username || !password) return;

  ig.state.generateDevice(username);
  await ig.account.login(username, password);
}

async function publishVideo() {
  return new Promise(async (resolve) => {
    logger("green", "Video Publisher", "starting");

    await login();

    const video = await readFileAsync(
      path.resolve(__dirname, "..", "..", "step2.mov")
    );
    const cover = await readFileAsync(
      path.resolve(__dirname, "..", "..", "thumb.jpg")
    );

    await ig.publish.video({
      video: video,
      coverImage: cover,
    });

    resolve("ok");
    logger("green", "Video Publisher", "finished");
  });
}

export default publishVideo;
