import React, { useState } from 'react';
import styles from "./HomePage.module.css";
import { DropdownMenuContent, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, IconButton } from '@radix-ui/themes';
import { TextFieldInput } from '@radix-ui/themes';
import { Avatar } from '@radix-ui/themes';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import Group from './Group';
import { ScrollArea } from '@radix-ui/themes';
import RecentPlayedCard from './RecentPlayedCard';
import MadeForYouCard from './MadeForYouCard';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { DropdownMenuRoot } from '@radix-ui/themes';
import { DropdownMenuItem } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props{
  handleThemeChange: CallableFunction;
}

const HomePage = (props: Props) => {
  const [theme, setTheme] = useState("dark");
  const router = useRouter();
  const temp_img = "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop";

  function changeTheme(){
    if (theme === "dark"){
      setTheme("light");
    }
    else{
      setTheme("dark");
    }
    props.handleThemeChange(theme);
  }

  async function logout(){
    try {

      const response = await axios.get("/api/users/logout");

      console.log(response);
      router.push("/auth/login");
      
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.pageNavigationGroup}>
          <IconButton size="2" radius='full' className={styles.button}><IoIosArrowBack /></IconButton>
          <IconButton size="2" radius='full' className={`${styles.nextButton} ${styles.button}`}><IoIosArrowBack /></IconButton>
        </div>
        <TextFieldInput radius='full' size="3" className={styles.searchField} placeholder='Artists, songs, or podcasts'/>
        <div className={styles.spacer}></div>
        <div className={styles.profileGroup}>

          <IconButton size="2" radius='full' className={styles.button} onClick={changeTheme}>
            {theme == "dark" ? <MdLightMode />: <MdDarkMode />}
          </IconButton>
          <IconButton size="2" radius='full' className={styles.button}><IoIosSettings /></IconButton>
          <IconButton size="2" radius='full' className={styles.button}><FaBell /></IconButton>
          <DropdownMenuRoot>
              <DropdownMenuTrigger>
                  <Avatar
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                    fallback="A"
                    radius='full'
                    size="4"
                  />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                  <DropdownMenuItem shortcut="⌘ E">Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} shortcut="⌘ ⌫" color="red">
                  Logout
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenuRoot>
        </div>
      </div>
      <div className={styles.content}>
        <ScrollArea type="auto" scrollbars="vertical" style={{ height: "100%", width: "100%"}}>

          <Group heading='Recently played' description=' All the songs that you recently played' height={270} background gap='0'>
            <RecentPlayedCard image={temp_img} heading='Stay' description='the kid laroi' height={270}/>
            <RecentPlayedCard image={temp_img} heading='Women' description='Doja Cat' height={270}/>
          </Group>
          <Group heading='Made For You' description='Inspired by recent activity.' height={310} marginTop='50px' gap='5'>
            <MadeForYouCard image={temp_img} heading='Stay' description='the kid laroi' height={310}/>
            <MadeForYouCard image={temp_img} heading='Women' description='Doja Cat' height={310}/>
          </Group>
        </ScrollArea>
      </div>
    </div>
  )
}

export default HomePage;