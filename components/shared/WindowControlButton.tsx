import { NextPage } from 'next'
import { twMerge } from 'tailwind-merge'
import { RxCross2 } from "react-icons/rx";
import { MdMinimize } from "react-icons/md";
import { VscChromeMaximize } from "react-icons/vsc";




interface Props {
    className?: string,
    closeHandler: () => void,
    minMax?: boolean,
    minMaxHandler?: () => void
}

const buttonClassName = 'w-6 h-6 p-[5px] bg-[#9696965d] dark:bg-[#3c3c3c] dark:hover:bg-[#424242] hover:bg-[#96969671] duration-300 rounded-full flex justify-center items-center'

const WindowControlButton: NextPage<Props> = ({ className = '', closeHandler, minMax = true, minMaxHandler }) => {
    return (
        <div className={twMerge('flex items-center gap-2.5', className)}>
            <MdMinimize className={buttonClassName} />
            {
                minMax && <VscChromeMaximize onClick={minMaxHandler && minMaxHandler} className={buttonClassName} />
            }
            <RxCross2 onClick={closeHandler} className={buttonClassName} />
        </div>
    )
}

export default WindowControlButton