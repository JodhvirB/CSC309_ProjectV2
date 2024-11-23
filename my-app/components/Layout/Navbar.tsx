import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-dark-red text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/templates">Templates</Link></li>
        <li><Link href="/blogs">Blogposts Feed</Link></li>
        <li><Link href="/my-blogs">My Blogposts</Link></li>
        <li><Link href="/settings">Settings</Link></li>
        <li><button className="bg-dark-blue text-white px-4 py-2 rounded">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;

