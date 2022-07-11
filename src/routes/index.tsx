import { For, Show } from 'solid-js';
import { blog } from '~/state/blog';

export default function Home() {
  const [blogPosts] = blog.posts;
  return (
    <main class="w-full pt-3">
      <article class="flex gap-3">
        <div
          class="max-w-[200px] col-span-1 row-span-full flex items-center rounded-3xl overflow-hidden aspect-square"
          role="img"
        >
          <img src="/assets/headshot.jpg" />
        </div>
        <div class="col-start-2 col-end-4 row-span-full text-slate-200">
          <h1 class="text-lg font-bold">Oliver Anteros Linnarsson</h1>
          <p>
            I'm a Swedish software developer located in the Stockholm area.{' '}
            <wbr />
            Keep scrolling to see what I've been up to recently {':)'}
          </p>
        </div>
      </article>
      <ol class="pt-3">
        <For each={blogPosts()}>
          {(post, i) => (
            <li class="list-none relative">
              <span class="absolute w-[2px] h-full bg-[#9901CD] translate-x-3.5 translate-y-2"></span>
              <Show
                when={i() === 0}
                fallback={
                  <span class="w-[30px] h-[30px] absolute border-2  border-[#9901CD] border-solid rounded-full translate-y-[10px] bg-[#2C2C32]"></span>
                }
              >
                <span class="w-[30px] h-[30px] absolute border-2  border-[#9901CD] border-solid rounded-md rotate-45 translate-y-[10px] bg-[#2C2C32]"></span>
              </Show>
              <article class="text-slate-200 p-3 translate-x-3">
                <Show
                  when={i() === 0}
                  fallback={
                    <h2 class="text-lg text-[#9901CD] pl-3">{post.title}</h2>
                  }
                >
                  <h2 class="text-lg text-[#9901CD] pl-4">{post.title}</h2>
                </Show>
                <p>{post.content}</p>
              </article>
            </li>
          )}
        </For>
      </ol> 
    </main>
  );
}
