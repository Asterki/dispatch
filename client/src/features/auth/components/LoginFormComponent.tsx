import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';

import { motion } from 'framer-motion';

import { User } from '../../../../../shared/types/models';

interface LoginFormProps {
  onSubmit: (emailOrUsername: string, password: string, tfaCode?: string) => Promise<void>;
  loginLoading: boolean;
  user?: User | null;
  authStatus: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loginLoading, user, authStatus }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const usernameEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const emailOrUsername = usernameEmailRef.current!.value;
    const password = passwordRef.current!.value;
    await onSubmit(emailOrUsername, password);
  };

  return (
    <motion.form
      variants={{
        hidden: { opacity: 0, y: -50 },
        showing: { opacity: 1, y: 0 },
      }}
      initial='hidden'
      animate='showing'
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-col items-center gap-2'>
        <img src='/assets/images/logo-no-background.png' className='w-8' />
        <h1 className='text-xl font-semibold mb-2'>Login to DIMLIM</h1>
      </div>

      <label className='font-bold' htmlFor='email-input'>
        <HiOutlineMail className='inline-block' />
        Email
      </label>
      <div className='relative'>
        <input
          id='email-input'
          type='email'
          placeholder='email@example.com'
          ref={usernameEmailRef}
          className='w-full p-2 dark:bg-gray-800 border-2 dark:border-gray-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-gray-500'
        />
      </div>

      <br />

      <label className='font-bold' htmlFor='password-input'>
        <HiOutlineLockClosed className='inline-block' />
        Password
      </label>
      <div className='relative'>
        <input
          id='password-input'
          autoComplete="new-password"
          type={passwordVisible ? 'text' : 'password'}
          placeholder='••••••••'
          ref={passwordRef}
          className='w-full p-2 dark:bg-gray-800 border-2 dark:border-gray-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-gray-500'
        />

        <button
          className='absolute right-4 top-1/2 -translate-y-1/2'
          type='button'
          onClick={() => {
            setPasswordVisible(!passwordVisible);
          }}
        >
          {passwordVisible ? <HiEye /> : <HiEyeOff />}
        </button>
      </div>

      <div className='mt-8'>
        <button
          type='button'
          disabled={loginLoading}
          onClick={handleSubmit}
          className='w-full p-2 bg-blue-400 hover:bg-purple-400 rounded-md text-white shadow-md shadow-blue-300 hover:shadow-lg hover:shadow-purple-300 transition-all dark:shadow-none dark:hover:shadow-none'
        >
          {(loginLoading) && <FaSpinner className='animate-spin inline-block' />}
          Login
        </button>
      </div>

      {authStatus == 'authenticated' && (
        <div className='mt-4'>
          <span className='font-bold'>Important Notice:</span> You're already logged in as{' '}
          <span className='font-semibold'>{user?.profile.username}</span>, by logging to another account you will be
          logged out from this account.{' '}
          <Link to='/home' className='text-blue-500 hover:underline'>
            Return Home
          </Link>
        </div>
      )}
    </motion.form>
  );
};

export default LoginForm;
