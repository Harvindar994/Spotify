"use client";

import { Flex } from "@radix-ui/themes";
import SideMenu from "./components/SideMenu/SideMenu";
import './globals.css';
import Player from "./components/Player/Player";
import { poppins } from "./styles/fonts";
import { useState } from "react";
import HomePage from "./pages/Home/HomePage";
import { Theme } from '@radix-ui/themes';

export default function Home() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [theme, setTheme] = useState("dark");

  function handlePageChange(name: string){
    setCurrentPage(name);
  }

  return (
    <Theme appearance={theme} className='fullScreen'>
      <main className={`mainApp ${poppins.className}`}>
        <div className="pageContainer">
            <SideMenu setActivePage={handlePageChange}/>
            <div className="pages">
              <HomePage handleThemeChange={setTheme}/>
            </div>
        </div>
        <Player/>
      </main>
    </Theme>
  )
}
