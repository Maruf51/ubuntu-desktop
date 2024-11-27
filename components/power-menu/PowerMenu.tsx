import { NextPage } from 'next'
import { FaPowerOff, FaVolumeUp } from 'react-icons/fa'
import { PiNetworkFill } from 'react-icons/pi'
import { Popover, PopoverTrigger } from '../ui/popover'
import PowerDropdown from '../shared/PowerDropdown'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

const PowerMenu: NextPage = ({ }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
    return (
        <Popover defaultOpen={isPopoverOpen} onOpenChange={(e) => setIsPopoverOpen(e)}>
            <PopoverTrigger className={twMerge('flex justify-center items-center gap-3 px-3 h-full cursor-pointer text-sm duration-300 hover:bg-[#ffffff1f] rounded-full outline-none', isPopoverOpen && 'bg-[#515151] hover:bg-[#515151] ')}>
                <PiNetworkFill />
                <FaVolumeUp />
                <FaPowerOff />
            </PopoverTrigger>
            <PowerDropdown />
        </Popover>
    )
}

export default PowerMenu