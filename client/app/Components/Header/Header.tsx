"use client";
import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();

  const router = useRouter();

  const { name } = user;
  const userId = user._id;

  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system theme preference on component mount
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
      <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9] dark:bg-[#121212]">
        <div>
          <h1 className="text-lg font-medium text-[#333] dark:text-white">
          <span role="img" aria-label="wave">
            👋
          </span>
            {userId ? `Welcome, ${name}!` : "Welcome to Task Management"}
          </h1>
          <p className="text-sm text-[#666] dark:text-[#bbb]">
            {userId ? (
                <>
                  You have{" "}
                  <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
                  &nbsp;active tasks
                </>
            ) : (
                "Please login or register to view your tasks"
            )}
          </p>
        </div>
        <div className="h-[50px] flex items-center gap-[10.4rem]">
          <button
              className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
              onClick={() => {
                if (userId) {
                  openModalForAdd();
                } else {
                  router.push("/login");
                }
              }}
          >
            {userId ? "Add a new Task" : "Login / Register"}
          </button>

          <div className="flex gap-4 items-center">
            <Link
                href="https://github.com/madhushiillesinghe/Task-Management-.git"
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
            >
              {github}
            </Link>
            <button
                onClick={toggleDarkMode}
                className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
            >
              {moon}
            </button>
            <Link
                href="https://github.com/madhushiillesinghe/Task-Management-.git"
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
            >
              {profile}
            </Link>
          </div>
        </div>
      </header>
  );
}

export default Header;
