import { NextPage } from 'next'
import Image from 'next/image'
import logo2 from '@/images/ubuntu-white.webp'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

const Ubuntu: NextPage<Props> = ({ className = '' }) => {
  return (
    <div className={twMerge('text-white flex gap-2 items-end', className)}>
      <div className='bg-[#ea510e] w-12 h-20 rounded-sm p-2 flex items-end'>
        <Image alt='logo' width={50} height={50} src={logo2} />
      </div>
      <div>
        <h4 className='text-xs'>20 YEARS</h4>
        <h1 className='text-4xl font-medium'>Ubuntu</h1>
      </div>
    </div>
  )
}

export default Ubuntu