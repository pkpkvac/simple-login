import React from "react";
import ReactPlayer from "react-player";

function EmbeddedVideo() {
  return (
    //https://www.cluemediator.com/embed-youtube-video-in-reactjs
    <div>
      <ReactPlayer url="https://www.youtube.com/watch?v=UVCP4bKy9Iw" />
    </div>
  );
}

export default EmbeddedVideo;
