import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageLayout from '../../layouts/PageLayout';

import { useAuth } from '../../features/auth';
import useNotification from '../../hooks/useNotification';

const AccountLogout = () => {
  const { user, logout, authStatus } = useAuth();
  const { notification, showNotification } = useNotification();

  const redirect = useNavigate();

  const logoutButtonPressed = async () => {
    const result = await logout();
    if (result) {
      showNotification('Logged out', 'You have been logged out', 'success');
      redirect('/login');
    } else {
      showNotification('Failed to log out', 'Failed to log out', 'error');
    }
  };

  return (
    <PageLayout
      notification={notification}
      requiresLogin={true}
      className={user?.preferences.general.theme == 'dark' ? 'dark' : ''}
    >
      <div className='dark:bg-gray-800 bg-slate-200 min-h-screen dark:text-white text-slate-700 bg-gradient-to-bl from-blue-400 to-purple-400 dark:from-gray-500 dark:to-gray-700'>
        <div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-gray-700 bg-slate-100 shadow-md rounded-md p-4 w-11/12 md:w-4/12'>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -50 },
                showing: { opacity: 1, y: 0 },
              }}
              initial='hidden'
              animate='showing'
              transition={{ duration: 0.5 }}
            >
              <h1 className='text-2xl font-semibold mb-2'>Are you sure you want to log out?</h1>

              <p>You will be logged out of your account and will have to log back in to access your account.</p>

              <button
                onClick={logoutButtonPressed}
                disabled={authStatus !== 'authenticated'}
                className='w-full bg-red-400 text-white rounded-md p-2 mt-4 hover:brightness-125 transition-all'
              >
                Logout
              </button>

              <Link
                to='/home'
                className='text-center w-full block dark:bg-gray-500 bg-slate-500 text-white rounded-md p-2 mt-4 hover:brightness-125 transition-all'
              >
                Cancel
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AccountLogout;
