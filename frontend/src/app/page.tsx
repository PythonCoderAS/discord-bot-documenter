import Image from 'next/image'

export default function Home() {
  return (
          <div>
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                  Documentation for Discord Bots
              </h1>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text4xl">Select Bot</h2>
              <ul className="w-1/4 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"><a href="/pokestarbot">PokestarBot</a></li>
                  <li className="w-full px-4 py-2 rounded-b-lg"><a href="/mangareleasebot">MangaReleaseBot (unmaintained)</a></li>
              </ul>

          </div>
  )
}
