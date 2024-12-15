import { fileSystemStore } from '@/store/useStore'
import { FileSystemStoreTypes } from '@/types/types'
import { NextPage } from 'next'

const DeleteFromTrash: NextPage = ({ }) => {
    const {setDeleteFromTrashModal, deleteFromTrashModal, deleteFromTrash}: FileSystemStoreTypes = fileSystemStore()

    const emptyTrashHandler = () => {
        deleteFromTrash()
        setDeleteFromTrashModal(null)
    }
    return (
        <div className='fixed animated-opacity top-0 left-0 w-full h-full bg-[#00000062] dark:bg-[#00000062] z-[99999] flex justify-center items-center select-none'>
            <div className='w-[400px] h-auto rounded-lg overflow-hidden animated-modal duration-300 dark:border dark:border-[#3b3b3b] bg-[#fafafa] dark:bg-[#2c2c2c] flex flex-col justify-center items-center text-[#3d3d3d] dark:text-white'>
                <div className='flex flex-col gap-3 p-5 items-center'>
                    <h1 className='text-xl font-bold'>Permanently Delete &quot;{deleteFromTrashModal?.file?.name}&quot;?</h1>
                    <p className='text-sm '>Permanently deleted items cannot be restored</p>
                </div>
                <div className=' w-full h-10 border-t border-[#dedede] dark:border-[#4a4a4a] flex'>
                    <button onClick={() => setDeleteFromTrashModal(null)} className='border-r bg-transparent hover:bg-[#9b9b9b38] dark:hover:bg-[#5e5e5e38] border-[#f2d4d7] dark:border-[#4c3834] w-full h-full flex justify-center items-center font-bold duration-300'>Cancel</button>
                    <button onClick={emptyTrashHandler} className=' w-full h-full flex justify-center items-center font-bold duration-300 text-[#c91d31] dark:text-[#ff7b63] hover:bg-[#c91d3115] dark:hover:bg-[#ff7a6315]'>Empty Trash</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteFromTrash