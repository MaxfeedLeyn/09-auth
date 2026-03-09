import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
function AuthNavigation() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <>
      {isAuthenticated && user && (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user.email}</p>
            <button className={css.logoutButton}>Logout</button>
          </li>
        </>
      )}

      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.navigationLink}>
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/sign-up" className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}

export default AuthNavigation;
