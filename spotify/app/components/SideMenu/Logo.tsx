import Image from 'next/image';
import React from 'react';
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className="pt-4">
      <Image src="/Spotify logo.png" alt='Spotify' width={130} height={130} className={styles.logo}/>
    </div>
  )
}

export default Logo