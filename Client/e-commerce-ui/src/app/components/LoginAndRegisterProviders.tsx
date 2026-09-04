import { signIn } from 'next-auth/react'
import React from 'react'

function LoginAndRegisterProviders() {

    type provider = "github" | "google"
    const handleProviders = (provider: provider) => {
        signIn(provider, { redirectTo: "/" });
    }

    return (
        <div className='flex gap-4 items-center justify-center'>
            <button onClick={(e) => { e.preventDefault(); handleProviders("google"); }} className='px-4 py-1 rounded-2xl border border-amber-400 hover:bg-amber-400 transition-all duration-75 cursor-pointer hover:text-white w-full' >Google</button>
            {/* <button onClick={(e) => {e.preventDefault(); handleProviders("github");}} className='px-4 py-2 rounded-2xl border border-amber-400 hover:bg-amber-400 transition-all duration-75 cursor-pointer hover:text-white' >Github</button> */}
        </div>
    )
}

export default LoginAndRegisterProviders