import "./Player.scss";
import React, { useEffect, useRef, useState } from "react";
import {
  BiPlay,
  BiStop,
  BiSkipNext,
  BiSkipPrevious,
  BiVolume,
} from "react-icons/bi";
import "animate.css";
import music from "../../constant/music";

const Player = ({ song, setSong }) => {
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef();

  const onVolumeChange = (e) => {
    let { value } = e.target;
    let volume = value / 10;
    let volumeString = `0.${volume.toString().replace(".", "")}`;
    if (volume == 10) {
      volumeString = `1`;
    }
    musicRef.current.volume = volumeString;
  };

  const handlePrevious = () => {
    let prevSong = music.find((s, index) => {
      return s.serial_number === song.serial_number - 1;
    });

    if (prevSong != null) {
      setSong(prevSong);
    }
  };

  const handleNext = () => {
    let nextSong = music.find((s, index) => {
      return s.serial_number === song.serial_number + 1;
    });

    if (nextSong != null) {
      setSong(nextSong);
    }
  };

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
      musicRef.current.volume = "0.50";
      handleLoad();
      setPlaying(false);
    }
  }, [song]);

  return (
    <div className="section__padding">
      <div className="section__background">
        <img src={song.cover} alt={song.cover} className="animate__animated " />
      </div>
      {
        <div className="app__player_title">
          <div className="animate__animated animate__zoomIn">{song.title}</div>
          <div
            className={"app__player-symbol animate__animated animate__zoomIn"}
          >
            <span className="app__player-dash"></span>
            <span className="app_player-dot"></span>
            <span className="app__player-dash"></span>
          </div>
        </div>
      }

      {(
        <div className="app__player_nav">
          <div className="app__player_buttons animate__animated animate__fadeInUp">
            <button onClick={handlePrevious}>
              <BiSkipPrevious></BiSkipPrevious>
            </button>
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
            <button onClick={handleNext}>
              <BiSkipNext></BiSkipNext>
            </button>
          </div>
          <div className="app__player_volume animate__animated animate__fadeInUp animate__delay-short">
            <BiVolume></BiVolume>
            <input type={"range"} onChange={onVolumeChange} />
          </div>
          <audio ref={musicRef}>
            <source
              src={song.url}
              type={"audio/mp3"}
            ></source>
          </audio>
        </div>
      )}
    </div>
  );
};

export default Player;
