import { verifyEmail } from '@/actions/verifiyEmail.action';
import React from 'react'
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { VscError } from 'react-icons/vsc';

type props = {
    searchParams: {
        token: string,
        email: string
    }
}

async function page({ searchParams }: props) {
    const { token, email } = searchParams;
    const result = await verifyEmail(token, email)

    return <>
        <div className='text-center  p-5 shadow-lg rounded-lg'>
            {
                result.success ?
                    <div className='flex flex-col justify-center items-center gap-4 '>
                        <GoVerified className='text-8xl text-green-700' />
                        <h1 className='text-green-800 text-3xl'>Email Verified Successfully</h1>
                        <p className='text-green-700'>Your email has been verified. You can now log in to your account.</p>
                    </div>
                    :
                    <div className='flex flex-col justify-center items-center gap-4'>
                        <VscError className='text-8xl text-red-700' />
                        <h1 className='text-red-800 text-3xl'>Error happened</h1>
                        <p className='text-red-700'>Please try again</p>
                    </div>
            }
            <Link href="/login" className='text-blue-700 underline'>Go to Login</Link>
        </div>

    </>
}

export default page