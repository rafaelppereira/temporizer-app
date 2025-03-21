export function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Comece editando&nbsp;
          <code className="font-mono font-bold">src/pages/home.tsx</code>
        </p>
      </div>

      <div className="before:bg-gradient-radial after:bg-gradient-conic relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <img
          className="pointer-events-none relative size-52 select-none dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert lg:size-96"
          src="/next.svg"
          alt="Next.js Logo"
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>União</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A palavra união carrega consigo uma profundidade que transcende sua
            aparente simplicidade e traz a clareza do que queremos.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>Equipe</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A palavra equipe evoca a imagem de pessoas trabalhando juntas em
            harmonia, cada uma contribuindo com suas habilidades únicas para
            alcançar um objetivo comum.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold`}>Colaboração</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            A colaboração é a arte de unir forças em prol de um objetivo comum.
            Quando pessoas compartilham conhecimentos, habilidades e recursos.
          </p>
        </div>
      </div>
    </main>
  )
}
