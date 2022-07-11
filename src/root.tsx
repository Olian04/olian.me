// @refresh reload
import { Links, Meta, Routes, Scripts } from 'solid-start/root';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Suspense } from 'solid-js';
import './index.css';
import { NavigationBar } from './components/NavigationBar';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body class="antialiased bg-[#2C2C32] w-full min-h-screen relative">
        <div>
          <NavigationBar />
        </div>
        <div class="max-w-5xl h-full m-auto p-3 pb-10">
          <ErrorBoundary>
            <Suspense>
              <Routes />
            </Suspense>
          </ErrorBoundary>
        </div>
        <footer class="w-full bg-[#25252B] p-1 pl-2 pr-2 text-[#2C2C32] absolute bottom-0">
          <span>Olian.me</span>
          {' - '} <span>Oliver Anteros Linnarsson</span>
        </footer>
        <Scripts />
      </body>
    </html>
  );
}
