import { fileSystem, wallpapers } from '@/data/data'
import { FileSystemStoreTypes, FileSystemTypes, MetaDataStoreTypes, UserStoreTypes, WindowStoreTypes, WindowTypes } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

const removeWindowHandler = (data: WindowTypes[], id: number) =>
    data.filter((dt: WindowTypes) => dt.id !== id);


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


const quitWindowsHandler = (data: WindowTypes[], name: string): WindowTypes[] =>
    data.filter((window: WindowTypes) => window.name !== name) || []

const emptyTrashHandler = (data: FileSystemTypes[]): FileSystemTypes[] => {
    let newFiles = [...data]
    newFiles[9].children = []
    return newFiles
}

const deleteFromTrashHandler = (data: FileSystemTypes[], id: number): FileSystemTypes[] => {
    let newData = [...data]
    const filteredData = data[9].children && data[9].children.filter((dt: FileSystemTypes) => dt.id !== id)
    newData[9].children = filteredData
    return newData;
}

const userStore = create<UserStoreTypes>((set) => ({
    user: false,
    lock: false,
    setUser: (newUser: boolean) => set({ user: newUser }),
    setLock: (newLock: boolean) => set({ lock: newLock })
}))

const metaDataStore = create<MetaDataStoreTypes>()(
    persist(
        (set) => ({
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
        }),
        {
            name: 'meta-data',
            partialize: (state) => ({
                volume: state.volume,
                tempVolume: state.tempVolume,
                theme: state.theme,
                power: state.power,
                wallpaper: state.wallpaper,
                nightLight: state.nightLight,
            })
        }
    )
)

const windowStore = create<WindowStoreTypes>((set) => ({
    windows: [],
    startMenu: false,
    setStartMenu: ((value) => set({ startMenu: value })),
    addNewWindow: ((newData) => set((state) => ({ windows: [...state.windows, newData], startMenu: false }))),
    removeWindow: ((id) => set((state) => ({
        windows: removeWindowHandler(state.windows, id),
    }))),
    setActiveWindow: ((id) => set((state) => ({ windows: activeWindowHandler(state.windows, id), startMenu: false }))),
    quitWindows: ((name) => set((state) => ({ windows: quitWindowsHandler(state.windows, name) })))
}))

const fileSystemStore = create<FileSystemStoreTypes>()(
    persist(
        (set) => ({
            files: fileSystem,
            emptyTrashModal: false,
            deleteFromTrashModal: null,
            setFiles: ((e) => set({ files: e })),
            emptyTrash: () => set((state) => ({ files: emptyTrashHandler(state.files) })),
            setEmptyTrashModal: (value) => set({ emptyTrashModal: value }),
            deleteFromTrash: () => set((state) => ({ files: deleteFromTrashHandler(state.files, state.deleteFromTrashModal?.id || 0) })),
            setDeleteFromTrashModal: (value) => set({ deleteFromTrashModal: value }),
        }),
        {
            name: 'file-system',
            partialize: (state) => ({
                files: state.files
            })
        }
    )
)

export {
    metaDataStore,
    userStore,
    windowStore,
    fileSystemStore
}