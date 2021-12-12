import { signInWithPopup } from "@firebase/auth";
import { firebaseAuth, googleAuthProvider } from "../lib/firebase.js";
import { useAuthContext } from "./contexts/auth";

export default function EnterPage() {
  const { user, username, signIn, signOut } = useAuthContext();

  return (
    <main>
      {user ? (
        <>
          <div>
            <h3>Hello, {user.displayName}!</h3>
            <SignOutButton signOut={signOut} />
          </div>
          {username ? null : <UsernameForm />}
        </>
      ) : (
        <SignInButton signIn={signIn} />
      )}
    </main>
  );
}

function SignInButton({ signIn }) {
  return (
    <button className="btn-google" onClick={signIn}>
      Entrar
    </button>
  );
}

function SignOutButton({ signOut }) {
  return <button onClick={signOut}>Sair</button>;
}

function UsernameForm() {
  return <div>form</div>;
}
