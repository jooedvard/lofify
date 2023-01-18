import "./Libary.scss";
import music from "../../constant/music";
import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";

const Libary = ({ setSong }) => {
  const innerRef = useClickOutside((e) => {
    setToggle(false);
  });

  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <div   ref={innerRef}>
        <div className="app__libary_menu">
          {toggle ? (
            <div
              className="app__libary_open animate__animated animate__zoomOut animate__faster cursor_none"
              onClick={(e) => {
                setToggle(true);
              }}
            >
              <span>Open Libary</span>
              <FaMusic></FaMusic>
            </div>
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
        <div
        
          className={
            toggle
              ? "app__libary animate__animated animate__zoomIn "
              : "app__libary__hide"
          }
        >
          <MdClose
            fontSize={30}
            className="app__libary_close"
            onClick={() => {
              setToggle(false);
            }}
          />
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
                  {" "}
                  <img src={song.cover} alt={song.title}></img>
                  <div className="app__song-content">
                    <h2>{song.title}</h2>
                    <p>{song.id}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Libary;
