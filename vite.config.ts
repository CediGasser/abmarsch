import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [sveltekit()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
}

export default config
