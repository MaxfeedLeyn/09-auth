"use client";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";

function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as { email: string; password: string };
      const user = await login(formValues.email, formValues.password);
      setUser(user);
      router.push('/profile');
    } catch (err) {
      setError((err as ApiError).response?.data?.error ??
          (err as ApiError).message ??
        'Oops... some error');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <button type="submit" className={css.submitButton}>
          Sign In
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
}

export default SignInPage;