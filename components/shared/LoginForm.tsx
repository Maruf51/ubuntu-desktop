import { userStore } from "@/store/useStore"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { twMerge } from "tailwind-merge"
import { useStore } from "zustand"
import linuxImage from '@/images/linux.png'
import { UserStoreTypes } from "@/types/types"

const LoginForm = ({ clickHandler }: { clickHandler: () => void }) => {
    const [error, setError] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const { setUser }: UserStoreTypes = useStore(userStore)

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
                <input autoFocus value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="password" placeholder='Password' className={twMerge('p-2 pl-2.5 w-56 h-8 rounded-sm bg-[#ffffff1f] outline-none text-sm', error && 'shake-animation')} />
            </form>
            {
                error && <p className='text-xs text-[#8a8a8a]'>Password authentication error, please try again.</p>
            }
        </div>
    )
}

export default LoginForm;