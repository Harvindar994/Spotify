import { Avatar } from '@radix-ui/themes';
import React from 'react';
import styles from "./RecentPlayedCard.module.css";

interface Props{
  image: string;
  heading: string;
  description: string;
  height: number;
}

const RecentPlayedCard = (props: Props) => {
  return (
    <div className={styles.card} style={{height: props.height}}>
        <Avatar
            src={props.image}
            fallback="A"
            radius='full'
            size="8"
        />
        <div className={styles.content}>
            <div className={styles.heading}>{props.heading}</div>
            <div className={styles.description}>{props.description}</div>
        </div>
    </div>
  )
}

export default RecentPlayedCard;