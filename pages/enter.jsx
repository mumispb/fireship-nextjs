import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { firestore } from "../lib/firebase.js";
import { useAuthContext } from "../contexts/auth";

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
          {username ? null : <UsernameForm username={username} user={user} />}
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

function UsernameForm({ username, user }) {
  const [formState, setFormState] = useState({
    formValue: "",
    isValid: false,
    status: "idle",
  });
  const { formValue, isValid, status } = formState;

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  const checkUsername = useMemo(
    () =>
      debounce(async (username) => {
        try {
          if (username.length >= 3) {
            const ref = firestore.doc(`usernames/${username}`);
            const { exists } = await ref.get();
            console.log("Firestore read executed");
            setFormState({
              formValue: username,
              isValid: !exists,
              status: "resolved",
            });
          }
        } catch (error) {
          setFormState({
            formValue: username,
            isValid: false,
            status: "rejeceted",
          });
        }
      }, 500),
    []
  );

  function onChange(e) {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if (val.length < 3) {
      setFormState({
        formValue: val,
        status: "idle",
        isValid: false,
      });
    }
    if (re.test(val)) {
      setFormState({
        formValue: val,
        status: "pending",
        isValid: false,
      });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();
  }

  return (
    !username && (
      <section>
        <h3>Choose username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <button className="btn-green" disabled={!isValid}>
            Escolher
          </button>
          <h3>Debug State</h3>
          <p>Username: {formValue}</p>
          <p>Loading: {status}</p>
          <p>Username valid: {isValid.toString()}</p>
        </form>
        <UsernameMessage formState={formState} />
      </section>
    )
  );
}

function UsernameMessage({ formState: { formValue, isValid, status } }) {
  if (status === "idle") {
    return <p>Please type a valid username</p>;
  }
  if (status === "rejected") {
    return <p>Error</p>;
  }
  if (status === "pending") {
    return <p>Checking...</p>;
  }
  if (isValid) {
    return <p className="text-sucess">{formValue} is available!</p>;
  }
  if (formValue && !isValid) {
    return <p className="text-danger">{formValue} is already taken!</p>;
  }
  return <p>Type a username</p>;
}
