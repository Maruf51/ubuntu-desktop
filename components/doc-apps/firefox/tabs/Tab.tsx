import { BrowserTabTypes } from '@/types/types'
import { NextPage } from 'next'
import Image from 'next/image'
import firefoxIcon from '@/images/app-icons/firefox.png'
import googleIcon from '@/images/app-icons/google.png'

interface Props {
    data: BrowserTabTypes | null
}

const Tab: NextPage<Props> = ({ data }) => {
    return (
        <>
            {
                data?.url ? <iframe src={data.url} title='Google Search' className='w-full h-full'></iframe> : <NewTab />
            }
        </>
    )
}

export default Tab

const NewTab = () => {
    return (
        <form className='z-10 relative w-full h-full flex flex-col justify-center items-center gap-10 bg-[#f9f9fb] dark:bg-[#2b2a33] duration-300'>
            <div className='flex justify-center items-center gap-5'>
                <Image src={firefoxIcon} width={60} height={60} alt='firefox-icon' />
                <h1 className='font-semibold text-3xl' >Firefox</h1>
            </div>
            <label htmlFor='search-google' className='max-w-[50%] w-[500px] h-10 shadow-equal bg-[#ffffff] dark:bg-[#42414d] duration-300 rounded-md overflow-hidden relative flex items-center'>
                <input type="text" className='w-full h-full bg-transparent outline-none text-sm pl-10 pr-3' placeholder='Search with Google or enter address' />
                <Image src={googleIcon} width={40} height={40} alt='firefox-icon' className='absolute left-0 z-10 p-2.5' />
            </label>
        </form>
    )
}