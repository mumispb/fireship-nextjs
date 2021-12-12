import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthContext } from "../contexts/auth";

// Top navbar
export default function Navbar() {
  const { user, username, signOut } = useAuthContext();

  const router = useRouter();

  const userSignOut = () => {
    signOut();
    router.reload();
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <a className="btn-logo">NXT</a>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <button onClick={userSignOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <a className="btn-blue">Write Posts</a>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <a>
                  <Image
                    src={user?.photoURL}
                    alt="user photo"
                    height="50"
                    width="50"
                  />
                </a>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
