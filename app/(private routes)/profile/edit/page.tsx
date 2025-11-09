'use client'

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useEffect, useState, FormEvent } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser: User = await getMe();
        setUser(currentUser);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setAvatar(currentUser.avatar || '');
      } catch {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [setUser]);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    try {
      await updateMe({ username });
      setUser({ ...user, username });
      router.push('/profile');
    } catch {
      setError('Failed to update username');
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p className={css.error}>{error || 'User not found'}</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatar && (
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}