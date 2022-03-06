import downloadVideo from "./handlers/video-downloader";
import editVideo from "./handlers/video-edit";

(async () => {
  const videoInfo = await downloadVideo();
  await editVideo(videoInfo);
})();
