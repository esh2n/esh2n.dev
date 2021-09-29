import { useRouter } from 'next/router';
import styles from '../styles/header.module.scss';
import Link from 'next/link';
import ExtLink from './ext-link';

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Posts', page: '/posts' },
  { label: 'Scraps', page: '/scraps' },
];

const Header = () => {
  const { pathname } = useRouter();
  const path = `/${pathname.split('/')[1].trim()}`;
  return (
    <header className={styles.header}>
      <ul>
        {navItems.map(({ label, page, link }) => {
          return (
            <li key={label}>
              {page ? (
                <Link href={page}>
                  <a className={path === page ? 'active' : undefined}>{label}</a>
                </Link>
              ) : (
                <ExtLink href={link}>{label}</ExtLink>
              )}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
