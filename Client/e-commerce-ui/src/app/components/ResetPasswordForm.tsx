"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { resetPasswordInputsType, resetPasswordSchema } from '@/utils/types'
import { PropagateLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { ResetPasswordAction } from '@/actions/password.actions'


function ResetPasswordForm() {

    const params = useSearchParams();
    const token = params.get("token");
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<resetPasswordInputsType>({
        resolver: zodResolver(resetPasswordSchema),
    })

    const handelResetPasswordForm = async (formData: resetPasswordInputsType) => {
        try {
            console.log("formData", formData, "token", token);
            await ResetPasswordAction(formData, token as string).then((res) => {
                if (res.success) {
                    toast.success(res.message || "Password has been reset successfully. Please login.")
                } else {
                    toast.error(res.message || "Something went wrong. Please try again later.")
                }
            })
        }
        catch (err) {
            toast.error("Something went wrong. Please try again later.")
        }

    }


    return (
        <form onSubmit={handleSubmit(handelResetPasswordForm)} className='w-full md:w-1/2 mx-auto space-y-4 bg-white p-6 rounded-xl shadow-md shadow-amber-200/50'>
            <h1 className='text-lg md:text-2xl font-bold text-yellow-500'>Reset Password</h1>
            <div>
                <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">New Password</label>
                <input type="password" id="password" {...register("password")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="*******" required />
                {errors.password && <p className='text-red-500 text-xs py-1'>{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="rePassword" className="block mb-2.5 text-sm font-medium text-heading">Confirm Password</label>
                <input type="password" id="rePassword" {...register("rePassword")} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="*******" required />
                {errors.rePassword && <p className='text-red-500 text-xs py-1'>{errors.rePassword.message}</p>}
            </div>
            <button type="submit" className="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-400 font-medium rounded-md text-sm px-5 py-2.5 text-center cursor-pointer">
                {
                    isSubmitting ? <PropagateLoader color='white' className='py-2.5' /> : "Reset Password"
                }
            </button>
            <p className='text-center py-2 text-sm font-medium'>Back to Login <Link className='text-amber-500' href={'/login'}>Login</Link> </p>
        </form>
    )
}

export default ResetPasswordForm