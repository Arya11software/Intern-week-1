import Link from "next/link";

export function Navbar() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/employees" aria-label="Employee system home">
        <span className="brand-icon" aria-hidden="true">E</span>
        <span>People<span className="brand-light">/Ops</span></span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/employees">Directory</Link>
        <Link className="nav-add" href="/employees/create"><span aria-hidden="true">+</span> Add employee</Link>
      </nav>
    </header>
  );
}