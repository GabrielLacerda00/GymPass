import { Environment } from 'vitest'

export default <Environment>(<unknown>{
  name: 'prisma',
  async setup() {
    console.log('setup')
    return {
      async teardown() {
        console.log('tear')
      },
    }
  },
  transformMode: 'ssr',
})

/**
 * 1 - No package que contem o package.json do environment
 * 2 - Execute "npm link"
 * 3 - O npm cria para esse package como se fosse repositório local de pacotes na máquina
 * 4 - Agora, na raiz do projeto, execute "npm link prisma-environment-prisma(nomeDoPackage criado para o Environment)"
 */
