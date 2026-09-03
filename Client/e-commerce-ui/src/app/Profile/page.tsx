import { logOutAction } from '@/actions/Auth.actions';
import { auth } from '@/lib/auth'
import React from 'react'
import ToggleTwoStep from '../components/ToggleTwoStep';
import Image from 'next/image';
import { User, Mail, Shield, LogOut, Settings } from 'lucide-react';

async function ProfilePage() {
    const session = await auth();
    
    return (
        <div className='w-full min-h-screen py-8 px-4'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Profile</h1>
                    <p className='text-gray-600'>Manage your account settings and preferences</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Profile Info Card */}
                    <div className='lg:col-span-2 flex flex-col gap-6'>
                        {/* User Information Card */}
                        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6'>
                            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
                                {/* Avatar */}
                                <div className='relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg'>
                                    {session?.user?.image ? (
                                        <Image 
                                            src={session.user.image} 
                                            alt={session.user.name || 'User'} 
                                            fill
                                            className='object-cover'
                                        />
                                    ) : (
                                        <User className='w-12 h-12 text-white' />
                                    )}
                                </div>
                                
                                {/* User Details */}
                                <div className='flex-1 text-center sm:text-left'>
                                    <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-4'>
                                        <h2 className='text-2xl font-bold text-gray-900'>
                                            {session?.user?.name || 'User'}
                                        </h2>
                                        {session?.user?.role && (
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                session.user.role === 'ADMIN' 
                                                    ? 'bg-purple-100 text-purple-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                <Shield className='w-3 h-3 mr-1' />
                                                {session.user.role}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-2 text-gray-600'>
                                            <Mail className='w-4 h-4 text-amber-500' />
                                            <span className='text-sm'>{session?.user?.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Settings Card */}
                        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='p-2 bg-amber-100 rounded-lg'>
                                    <Settings className='w-5 h-5 text-amber-600' />
                                </div>
                                <h3 className='text-xl font-semibold text-gray-900'>Security Settings</h3>
                            </div>
                            <ToggleTwoStep 
                                userId={session?.user.id as string} 
                                isTwoStepEnabled={session?.user.isTwoStepEnabled as boolean} 
                            />
                        </div>
                    </div>

                    {/* Actions Card */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Account Actions</h3>
                            <form action={logOutAction}>
                                <button 
                                    type='submit'
                                    className='w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer shadow-md hover:shadow-lg'
                                >
                                    <LogOut className='w-4 h-4' />
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage