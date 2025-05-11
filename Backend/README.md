# Estrutura de Pastas do Backend

O backend do projeto **Letter** foi desenvolvido utilizando **Node.js**, **Express** e **Prisma** para gerenciamento do banco de dados. Ele segue uma arquitetura modular para facilitar a manutenção, escalabilidade e organização do código.

---

## Estrutura de Pastas

Abaixo está a descrição detalhada da estrutura de pastas e arquivos do backend:

### `prisma/`
Contém os arquivos relacionados ao Prisma:
- **`schema.prisma`**: Define o esquema do banco de dados, incluindo tabelas, relações e tipos de dados.
- **`migrations/`**: Contém os arquivos de migração gerados pelo Prisma para versionamento do banco de dados.
  - **`migration_lock.toml`**: Arquivo de controle para gerenciar o estado das migrações.
  - **`20250409152847_init/`**: Primeira migração que cria as tabelas iniciais.
  - **`20250409153631_table_relation_genres_user/`**: Migração que adiciona relações entre gêneros e usuários.
  - **`20250420132318_add_posts_table/`**: Migração que adiciona a tabela de posts.
  - **`20250426173532_make_optional_fields/`**: Migração que torna alguns campos opcionais.

---

### `src/`
Contém o código-fonte principal do backend.

#### `server.js`
Arquivo principal que inicializa o servidor Express, configura middlewares e define as rotas.

#### `controllers/`
Controladores responsáveis por lidar com as requisições HTTP e chamar os serviços apropriados:
- **`GenresText/`**: Controladores relacionados aos gêneros de texto.
- **`NetWork/`**: Controladores relacionados à rede de amizades.
- **`Posts/`**: Controladores relacionados aos posts.
- **`User/`**: Controladores relacionados aos usuários.
  - **`userDeleteController.js`**: Controlador para deletar usuários.
  - **`userLoginController.js`**: Controlador para login de usuários.
  - **`userRegisterController.js`**: Controlador para registrar novos usuários.
  - **`userUpdateController.js`**: Controlador para atualizar informações de usuários.

#### `middlewares/`
Middlewares que interceptam as requisições para realizar validações ou autenticações:
- **`auth.js`**: Middleware para verificar o token JWT e autenticar o usuário.

#### `repositories/`
Repositórios responsáveis por interagir diretamente com o banco de dados utilizando o Prisma:
- **`GenresText/`**: Repositórios relacionados aos gêneros de texto.
- **`NetWork/`**: Repositórios relacionados à rede de amizades.
- **`Posts/`**: Repositórios relacionados aos posts.
- **`User/`**: Repositórios relacionados aos usuários.
  - **`userDeleteRepository.js`**: Repositório para deletar usuários.
  - **`userLoginRepository.js`**: Repositório para buscar usuários por e-mail.
  - **`userRegisterRepository.js`**: Repositório para criar novos usuários.
  - **`userUpdateRepository.js`**: Repositório para atualizar dados e gêneros dos usuários.

#### `routes/`
Define as rotas da aplicação:
- **`api.js`**: Rotas principais da API.
- **`auth.js`**: Rotas relacionadas à autenticação, como registro, login, atualização e exclusão de usuários.
- **`friendShip.js`**: Rotas relacionadas à rede de amizades.
- **`genreText.js`**: Rotas relacionadas aos gêneros de texto.

#### `services/`
Serviços que implementam a lógica de negócios da aplicação:
- **`userDeleteService.js`**: Serviço para deletar usuários.
- **`userLoginService.js`**: Serviço para autenticar usuários.
- **`userRegisterService.js`**: Serviço para registrar novos usuários.
- **`userUpdateService.js`**: Serviço para atualizar informações de usuários.
- **`postService.js`**: Serviço para gerenciar posts.
- **`genreTextService.js`**: Serviço para gerenciar gêneros de texto.

#### `utils/`
Utilitários e configurações auxiliares:
- **`prismaClient.js`**: Configuração do cliente Prisma para interagir com o banco de dados.
- **`generateTokenJWT.js`**: Função para gerar tokens JWT.
- **`errorHandler.js`**: Função para lidar com erros globais.

#### `tests/`
Contém os testes automatizados para garantir a qualidade do código:
- **`unit/`**: Testes unitários para funções e serviços.
- **`integration/`**: Testes de integração para verificar a interação entre diferentes partes do sistema.

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de código JavaScript no servidor.
- **Express**: Framework para criação de APIs RESTful.
- **Prisma**: ORM para gerenciamento do banco de dados.
- **JWT**: Para autenticação baseada em tokens.
- **Jest**: Para testes automatizados.

---

Essa estrutura modular e detalhada facilita a separação de responsabilidades, tornando o código mais organizado, escalável e de fácil manutenção.