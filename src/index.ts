import downloadVideo from "./handlers/video-downloader";
import editVideo from "./handlers/video-edit";
import publishVideo from "./handlers/video-publish";
import createVideoThumbnail from "./handlers/video-thumbnail";

async function start() {
  const videoInfo = await downloadVideo();
  await editVideo(videoInfo);
  await createVideoThumbnail();
  await publishVideo();

  await process.exit(1);
}

start();
