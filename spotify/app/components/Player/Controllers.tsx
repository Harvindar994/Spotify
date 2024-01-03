import styles from "./Controller.module.css";
import React, { useState } from 'react';
import { FaPlay } from "react-icons/fa6";
import { GiPauseButton } from "react-icons/gi";
import { IoChevronBack } from "react-icons/io5";


const Controllers = () => {
    const [isPlaying, setPlaying] = useState(false);

    function onPlay(){
        setPlaying(!isPlaying);
    }

    function onNext(){

    }

    function onPrevious(){

    }

    return (
        <div className={styles.controllers}>
            <div className={styles.previous}><IoChevronBack /></div>
            <div className={styles.playPause} onClick={onPlay}>
                {!isPlaying && <div className={styles.play}><FaPlay/></div>}
                {isPlaying && <div className={styles.pause}><GiPauseButton /></div>}
            </div>
            <div className={styles.next}><IoChevronBack /></div>
        </div>
    )
}

export default Controllers;