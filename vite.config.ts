import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      // Seto o caminho de quais testes quero que use o environment
      // Que defini para os testes 2E2
      ['src/http/controllers/**', 'prisma'],
    ],
  },
})
