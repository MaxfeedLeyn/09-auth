import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";

function AuthNavigation() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <>
      {isAuthenticated && user && (
        <>
          <li className={css.navigationItem}>
            <a href="/profile" className={css.navigationLink}>
              Profile
            </a>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>User email</p>
            <button className={css.logoutButton}>Logout</button>
          </li>
        </>
      )}

      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <a href="/sign-in" className={css.navigationLink}>
              Login
            </a>
          </li>

          <li className={css.navigationItem}>
            <a href="/sign-up" className={css.navigationLink}>
              Sign up
            </a>
          </li>
        </>
      )}
    </>
  );
}

export default AuthNavigation;
