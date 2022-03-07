import ytdl from "ytdl-core";
import fs from "fs";
import readline from "readline";

import VideoInfo from "../types/video-info";
import logger from "../utils/logger";

async function downloadVideo(): Promise<VideoInfo> {
  const videoUrl =
    "https://www.youtube.com/watch?v=b-PhvPKgWjY&ab_channel=30PRAUM";

  return new Promise(async (resolve) => {
    logger("yellow", "Video Downloader", "starting");

    ytdl(videoUrl)
      .pipe(fs.createWriteStream("step1.mp4"))
      .on("finish", async () => {
        const info = await ytdl.getInfo(videoUrl);

        const thumbs = info.videoDetails.thumbnail.thumbnails;

        const data: VideoInfo = {
          title: info.videoDetails.title,
          artist: info.videoDetails.author.name,
          artistPic: info.videoDetails.ownerProfileUrl,
          viewCount: info.videoDetails.viewCount,
          thumbnail: thumbs[thumbs.length - 1].url,
        };

        resolve(data);

        logger("yellow", "Video Downloader", "finished");
      });
  });
}

export default downloadVideo;
