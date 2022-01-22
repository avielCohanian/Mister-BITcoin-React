import React, { useEffect, useRef, useState } from 'react';

import DriveFolderUploadSharpIcon from '@mui/icons-material/DriveFolderUploadSharp';
import RedoSharpIcon from '@mui/icons-material/RedoSharp';
import CameraAltSharpIcon from '@mui/icons-material/CameraAltSharp';
import UndoSharpIcon from '@mui/icons-material/UndoSharp';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';

export const PhotoCapture = ({ onDone }) => {
  const enableCamera = useRef(true);
  const picture = useRef(null);
  const videoPlayer = useRef(null);
  const canvasElement = useRef(null);

  const [showVideo, setShowVideo] = useState(true);
  const [pickImage, setPickImage] = useState(false);

  useEffect(() => {
    (async () => {
      await streamUserMediaVideo();
    })();
  }, []);

  const streamUserMediaVideo = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPickImage(true);
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoPlayer.current.srcObject = stream))
      .catch((err) => {
        setPickImage(true);
        console.error('could not open the camera', err);
      });
  };

  const capture = () => {
    setShowVideo(false);
    canvasElement.current.width = videoPlayer.current.videoWidth;
    canvasElement.current.height = videoPlayer.current.videoHeight;

    var context = canvasElement.current.getContext('2d');

    context.translate(canvasElement.current.width, 0);
    context.scale(-1, 1);
    context.drawImage(videoPlayer.current, 0, 0);

    stopVideoStream();
    picture.current = canvasElement.current.toDataURL();
    setShowVideo(false);
  };

  const stopVideoStream = () => {
    if (!(videoPlayer.current && videoPlayer.current.srcObject)) return;
    videoPlayer.current.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });
  };

  const upload = (ev) => {
    var reader = new FileReader();
    reader.onload = (event) => (picture.current = event.target.result);
    reader.readAsDataURL(ev.target.files[0]);
  };

  const done = (ev) => {
    ev.preventDefault();
    onDone(picture.current);
  };

  const cancel = () => {
    setShowVideo(true);
    streamUserMediaVideo();
  };

  return (
    <div className={!enableCamera.current ? 'none' : '' + ' ' + 'photo-capture'}>
      {pickImage ? (
        <div>
          <h2>Upload a clear Photo</h2>
          <label htmlFor="image-picker" className="image-picker">
            <DriveFolderUploadSharpIcon className="material-icons upload-img"></DriveFolderUploadSharpIcon>
            <input type="file" accept="image/*" name="image-picker" id="image-picker" onChange={upload} hidden />
          </label>
          <div className="upload-actions">
            <button type="button" className="btn-capture simple-button ok-btn" onClick={done}>
              {/* stop popogation */}
              <RedoSharpIcon className="material-icons next-btn"></RedoSharpIcon>
            </button>
          </div>
        </div>
      ) : (
        ''
      )}

      {!pickImage ? (
        <div className="video-container">
          <video ref={videoPlayer} className={(!showVideo ? 'none' : '') + ' ' + 'camera'} autoPlay playsInline></video>

          <canvas ref={canvasElement} id="barcode" className={(showVideo ? 'none' : '') + ' ' + 'preview'}></canvas>
          <div className="center photo-capture-actions">
            {showVideo ? (
              <button type="button" className="btn-capture simple-button" onClick={capture}>
                <CameraAltSharpIcon className="material-icons"></CameraAltSharpIcon>
              </button>
            ) : (
              ''
            )}

            {!showVideo ? (
              <div>
                <button type="button" className="btn-capture simple-button" onClick={cancel}>
                  <UndoSharpIcon className="material-icons"></UndoSharpIcon>
                </button>
                <button type="button" className="btn-capture simple-button" onClick={done}>
                  <ThumbUpAltSharpIcon className="material-icons"></ThumbUpAltSharpIcon>
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
