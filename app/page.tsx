'use client'

import HomePage from "@/components/home/HomePage";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import LockPage from "@/components/lock-page/LockPage";
import CreateNewFolder from "@/components/modals/CreateNewFolder";
import DeleteFromTrash from "@/components/modals/DeleteFromTrash";
import EmptyTrash from "@/components/modals/EmptyTrash";
import Signin from "@/components/signin/Signin";
import { fileSystemStore, metaDataStore, userStore } from "@/store/useStore";
import { FileSystemStoreTypes, MetaDataStoreTypes, UserStoreTypes } from "@/types/types";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export default function Home() {
  const { user, lock }: UserStoreTypes = useStore(userStore)
  const { folderModal }: MetaDataStoreTypes = useStore(metaDataStore)
  const { emptyTrashModal, deleteFromTrashModal }: FileSystemStoreTypes = fileSystemStore()
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
      {
        folderModal && <CreateNewFolder />
      }
      {
        emptyTrashModal && <EmptyTrash />
      }
      {
        deleteFromTrashModal && <DeleteFromTrash />
      }
    </>
  );
}
