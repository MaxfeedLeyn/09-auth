import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";
import Image from 'next/image';
import Link from "next/link";

export const metadata: Metadata = {
    title: "NoteHub: Profile page",
    description: "NoteHub user profile page",
    openGraph: {
      title: "NoteHub: Profile page",
      description: "NoteHub user profile page",
      url: "https://notehub.com/profile",
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1536,
        height: 1024,
        alt: "NoteHub logo"
      },
    ],
    }
};

export default async function ProfilePage() {
  const user = await getMe();
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
          <Image
            src={`${user?.avatar}`}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}