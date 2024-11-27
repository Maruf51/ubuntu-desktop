'use client'

import { useState } from "react"
import { BellIcon } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { formatDateTime } from "@/functions/functions"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"

export default function NotificationMenu() {
    const { date: currentDate, time } = formatDateTime()
    const [doNotDisturb, setDoNotDisturb] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const newDate = new Date()

    const currentDay = newDate.toLocaleDateString('en-US', { weekday: 'long' });
    const fullDate = newDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (
        <Popover>
            <PopoverTrigger className='text-sm duration-300 hover:bg-[#ffffff1f] px-3 h-full cursor-pointer rounded-full'>
                {
                    `${currentDate} ${time}`
                }
            </PopoverTrigger>
            <PopoverContent className="w-[700px] primary-text bg-[#fafafa] dark:bg-[#1d1d1d] border primary-border rounded-xl p-6 text-white font-medium mt-1 grid grid-cols-5">
                <div className="pt-6 pr-6 space-y-6 flex flex-col col-span-3 border-r secondary-border">
                    <div className="flex flex-col items-center justify-center py-8 secondary-text h-full">
                        <BellIcon className="h-20 w-20 mb-4 stroke-[1.5]" />
                        <div className="text-sm secondary-text">No Notifications</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm primary-text">Do Not Disturb</div>
                        <Switch
                            checked={doNotDisturb}
                            onCheckedChange={setDoNotDisturb}
                        />
                    </div>
                </div>

                <div className="pl-6 col-span-2">
                    <div className="flex justify-between items-center mb-6 secondary-text">
                        <div>
                            <div className="text-sm">{currentDay}</div>
                            <div>{fullDate}</div>
                        </div>
                    </div>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                    <button className="w-full text-sm text-left px-3 py-2.5 border primary-border bg-white dark:bg-[#313131] hover:bg-white dark:hover:bg-[#3b3b3b] mt-3 rounded-lg">
                        Add world clocks...
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}