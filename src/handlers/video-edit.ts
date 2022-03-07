import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";

import VideoInfo from "../types/video-info";
import createVideoOverlayText from "../utils/createVideoOverlayText";
import logger from "../utils/logger";

async function editVideo(videoInfo: VideoInfo) {
  return new Promise((resolve) => {
    logger("blue", "Video Editer", "starting");

    const step1Video = path.resolve(__dirname, "..", "..", "step1.mp4");
    const overlayImage = path.resolve(
      __dirname,
      "..",
      "..",
      "assets",
      "overlay.png"
    );

    const videoOverlayInfo = createVideoOverlayText(videoInfo);

    ffmpeg()
      .input(step1Video)
      .setStartTime("00:01:00")
      .setDuration("00:00:30")
      .complexFilter([
        `[0]scale=-1:1000[a];[a]crop=1000:1000[b];[b][1]overlay=0:0[c];[c]${videoOverlayInfo}`,
      ])
      .input(overlayImage)
      .on("start", () => {
        logger("blue", "Video Editer", "ffmpeg");
      })
      .on("error", (err) => {
        console.log("error: ", err);
      })
      .on("end", (err) => {
        if (!err) {
          logger("blue", "Video Editer", "finished");

          fs.unlinkSync(step1Video);
          resolve("ok");
        }
      })
      .saveToFile(path.resolve(`step2.mov`));
  });
}

export default editVideo;
