"use client"
import {  CalendarIcon} from "lucide-react"
import { Card } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format, set } from "date-fns"

function TodoList() {
   const [date, setDate] = useState<Date | undefined>(new Date());
   const [open,setOpen] = useState(false);
   return (
      <div>
         <h1 className="text-lg mb-6 font-medium">TODO List </h1>
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button className="w-full bg-white flex items-center justify-center text-black gap-2  px-2 py-1 text-sm font-medium border rounded-md hover:bg-gray-50">
                <CalendarIcon/>
                {date? format(date,"PPP"): "Select date"}
              </button>
            </PopoverTrigger>
            <PopoverContent>
               <Calendar mode="single" selected={date} onSelect={(date)=>{
                  setDate(date)
                  setOpen(false)
               }} className="mx-auto" />
            </PopoverContent>
         </Popover>
         <ScrollArea className='max-h-[400px] mt-4 overflow-y-auto '>
            {/* List Item */}
            <div className="flex flex-col gap-4 m-2">
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" checked />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" checked />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" checked />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
               <Card className="p-4">
                  <div className="flex items-center gap-4">
                     <Checkbox id="item1" checked />
                     <label htmlFor="item1 " className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                     </label>
                  </div>
               </Card>
            </div>
         </ScrollArea>
      </div>
   )
}

export default TodoList