import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";

import VideoInfo from "../types/video-info";
import createVideoOverlayText from "../utils/createVideoOverlayText";

async function editVideo(videoInfo: VideoInfo) {
  return new Promise((resolve) => {
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
        `[0]crop=ih/1.777777777[a];[a]scale=1080:1920[b];[b][1]overlay=0:0[c];[c]${videoOverlayInfo}`,
      ])
      .input(overlayImage)
      .on("start", function (commandLine) {
        console.log("Spawned FFmpeg with command: " + commandLine);
      })
      .on("error", function (err) {
        console.log("error: ", err);
      })
      .on("end", function (err) {
        if (!err) {
          console.log("conversion Done");

          fs.unlinkSync(step1Video);
          resolve("ok");
        }
      })
      .saveToFile(path.resolve(`step2.mp4`));
  });
}

export default editVideo;
