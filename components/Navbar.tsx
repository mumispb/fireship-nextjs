import Link from "next/link";

export default function Navbar() {
  const user = true;
  const username = true;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-left">Feed</button>
          </Link>
        </li>
        {username && (
          <>
            <li>
              <Link href="/admin">
                <button>Escreva</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter">
              <button>Entrar</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
