"use client";

import React, { useState } from 'react';
import { ScrollArea, DropdownMenu, Button } from '@radix-ui/themes';
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/themes';
import { DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@radix-ui/themes';
import { CiMenuKebab } from "react-icons/ci";
import styles from "./SideMenu.module.css";
import Logo from './Logo';
import OptionGroups from './OptionGroups';
import { AiFillHome } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { RiUserVoiceLine } from "react-icons/ri";
import { FaRegFolderOpen } from "react-icons/fa";

const optionGrups = [
    {
        name:"",
        options: [
            {
                icon: <AiFillHome/>,
                name: "Home"
            },
            {
                icon: <IoSearchSharp />,
                name: "Browse"
            },
            {
                icon: <IoMdRadioButtonOn />,
                name: "Radio"
            },
        ]
    },
    {
        name: "Library",
        options: [
            {
                icon: <FaRegHeart />,
                name: "Liked Songs"
            },
            {
                icon: <MdAccessTime />,
                name: "Recently Played"
            },
            {
                icon: <RiUserVoiceLine />,
                name: "Artists"
            },
            {
                icon: <FaRegFolderOpen />,
                name: "Albums"
            }
        ]
    },
    {
        name: "Library",
        options: [
            {
                icon: <FaRegHeart />,
                name: "Liked Songs"
            },
            {
                icon: <MdAccessTime />,
                name: "Recently Played"
            },
            {
                icon: <RiUserVoiceLine />,
                name: "Artists"
            },
            {
                icon: <FaRegFolderOpen />,
                name: "Albums"
            }
        ]
    }
]

interface SideMenuProps{
    setActivePage: CallableFunction;
}

const SideMenu = (props: SideMenuProps) => {
    const [activeOption, setActiveOption] = useState("Home");

    function handleOnOptionClick(name: string){
        setActiveOption(name);
        props.setActivePage(name);
    }

    return (
        <div className={styles.SideMenu}>
            <div className={styles.menuContainer}>
                <DropdownMenuRoot>
                    <DropdownMenuTrigger>
                        <Button size="3" className={styles.OptionsMenuButton}>
                            <CiMenuKebab className={styles.icon}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem shortcut="⌘ E">Edit</DropdownMenuItem>
                        <DropdownMenuItem shortcut="⌘ D">Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem shortcut="⌘ N">Archive</DropdownMenuItem>

                        <DropdownMenuSub>
                        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Move to project…</DropdownMenuItem>
                            <DropdownMenuItem>Move to folder…</DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Advanced options…</DropdownMenuItem>
                        </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Add to favorites</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem shortcut="⌘ ⌫" color="red">
                        Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenuRoot>
            </div>
            <Logo/>
            <ScrollArea type="always" scrollbars="vertical" className={styles.ScrollArea}>
                <div className="content">
                    {optionGrups.map((group) => {
                        return (
                        <OptionGroups 
                            options={group.options} 
                            groupName={group.name} 
                            onClickCallback={handleOnOptionClick}
                            activeOption={activeOption}/>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    )
}

export default SideMenu;