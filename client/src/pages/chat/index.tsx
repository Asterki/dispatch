import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import PageLayout from '../../layouts/PageLayout';

import { useAuth } from '../../features/auth';
import { useContacts } from '../../features/contacts';
import { useMessages } from '../../features/messages';
import useNotification from '../../hooks/useNotification';

const ChatIndex = () => {
  const { user, authStatus, privKey } = useAuth();
  const { notification, showNotification } = useNotification();
  const { getContactProfile, getContactPubKey } = useContacts();
  const { joinRoom, sendMessage, onMessage } = useMessages();

  const redirect = useNavigate();
  const { user_id: contactID } = useParams();

  const [contact, setContact] = React.useState<{
    userID: string;
    profile: {
      username: string;
      avatar: string;
      imageID: string;
      website: string;
      bio: string;
    };
  } | null>(null);

  const [roomID, setRoomID] = React.useState<string | null>(null);
  const [contactPubKey, setContactPubKey] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [messages, setMessages] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (contactID === undefined) return redirect('/home');
    if (authStatus !== 'authenticated') return;

    (async () => {
      // Fetch contact
      const result = await getContactProfile(contactID);
      if (result === null) return redirect('/home');
      if (result.status !== 'success') return redirect('/home'); // TODO: Handle for blocked etc
      setContact(result.contact!);

      const roomName = joinRoom(user!.userID, result.contact!.userID);
      setRoomID(roomName);

      // Fetch contact's public key
      const pubKey = await getContactPubKey(result.contact!.userID);
      if (!pubKey) return redirect('/home');

      setContactPubKey(pubKey);

      // Add the message listener
      onMessage(privKey as string, (message) => {
        setMessages((prev) => [...prev, message]);
        console.log('New message:', message);
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

  const sendMessageButtonClicked = () => {
    sendMessage(roomID!, contactPubKey!, {
      id: uuidv4(),
      content: inputRef.current!.value,
      createdAt: new Date(Date.now()),
      isRead: false,
      receiverId: contact!.userID,
      senderId: user!.userID,
      updatedAt: new Date(Date.now()),
      attachments: [],
      editHistory: [],
      reactions: [],
    });
  };

  return (
    <PageLayout
      notification={notification}
      requiresLogin={true}
      className={user?.preferences.general.theme == 'dark' ? 'dark' : ''}
    >
      {user && authStatus == 'authenticated' && contact && (
        <div className='dark:bg-gray-800 bg-slate-200 min-h-screen dark:text-white text-neutral-700'>
          <div className='py-20 flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-2 justify-center md:w-7/12 w-11/12 h-[calc(100vh-7rem)]'>
              <div className=' dark:bg-gray-700 bg-slate-100 rounded-md shadow-md p-4'>
                <div className='flex items-center'>
                  <img src={`https://placehold.co/300`} alt='avatar' className='w-8 h-8 rounded-full' />
                  <h1 className='ml-2 text-lg font-semibold'>{contact.profile.username}</h1>
                </div>
              </div>

              <div className='mt-2 rounded-md shadow-md p-4 dark:bg-gray-700 bg-slate-100 h-[calc(100%-3rem)] relative'>
                <div className='flex flex-col gap-2 overflow-y-scroll pb-4 min-h-[calc(100%-3.5rem)] px-4 shadow-md'>
                  
                </div>

                <div className='flex items-center w-full justify-center gap-2'>
                  <input
                    type='text'
                    ref={inputRef}
                    className='w-full rounded-md p-2 dark:bg-gray-800 bg-slate-200 outline-none border-2 dark:border-gray-800 transition-all border-slate-200 dark:focus:border-blue-400'
                    placeholder='Type a message...'
                  />
                  <button className='bg-blue-400 rounded-md p-2 w-2/12 text-white' onClick={sendMessageButtonClicked}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ChatIndex;
