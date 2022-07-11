import { Link, useLocation } from 'solid-app-router';
import { Show } from 'solid-js';
import { Divider } from './Divider';

const navs = [
  { href: '/', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
];

export const NavigationBar = () => {
  const location = useLocation();
  return (
    <>
      <nav
        class="flex flex-row justify-between w-full text-slate-200 pl-4 pr-4 max-w-5xl h-full m-auto pt-3"
        role="menubar"
      >
        <div class="flex gap-5 justify-between" role="none">
          <Show
            when={location.pathname === '/'}
            fallback={
              <Link href="/" role="menuitem">
                Blog
              </Link>
            }
          >
            <Link href="/" role="menuitem" class="font-bold" aria-selected>
              Blog
            </Link>
          </Show>
          <Show
            when={location.pathname === '/projects'}
            fallback={
              <Link href="/projects" role="menuitem">
                Projects
              </Link>
            }
          >
            <Link
              href="/projects"
              role="menuitem"
              class="font-bold"
              aria-selected
            >
              Projects
            </Link>
          </Show>
        </div>
        <div role="none">
          <a href="mailto:oliverli@kth.se" role="menuitem">
            Contact me
          </a>
        </div>
      </nav>
      <Divider />
    </>
  );
};
