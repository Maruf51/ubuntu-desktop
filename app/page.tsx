'use client'

import HomePage from "@/components/home/HomePage";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import LockPage from "@/components/lock-page/LockPage";
import Signin from "@/components/signin/Signin";
import { userStore } from "@/store/useStore";
import { UserStoreTypes } from "@/types/types";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export default function Home() {
  const { user, lock }: UserStoreTypes = useStore(userStore)
  const [loadingScreen, setLoadingScreen] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoadingScreen(false)
    }, 500)
  }, [])

  return (
    <>
      {
        loadingScreen && <LoadingScreen />
      }
      {
        !loadingScreen && (lock ? <LockPage /> : (user ? <HomePage /> : <Signin />))
      }
    </>
  );
}
