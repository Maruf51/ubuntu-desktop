import { wallpapers } from '@/data/data'
import { MetaDataStoreTypes, UserStoreTypes, WindowStoreTypes, WindowTypes } from '@/types/types'
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

const userStore= create<UserStoreTypes>((set) => ({
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
    mute: () => set((state: any) => ({ volume: state.volume === 0 ? (state.tempVolume === 0 ? 50 : state.tempVolume) : 0 })),
    setVolume: (value: number) => set({ volume: value, tempVolume: value }),
    changeTheme: () => set((state: any) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    changePower: () => set((state: any) => ({ power: state.power === 'Balanced' ? 'Power Saver' : 'Balanced' })),
    changeNightLight: () => set((state: any) => ({ nightLight: !state.nightLight })),
    setWallpaper: (wp) => set({wallpaper: wp})
}))

const windowStore = create<WindowStoreTypes>((set) => ({
    windows: [],
    activeWindow: null,
    addNewWindow: ((newData) => set((state: any) => ({ windows: [...state.windows, newData] }))),
    removeWindow: ((id) => set((state: any) => ({
        windows: removeWindowHandler(state.windows, id),
        // activeWindow: activeWindowHandler(state.windows, id)
    }))),
    setActiveWindow: ((id) => set((state: any) => ({ windows: activeWindowHandler(state.windows, id) })))
}))

export {
    metaDataStore,
    userStore,
    windowStore
}