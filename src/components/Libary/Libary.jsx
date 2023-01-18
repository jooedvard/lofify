import "./Libary.scss";
import music from "../../constant/music";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaMusic } from "react-icons/fa";

const Libary = ({ setSong }) => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="app__libary_menu">
        {toggle ? (
          <MdClose
            fontSize={30}
            onClick={() => {
              setToggle(false);
            }}
          />
        ) : (
          <div
            className="app__libary_open animate__animated animate__zoomIn animate__faster"
            onClick={(e) => {
              setToggle(true);
            }}
          >
            <span>Open Libary</span>
            <FaMusic></FaMusic>
          </div>
        )}
      </div>
      {toggle ? (
        <div
          className={
            "app__libary animate__animated animate__slideInLeft animate__faster"
          }
        >
          <div>
            {music.map((song, index) => {
              return (
                <div
                  className={active == index ? "app__song active" : "app__song"}
                  key={song.id}
                  onClick={() => {
                    setSong(song);
                    setActive(index);
                  }}
                >
                  <img src={song.cover} alt={song.title} loading={"lazy"}></img>
                  <div className="app__song-content">
                    <h2>{song.title}</h2>
                    <p>{song.id}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Libary;
