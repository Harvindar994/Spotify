import { Avatar } from '@radix-ui/themes';
import React from 'react';
import styles from "./MadeForYouCard.module.css";

interface Props{
  image: string;
  heading: string;
  description: string;
  height: number;
}

const MadeForYouCard = (props: Props) => {
  return (
    <div className={styles.card} style={{height: props.height}}>
        <Avatar
            src={props.image}
            fallback="A"
            radius='full'
            size="9"
        />
        <div className={styles.content}>
            <div className={styles.heading}>{props.heading}</div>
            <div className={styles.description}>{props.description}</div>
        </div>
    </div>
  )
}

export default MadeForYouCard