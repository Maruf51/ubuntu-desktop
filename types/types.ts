import { NextPage } from "next";
import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

interface IDTypes {
    id: number,
    zIndex: number
}

export interface WindowTypes {
    comp: NextPage<IDTypes>,
    id: number,
    name: string,
    zIndex: number
}

export interface UserStoreTypes {
    user: boolean,
    lock: boolean,
    setUser: (e: boolean) => void,
    setLock: (e: boolean) => void,
}

export interface MetaDataStoreTypes {
    volume: number,
    tempVolume: number,
    theme: 'dark' | 'light',
    power: 'Balanced' | 'Power Saver',
    wallpaper: string,
    folderModal: string[] | null,
    nightLight: boolean,
    mute: () => void,
    setVolume: (e: number) => void,
    changeTheme: () => void,
    changePower: () => void,
    changeNightLight: () => void,
    setWallpaper: (e: string) => void,
    setFolderModal: (e: string[] | null) => void
}

export interface WindowStoreTypes {
    windows: WindowTypes[],
    startMenu: boolean,
    setStartMenu: (value: boolean) => void,
    addNewWindow: (newData: WindowTypes) => void,
    removeWindow: (id: number) => void,
    setActiveWindow: (id: number) => void,
    quitWindows: (name: string) => void
}

export interface SettingsSidebarTypes {
    name: string,
    icon: IconType
}

export interface DocAppTypes {
    name: string,
    title: string,
    icon: StaticImageData,
    component: NextPage<{ id: number, zIndex: number }>
}

export interface StartMenuAppTypes {
    name: string,
    title: string,
    icon: StaticImageData,
    component?: NextPage<{ id: number, zIndex: number }>
}

export interface FileSystemTypes {
    id: number,
    type: 'folder' | 'file',
    name: string,
    children?: FileSystemTypes[],
    icon: StaticImageData,
    path: string[]
}

export interface FileSystemStoreTypes {
    files: FileSystemTypes[],
    emptyTrashModal: boolean,
    deleteFromTrashModal: FileSystemTypes | null,
    setFiles: (e: FileSystemTypes[]) => void,
    emptyTrash: () => void,
    setEmptyTrashModal: (e: boolean) => void,
    deleteFromTrash: () => void,
    setDeleteFromTrashModal: (e: FileSystemTypes | null) => void
}

export interface BrowserTabTypes {
    title: string,
    url: string | null,
    id: number
}