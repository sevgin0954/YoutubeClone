type VideoStreams = [{
  widthPixels: number,
  heightPixels: number,
  frameRateFps: number,
  aspectRatio: number,
  codec: string,
  bitrateBps: number,
  rotation: string,
  vendor: string
}];
type AudioStreams = [
  {
    channelCount: number,
    codec: string,
    bitrateBps: number,
    vendor: string
  }
];

export interface VideoFileDetails {
  fileName: string,
  fileSize: number,
  fileType: string,
  container: string,
  videoStreams: VideoStreams,
  audioStreams: AudioStreams,
  durationMs: number,
  bitrateBps: number,
  creationTime: string
}
