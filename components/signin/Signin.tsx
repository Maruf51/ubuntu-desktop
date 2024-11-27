'use client'

import Nav from '@/components/shared/Nav'
import Ubuntu from '@/components/shared/Ubuntu'
import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import linuxImage from '@/images/linux.png'
import LoginForm from '../shared/LoginForm'


const Signin: NextPage = ({ }) => {
    const [login, setLogin] = useState<boolean>(false)

    return (
        <>
            <div className='bg-[#1d1d1d] w-full h-full flex flex-col items-center justify-between'>
                <Nav />
                {
                    login ? <LoginForm clickHandler={() => setLogin(false)} /> : <LoginSection clickHandler={() => setLogin(true)} />
                }
                <Ubuntu className='mb-16' />
            </div>
        </>
    )
}

export default Signin

const LoginSection = ({ clickHandler }: { clickHandler: () => void }) => {
    return (
        <div>
            <button autoFocus onClick={clickHandler} className='bg-[#ffffff1f] hover:bg-[#515151] duration-300 rounded-md flex p-2 items-center gap-3 text-white w-60 select-none cursor-pointer outline-none'>
                <Image className='rounded-full' src={linuxImage} width={40} height={40} alt='Profile' />
                <h1 className='text-sm'>MD Maruf Hossain</h1>
            </button>
            <p className='ml-2 mt-1 text-xs text-[#8a8a8a] hover:underline cursor-pointer inline-block'>Not listed?</p>
        </div>
    )
}
