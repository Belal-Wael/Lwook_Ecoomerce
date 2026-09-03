"use client"
import { toggleTwoStep } from '@/actions/Auth.actions'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

type ToggleTwoStepType = {
    userId: string
    isTwoStepEnabled: boolean
}

function ToggleTwoStep({ userId, isTwoStepEnabled }: ToggleTwoStepType) {

    const [enable, setEnable] = useState(isTwoStepEnabled)

    const handleToggle = async () => {
        await toggleTwoStep(userId, enable).then((res) => {
            if (res.success)
                toast.success(res.message);
            else {
                toast.error(res.message);
            }
        });

    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                <div className='flex-1'>
                    <label htmlFor="twoStep" className='flex items-center gap-3 cursor-pointer'>
                        <div className='relative'>
                            <input 
                                type="checkbox"
                                id='twoStep'
                                checked={enable}
                                onChange={(e) => setEnable(e.target.checked)}
                                className='w-5 h-5 border-2 border-gray-300 text-amber-500 rounded focus:ring-amber-500 focus:ring-2 cursor-pointer transition-all' 
                            />
                        </div>
                        <div className='flex-1'>
                            <span className='text-gray-900 font-medium block'>Two-Step Verification</span>
                            <span className='text-sm text-gray-500 block mt-1'>
                                Add an extra layer of security to your account by requiring a verification code in addition to your password.
                            </span>
                        </div>
                    </label>
                </div>
            </div>
            <button 
                onClick={handleToggle} 
                type='button' 
                className='w-full bg-amber-500 hover:bg-amber-600 transition-colors duration-200 text-white font-semibold py-2.5 px-4 rounded-lg cursor-pointer shadow-md hover:shadow-lg'
            >
                Save Changes
            </button>
        </div>
    )
}

export default ToggleTwoStep