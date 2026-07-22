import { signup } from "@/app/lib/actions";

export default function SignupPage() {
  return (
    <form action={signup} className="flex flex-col gap-4 max-w-sm">
        <input
        name="email"
        placeholder="email"
        required
      />

      <input
        name="username"
        placeholder="Username"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      />

      <button type="submit">
        Create Account
      </button>
    </form>
  );
}