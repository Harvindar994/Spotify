import React, { ReactComponentElement } from 'react';
import styles from "./Group.module.css";
import MadeForYouCard from './MadeForYouCard';
import { ScrollArea } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';


interface Props{
  heading: string;
  description: string;
  height: number;
  background?: boolean;
  marginTop?: string;
  children: any;
  gap: string;
}

const Group = (props: Props) => {
  return (
    <div className={styles.group} style={{marginTop: props.marginTop}}>
      <div className={styles.header}>
        <div className={styles.heading}>{props.heading}</div>
        <div className={styles.description}>{props.description}</div>
      </div>
      <div className={styles.content} style={{backgroundColor: props.background ? "var(--gray-3)": "transparent" }}>
        <ScrollArea type="auto" scrollbars="horizontal" style={{ height: props.height, width: "calc(100%)"}}>
          <Flex gap={props.gap}>
            {props.children}
          </Flex>
        </ScrollArea>
      </div>
    </div>
  )
}



export default Group;