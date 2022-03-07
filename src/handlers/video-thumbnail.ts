import ffmpeg from "fluent-ffmpeg";
import path from "path";

import VideoInfo from "../types/video-info";
import logger from "../utils/logger";

async function createVideoThumbnail() {
  return new Promise(async (resolve) => {
    logger("magenta", "Video Thumbnail", "starting");

    ffmpeg(path.resolve(__dirname, "..", "..", "step2.mov")).takeScreenshots({
      timestamps: ["50%"],
      filename: "thumb.jpg",
      folder: path.resolve(__dirname, "..", ".."),
      size: "1000x1000",
    });

    resolve("ok");
    logger("magenta", "Video Thumbnail", "finished");
  });
}

export default createVideoThumbnail;
