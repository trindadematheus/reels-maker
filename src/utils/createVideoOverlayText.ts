import VideoInfo from "../types/video-info";
import fold from "./foldText";

export default function createVideoOverlayText(videoInfo: VideoInfo) {
  const lineBreakedText = fold(videoInfo.title, 40, true)
    .map((line: any) => line.trim())
    .join("\n");

  const artist = `drawtext=text='${videoInfo.artist}':x=60:y=h-204:fontsize=38:fontcolor=gray[artist]`;
  const title = `[artist]drawtext=text='${lineBreakedText}':x=60:y=h-150:fontsize=48:fontcolor=white`;

  return `${artist};${title}`;
}
