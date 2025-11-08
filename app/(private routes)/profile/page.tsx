import Link from 'next/link';
import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import { Metadata } from 'next';
import { URL, GRAPH_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'NoteHub | User profile',
  description: 'View personal profile',
  openGraph: {
    title: 'NoteHub | User profile',
    description: 'View personal profile',
    url: `${URL}/profile`,
    siteName: 'NoteHub',
    images: [
      {
        url: GRAPH_URL,
        width: 1200,
        height: 630,
        alt: 'Notebook image',
      },
    ],
  },
};

const Profile = async () => {
  const { avatar, email, username } = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image src={avatar} alt="User Avatar" width={120} height={120} className={css.avatar} />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {email} </p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
