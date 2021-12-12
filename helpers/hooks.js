import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, storage, googleAuthProvider, auth } from "../lib/firebase";

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  async function signInWithGoogle() {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.error(error);
      alert("Não foi possível realizar o login");
    }
  }

  async function signOut() {
    auth.signOut();
  }

  return [user, username, loading, error, signInWithGoogle, signOut];
}
