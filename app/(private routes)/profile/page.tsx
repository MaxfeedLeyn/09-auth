import Profile from "@/components/Profile/Profile";
import { Metadata } from "next";

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

export default function ProfilePage() {
  return <Profile />;
}