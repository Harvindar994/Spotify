import React from 'react';
import styels from "./Option.module.css";

interface OptionType{
    icon: React.ReactNode;
    name: String;
    onClickCallback: CallableFunction;
    isActive: boolean;
}

const Option = (props: OptionType) => {

  function handleOnClick(){
    props.onClickCallback(props.name);
  }

  return (
    <div className={`${styels.option} ${props.isActive && styels.active}`} onClick={handleOnClick}>
      <div className={styels.icon}>{props.icon}</div>
      <div className={styels.name}>{props.name}</div>
    </div>
  )
}

export default Option;
export type { OptionType };