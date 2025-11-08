'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';

const EditProfile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('/icon.svg');

  const setUser = useAuthStore((state) => state.setUser);
  const user: User | null = useAuthStore((state) => state.user);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setEmail(user.email ?? '');
      setAvatar(user.avatar);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleExit = () => router.push('/profile');

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const refreshedUser: User = { ...user, username: userName, email, avatar };
      setUser(refreshedUser);
      await updateMe({ username: userName, email });
      handleExit();
    } catch {
      // setError(err);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image src={avatar} alt="User Avatar" width={120} height={120} className={css.avatar} />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={userName}
              className={css.input}
              onChange={handleChange}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleExit}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;