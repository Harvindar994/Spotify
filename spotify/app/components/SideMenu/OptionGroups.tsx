import React from 'react'
import { IconBaseProps } from 'react-icons';
import { OptionType } from './Option';
import Option from './Option';
import styles from "./OptionGroups.module.css";

interface Props{
    groupName?: String;
    options: OptionType[];
    onClickCallback: CallableFunction;
    activeOption: String;
}

const OptionGroups = (props:Props) => {
  return (
    <div className={styles.optionGroup}>
        {props.groupName && <div className={styles.groupName}>
            <h1>{props.groupName}</h1>    
        </div>}
        <div className={styles.options}>
            {props.options.map((option: OptionType, index: number)=>{
                return (
                    <Option 
                    name={option.name}
                        icon={option.icon} 
                        onClickCallback={props.onClickCallback} 
                        isActive={props.activeOption === option.name}/>
                )
            })}
        </div>
    </div>
  )
}

export default OptionGroups