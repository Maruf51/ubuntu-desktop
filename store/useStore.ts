import { fileSystem, wallpapers } from '@/data/data'
import { FileSystemStoreTypes, MetaDataStoreTypes, UserStoreTypes, WindowStoreTypes, WindowTypes } from '@/types/types'
import { create } from 'zustand'

const removeWindowHandler = (data: WindowTypes[], id: number) => {
    const filteredData = data.filter((dt: WindowTypes) => dt.id !== id)
    return filteredData
}

const activeWindowHandler = (data: WindowTypes[], id: number) => {
    const filteredWindows = data.filter((dt: WindowTypes) => dt.id !== id)
    const selectedWindow = data.find((dt: WindowTypes) => dt.id === id)
    const sortedWindows = [...filteredWindows, selectedWindow]
    let returnedWindows: WindowTypes[] = []
    for (let i = 0; i < sortedWindows.length; i++) {
        let selectedWindow = sortedWindows[i]
        if (selectedWindow) {
            selectedWindow.zIndex = 10 + i
            returnedWindows.push(selectedWindow)
        }
    }

    return returnedWindows
}

const quitWindowsHandler = (data: WindowTypes[], name: string): WindowTypes[] => {
    const filteredWindows = data.filter((window: WindowTypes) => window.name !== name)
    return filteredWindows || []
}

const userStore = create<UserStoreTypes>((set) => ({
    user: false,
    lock: false,
    setUser: (newUser: boolean) => set({ user: newUser }),
    setLock: (newLock: boolean) => set({ lock: newLock })
}))

const metaDataStore = create<MetaDataStoreTypes>((set) => ({
    volume: 50,
    tempVolume: 50,
    theme: 'dark',
    power: 'Balanced',
    wallpaper: wallpapers[0],
    nightLight: false,
    folderModal: null,
    mute: () => set((state) => ({ volume: state.volume === 0 ? (state.tempVolume === 0 ? 50 : state.tempVolume) : 0 })),
    setVolume: (value) => set({ volume: value, tempVolume: value }),
    changeTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    changePower: () => set((state) => ({ power: state.power === 'Balanced' ? 'Power Saver' : 'Balanced' })),
    changeNightLight: () => set((state) => ({ nightLight: !state.nightLight })),
    setWallpaper: (wp) => set({ wallpaper: wp }),
    setFolderModal: (value) => set({ folderModal: value })
}))

const windowStore = create<WindowStoreTypes>((set) => ({
    windows: [],
    activeWindow: null,
    startMenu: false,
    setStartMenu: ((value) => set({ startMenu: value })),
    addNewWindow: ((newData) => set((state) => ({ windows: [...state.windows, newData], startMenu: false }))),
    removeWindow: ((id) => set((state) => ({
        windows: removeWindowHandler(state.windows, id),
        // activeWindow: activeWindowHandler(state.windows, id)
    }))),
    setActiveWindow: ((id) => set((state) => ({ windows: activeWindowHandler(state.windows, id), startMenu: false }))),
    quitWindows: ((name) => set((state) => ({ windows: quitWindowsHandler(state.windows, name) })))
}))

const fileSystemStore = create<FileSystemStoreTypes>((set) => ({
    files: fileSystem,
    setFiles: ((e) => set({ files: e }))
}))

export {
    metaDataStore,
    userStore,
    windowStore,
    fileSystemStore
}