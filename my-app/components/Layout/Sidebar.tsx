import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-dark-red text-white w-64 p-4">
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/templates">Templates</Link></li>
        <li><Link href="/blogs">Blogposts Feed</Link></li>
        <li><Link href="/my-blogs">My Blogposts</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
