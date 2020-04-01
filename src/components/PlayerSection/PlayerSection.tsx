import React, { useState } from "react";
import "./PlayerSection.scss";

export interface PlayerSectionProps {}

export const PlayerSection: React.SFC<PlayerSectionProps> = () => {
  const [play, setPlay] = useState(false);

  return (
    <section className="playersection">
      {/* <video controls>
        <source
          src="https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86"
          type="audio/mpeg"
        />
      </video> */}
      <audio
        autoPlay={play}
        style={{ width: "50%" }}
        src="https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86"
      ></audio>
      <button onClick={() => setPlay(!play)}>play/stop</button>
    </section>
  );
};
