import ytdl from "ytdl-core";
import fs from "fs";

import VideoInfo from "../types/video-info";

async function downloadVideo(): Promise<VideoInfo> {
  const videoUrl =
    "https://www.youtube.com/watch?v=yHqOj8sLl_c&ab_channel=30PRAUM";

  return new Promise(async (resolve) => {
    ytdl(videoUrl)
      .pipe(fs.createWriteStream("step1.mp4"))
      .on("finish", async () => {
        const info = await ytdl.getInfo(videoUrl);

        const data: VideoInfo = {
          title: info.videoDetails.title,
          artist: info.videoDetails.author.name,
          artistPic: info.videoDetails.ownerProfileUrl,
          viewCount: info.videoDetails.viewCount,
        };

        resolve(data);

        console.log("[Video Downloader] - download completed");
      });
  });
}

export default downloadVideo;
