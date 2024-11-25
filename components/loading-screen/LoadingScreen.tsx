import { NextPage } from 'next'
import Image from 'next/image'
import logo from '@/images/ubuntu.webp'
import { ImSpinner10 } from 'react-icons/im'
import Ubuntu from '../shared/Ubuntu'

interface Props { }

const LoadingScreen: NextPage<Props> = ({ }) => {
    return (
        <div className='flex flex-col justify-end items-center bg-[#000000] w-full h-full gap-[125px] pb-20 select-none'>
            <Image alt='logo' width={100} height={100} src={logo} />
            <div className='text-white w-6 h-6 loading-animation'>
                <ImSpinner10 className='w-full h-full' />
            </div>
            <Ubuntu />
        </div>
    )
}

export default LoadingScreen