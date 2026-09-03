import { Search } from 'lucide-react'
import React from 'react'

function SearchBar() {
  return (
    <div className='hidden sm:flex  items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-2xl'>
         <Search className='w-4 text-gray-500'/>
        <input className='focus:border-0' id='search' placeholder='search...'/>
    </div>
  )
}

export default SearchBar