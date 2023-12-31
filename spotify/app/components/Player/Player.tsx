"use client";

import React, { useState } from 'react';
import styles from "./Player.module.css";
import { Avatar, Slider } from '@radix-ui/themes';
import { IoMdRepeat } from "react-icons/io";
import { MdOutlineShuffle } from "react-icons/md";
import { IoVolumeMedium } from "react-icons/io5";
import { Volkhov } from 'next/font/google';
import { IoMdVolumeOff } from "react-icons/io";
import Controllers from './Controllers';

const Player = () => {
  const [activeOption, setActiveOption] = useState({
      shuffle: false,
      repeat: false,
      volume: true
  });

  function handleOptionOnClick(event: any){
    const id = event.currentTarget.id;
    const value = !activeOption[id];
    
    setActiveOption((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  return (
    <div className={styles.Player}>
      <div className={styles.currentTrack}>
        <Avatar
          size="6"
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          fallback="A"
          radius='full'
        />
        <div className={styles.trackDescription}>
          <div className={styles.trackname}>montero (Call Me...</div>
          <div className={styles.trackArtist}>Lil Nas X</div>
        </div>
      </div>
      <div className={styles.controllers}>
        <Controllers />
      </div>
      <div className={styles.timeline}>
        <div className={styles.remainTime}>1:23</div><Slider className={styles.slider} defaultValue={[50]}/><div className={styles.runningTime}>2:18</div>
      </div>
      <div className={styles.options}>
          <div className={`${styles.option} ${activeOption.repeat && styles.optionActive}`} onClick={handleOptionOnClick} id='repeat'><IoMdRepeat /></div>
          <div className={`${styles.option} ${activeOption.shuffle && styles.optionActive}`} onClick={handleOptionOnClick} id='shuffle'><MdOutlineShuffle /></div>
          <div className={`${styles.option} ${activeOption.volume && styles.optionActive}`} onClick={handleOptionOnClick} id='volume'>
            {activeOption.volume? <IoVolumeMedium />: <IoMdVolumeOff />}
          </div>
      </div>
    </div>
  )
}

export default Player