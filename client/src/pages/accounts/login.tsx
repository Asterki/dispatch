import * as React from 'react';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';

import PageLayout from '../../layouts/PageLayout';

import { useAuth } from '../../features/auth';
import useNotification from '../../hooks/useNotification';

import TFADialog from '../../features/auth/components/TFADialogComponent';
import LoginForm from '../../features/auth/components/LoginFormComponent';

// To be later changed to a translate service
const messages = {
  'invalid-credentials': 'Invalid email/username or password',
  'requires-tfa': 'Two-factor authentication is required',
  'invalid-tfa-code': 'Invalid two-factor authentication code',
};

const AccountLogin = () => {
  const { user, authStatus, login } = useAuth();
  const { notification, showNotification } = useNotification();
  const redirect = useNavigate();

  const [emailOrUsername, setEmailOrUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Dialog State
  const [tfaDialogOpen, setTFADialogOpen] = React.useState(false);

  const [loginLoading, setLoginLoading] = React.useState(false);

  const loginButtonPressed = async (emailOrUsername: string, password: string, tfaCode?: string) => {
    setLoginLoading(true);

    // We avoid sending a request if the data isn't even in the acceptable schema
    const parsedData = z
      .object({
        emailOrUsername: z
          .string()
          .min(3, {
            message: 'Email or username must be at least 3 characters long',
          })
          .max(100, {
            message: 'Email or username must be at most 100 characters long',
          }),
        password: z
          .string()
          .min(8, {
            message: 'Password must be at least 8 characters long',
          })
          .max(100, {
            message: 'Password must be at most 100 characters long',
          }),
        tfaCode: z.string().optional(),
      })
      .safeParse({ emailOrUsername, password, tfaCode });

    if (parsedData.success === false) {
      showNotification('Failed to login', parsedData.error.errors[0].message, 'error');
      setLoginLoading(false);

      return;
    }

    const result = await login(emailOrUsername, password, tfaCode);

    switch (result) {
      case 'success':
        redirect('/');
        break;
      case 'requires-tfa':
        // Since the TFA modal doesn't have access to the LoginForm state, we need to store the email/username and password in the component state
        setEmailOrUsername(emailOrUsername);
        setPassword(password);
        setTFADialogOpen(true);
        break;
      case 'invalid-credentials':
        showNotification('Failed to login', messages['invalid-credentials'], 'error');
        setLoginLoading(false);
        break;
      case 'invalid-tfa-code':
        showNotification('Failed to login', messages['invalid-tfa-code'], 'error');
        setTFADialogOpen(true);
        setLoginLoading(false);
        break;
      default:
        showNotification('Failed to login', 'An unknown error occurred', 'error');
        setLoginLoading(false);
        break;
    }

    setLoginLoading(false);
    setTFADialogOpen(false);
  };

  return (
    <PageLayout notification={notification} className='dark:bg-gray-800 bg-slate-200 min-h-screen dark:text-white text-neutral-700 bg-gradient-to-bl from-blue-400 to-purple-400 dark:from-gray-500 dark:to-gray-700'>
      <TFADialog
        open={tfaDialogOpen}
        onClose={() => setTFADialogOpen(false)}
        onSubmit={(tfaCode) => {
          loginButtonPressed(emailOrUsername, password, tfaCode);
        }}
      />

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-gray-700 bg-white/80 rounded-md shadow-md p-4 w-11/12 md:w-4/12'>
        <LoginForm loginLoading={loginLoading} onSubmit={loginButtonPressed} authStatus={authStatus} user={user} />

        <div className='text-center mt-4 flex gap-2 items-center justify-center'>
          <Link to='/register' className='text-blue-500 hover:underline'>
            Create an account
          </Link>
          <span>or</span>
          <Link to='/forgot-password' className='text-blue-500 hover:underline'>
            Forgot Password
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default AccountLogin;
