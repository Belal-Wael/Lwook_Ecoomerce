import React from 'react'
import { cn } from '../../../lib/utils';

function customButton({disabled,isRounded}:{disabled:boolean,isRounded:boolean}) {
  return (
    // add Condition
    // <button className={`${disabled ? "bg-gray-400":"bg-amber-300"} ${isRounded&&"rounded-full"}`}>
    //     Hello
    // </button>

    // using CN function
    <button className={cn(
        disabled? "bg-gray-400":"bg-amber-300" ,
        isRounded && "rounded-full"
    )}>
        Hello
    </button>
  )
}

export default customButton