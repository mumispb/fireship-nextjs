import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const user = null;
  const username = null;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <a className="btn-left">Feed</a>
          </Link>
        </li>
        {username && (
          <>
            <li>
              <Link href="/admin">
                <a>Escreva</a>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <Image src={user?.photoURL} alt="Alt-text" />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter">
              <a>Entrar</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
