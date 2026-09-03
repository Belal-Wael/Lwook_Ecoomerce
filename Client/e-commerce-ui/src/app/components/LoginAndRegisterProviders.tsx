import { signIn } from 'next-auth/react'
import React from 'react'

function LoginAndRegisterProviders() {

    type provider = "github" | "google"
    const handleProviders = (provider: provider) => {
        signIn(provider, { redirectTo: "/Profile" });
    }

    return (
        <div className='flex gap-4 items-center justify-center'>
            <button onClick={() => handleProviders("google")} className='px-4 py-2 rounded-2xl border border-amber-400 hover:bg-amber-400 transition-all duration-75 cursor-pointer hover:text-white' >Google</button>
            <button onClick={() => handleProviders("github")} className='px-4 py-2 rounded-2xl border border-amber-400 hover:bg-amber-400 transition-all duration-75 cursor-pointer hover:text-white' >Github</button>
        </div>
    )
}

export default LoginAndRegisterProviders