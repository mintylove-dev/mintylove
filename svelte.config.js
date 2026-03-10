import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    // only need to set the base path if deploying to a sub-url e.g. https://username.github.io/reponame
    // paths: {
    //   base: process.argv.includes('dev') ? undefined : process.env.BASE_PATH,
    // },
  }
};

export default config;
