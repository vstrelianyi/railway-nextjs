'use client';

import Image from 'next/image'

// APOLLO
import { useQuery, useMutation } from '@apollo/client';
import GET_POSTS from '@/apollo/queries/POSTS/GET_POSTS';
import CREATE_POST from '@/apollo/mutations/POSTS/CREATE_POST';
import { useState } from 'react';

type TPost={
	databaseId: string,
	title: string,
}

interface GraphQLResponse {
  posts: {
    nodes: TPost[];
  };
}

export default function Home() {
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const result = useQuery<GraphQLResponse>(GET_POSTS);
	const { loading, error, data } = result;

	const [ input, setInput ] = useState('');

	const [ createPost, ] = useMutation(
    CREATE_POST,
  );

	const handleReloadClick = () => {
		result.refetch();
	}

	const handleAddPostClick = async() => {
		const newPost = await createPost(	{
			variables: {
				title: input
			},
			context: {
				headers: {
					Authorization: `Bearer ${ token }`,
				},
			},
		} );
		result.refetch();
	}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Deployed on Railway.app1
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/next.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={150}
              height={48}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex flex-col">
				<div className="flex flex-col mb-[50px]">
					<h1 className="text-[26px] mb-[20px]">Posts</h1>
					{ loading ? (
						<p>Loading...</p>
					):(
						<>
							<ul className='mb-[20px]'>
								{ data?.posts.nodes.map((post) => (
									<li key={ post.databaseId }>{ post.title }</li>
								)) }
							</ul>
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={handleReloadClick}>Reload</button>
						</>
					) }
				</div>

				<div className="flex flex-col">
					<h1 className="text-[26px] mb-[20px]">Add Post</h1>
					<input type="text" className='text-black mb-[20px] rounded h-[40px] px-[10px]' value={ input } onChange={ ( e )=> setInput( e.target.value )}/>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={handleAddPostClick}>Add</button>
				</div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://docs.railway.app/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Railway Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            NextJS Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://ui.shadcn.com"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
          shadcn/ui
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Beautifully designed components that you can copy and paste into your apps.
          </p>
        </a>

        <a
          href="https://tailwindcss.com/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            TailwindCSS{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Rapidly build modern websites without ever leaving your HTML.
          </p>
        </a>
      </div>
    </main>
  )
}
