'use client'

import LoadingScreen from '@/components/loading-screen/LoadingScreen'
import Nav from '@/components/shared/Nav'
import Ubuntu from '@/components/shared/Ubuntu'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import linuxImage from '@/images/linux.png'
import { IoIosArrowBack } from "react-icons/io";
import { twMerge } from 'tailwind-merge'
import { useStore } from 'zustand'
import { userStore } from '@/store/useStore'
import { redirect } from 'next/navigation'


interface Props { }

const Page: NextPage<Props> = ({ }) => {
    const [loadingScreen, setLoadingScreen] = useState<boolean>(true)
    const [login, setLogin] = useState(false)
    const { user }: any = useStore(userStore)

    useEffect(() => {
        setTimeout(() => {
            setLoadingScreen(false)
        }, 500)
    }, [])

    return (
        <>
            {
                loadingScreen ? <LoadingScreen /> :
                    <div className='bg-[#1d1d1d] w-full h-full flex flex-col items-center justify-between'>
                        <Nav />
                        {
                            login ? <LoginForm clickHandler={() => setLogin(false)} /> : <LoginSection clickHandler={() => setLogin(true)} />
                        }
                        <Ubuntu className='mb-16' />
                    </div>
            }
        </>
    )
}

export default Page

const LoginSection = ({ clickHandler }: { clickHandler: () => void }) => {
    return (
        <div>
            <div onClick={clickHandler} className='bg-[#ffffff1f] hover:bg-[#515151] duration-300 rounded-md flex p-2 items-center gap-3 text-white w-60 select-none cursor-pointer'>
                <Image className='rounded-full' src={linuxImage} width={40} height={40} alt='Profile' />
                <h1 className='text-sm'>MD Maruf Hossain</h1>
            </div>
            <p className='ml-2 mt-1 text-xs text-[#8a8a8a] hover:underline cursor-pointer inline-block'>Not listed?</p>
        </div>
    )
}

const LoginForm = ({ clickHandler }: { clickHandler: () => void }) => {
    const [error, setError] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const { setUser }: any = useStore(userStore)

    const loginHandler = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (inputValue) {
            if (inputValue === '1234') {
                setError(false)
                setUser(true)
                redirect('/')
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
        <div className='flex flex-col items-center gap-2.5 text-white'>
            <Image className='rounded-full' src={linuxImage} width={120} height={120} alt='Profile' />
            <h1 className='text-lg font-medium text-white'>MD Maruf Hossain</h1>
            <form onSubmit={loginHandler} className='flex gap-2'>
                <IoIosArrowBack onClick={clickHandler} className='bg-[#ffffff1f] hover:bg-[#515151] duration-300 cursor-pointer w-8 h-8 rounded-full p-1.5' />
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="password" placeholder='Password' className={twMerge('p-2 pl-2.5 w-56 h-8 rounded-sm bg-[#ffffff1f] outline-none text-sm', error && 'shake-animation')} />
            </form>
            {
                error && <p className='text-xs text-[#8a8a8a]'>Password authentication error, please try again.</p>
            }
        </div>
    )
}