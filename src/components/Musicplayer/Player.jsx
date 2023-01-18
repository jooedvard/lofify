import "./Player.scss";
import React, { useEffect, useRef, useState } from "react";
import { BiPlay, BiStop, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import "animate.css";
import music from "../../constant/music";
import { useFetch } from "../../hooks/useFetch";

const Player = ({ song, setSong }) => {
  const API =
    "https://yt-dl.prajjwalkapoor.repl.co/fetchAudio?videoURL=https://www.youtube.com/watch?v=";
  const { isLoading, responseJSON, error } = useFetch(API + song.id);

  const [playing, setPlaying] = useState(false);
  const musicRef = useRef();

  const handleLoad = () => {
    musicRef.current.load();
  };

  const handleStart = () => {
    musicRef.current.play();
    setPlaying(true);
  };

  const handleStop = () => {
    musicRef.current.pause();
    setPlaying(false);
  };

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.pause();
      handleLoad();
      setPlaying(false);
    }
  }, [responseJSON]);


  return (
    <div className="section__padding">
      <div className="section__background">
      <img
            src={song.cover}
            alt={song.cover}
            className="animate__animated "
          />
      </div>
      <div className="app__player_title">
        {isLoading ? <div className="animate__animated animate__zoomOut">{"Loading..."}</div> : <div className="animate__animated animate__zoomIn">{ song.title}</div>}
        <div className={isLoading ? "app__player-symbol animate__animated animate__zoomOut" : "app__player-symbol animate__animated animate__zoomIn"}>
          <span className="app__player-dash"></span>
          <span className="app_player-dot"></span>
          <span className="app__player-dash"></span>
        </div>
      </div>
      {responseJSON != null && !isLoading && (
        <>
          <div className="app__player_buttons animate__animated animate__fadeInUp">
            {!playing ? (
              <button
                onClick={() => {
                  handleStart();
                }}
              >
                <span>Play</span>
                <BiPlay></BiPlay>
              </button>
            ) : (
              <button
                onClick={() => {
                  handleStop();
                }}
              >
                <span>Stop</span>
                <BiStop></BiStop>
              </button>
            )}
          </div>
          <audio ref={musicRef}>
            <source
              src={responseJSON[0].url}
              type={responseJSON[0].mimeType}
            ></source>
          </audio>
        </>
      )}
    </div>
  );
};

export default Player;
