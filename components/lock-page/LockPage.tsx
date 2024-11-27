import { NextPage } from 'next'
import PowerMenu from '../power-menu/PowerMenu'
import { wallpapers } from '@/data/data'
import Image from 'next/image'
import linuxImage from '@/images/linux.png'
import { useEffect, useRef, useState } from 'react'
import { useStore } from 'zustand'
import { userStore } from '@/store/useStore'
import { twMerge } from 'tailwind-merge'
import { UserStoreTypes } from '@/types/types'

const LockPage: NextPage = ({ }) => {
    const [login, setLogin] = useState<boolean>(false)

    const newDate = new Date()

    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false }

    const time = newDate.toLocaleTimeString('en-US', timeOptions);
    const currentDay = newDate.toLocaleDateString('en-US', { weekday: 'long' });
    const fullDate = newDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className='w-full h-full relative bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${wallpapers[0]})` }}>
            <div className='absolute top-0 left-0 w-full h-full backdrop-blur-md'>
                <div className='absolute top-1 right-1 h-8 text-white z-10'>
                    <PowerMenu />
                </div>
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center' onClick={() => setLogin(true)}>
                    <LoginFormLock login={login} />
                    <div className={twMerge('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white gap-5 select-none duration-500 origin-top', login && 'scale-0')}>
                        <h1 className='text-8xl font-semibold'>{time}</h1>
                        <h4 className='text-xl'>{currentDay + ' ' + fullDate}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LockPage

const LoginFormLock = ({ login }: { login: boolean }) => {
    const [error, setError] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const { setUser, setLock }: UserStoreTypes = useStore(userStore)
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (inputRef && login) inputRef.current?.focus()
    }, [login])

    const loginHandler = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (inputValue) {
            if (inputValue === '1234') {
                setError(false)
                setUser(true)
                setLock(false)
            } else {
                setError(true)
                setInputValue('')
                setTimeout(() => {
                    setError(false)
                }, 1500)
            }
        }
    }
    return (
        <div className={twMerge('flex flex-col items-center gap-2.5 text-white scale-0 duration-500 origin-bottom', login && 'scale-1')}>
            <Image className='rounded-full' src={linuxImage} width={120} height={120} alt='Profile' />
            <h1 className='text-lg font-medium text-white'>MD Maruf Hossain</h1>
            <form onSubmit={loginHandler} className='flex gap-2'>
                <input ref={inputRef} autoFocus value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="password" placeholder='Password' className={twMerge('p-2 pl-2.5 w-60 h-8 rounded-sm bg-[#ffffff1f] outline-none text-sm', error && 'shake-animation')} />
            </form>
            {
                error && <p className='text-xs text-[#8a8a8a]'>Password authentication error, please try again.</p>
            }
        </div>
    )
}