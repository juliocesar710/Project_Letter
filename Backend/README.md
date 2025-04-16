# Estrutura de Pastas do Backend

O backend do projeto **Letter** foi desenvolvido utilizando **Node.js**, **Express** e **Prisma** para gerenciamento do banco de dados. Abaixo está a descrição da estrutura de pastas e arquivos:


## Descrição das Pastas

### `controllers/`
Contém os controladores responsáveis por lidar com as requisições HTTP e chamar os serviços apropriados:
- **`userDeleteController.js`**: Controlador para deletar usuários.
- **`userLoginController.js`**: Controlador para login de usuários.
- **`userRegisterController.js`**: Controlador para registrar novos usuários.
- **`userUpdateController.js`**: Controlador para atualizar informações de usuários.

### `middlewares/`
Contém middlewares que interceptam as requisições para realizar validações ou autenticações:
- **`auth.js`**: Middleware para verificar o token JWT e autenticar o usuário.

### `repositories/`
Contém os repositórios responsáveis por interagir diretamente com o banco de dados utilizando o Prisma:
- **`userDeleteRepository.js`**: Repositório para deletar usuários.
- **`userLoginRepository.js`**: Repositório para buscar usuários por e-mail.
- **`userRegisterRepository.js`**: Repositório para criar novos usuários.
- **`userUpdateRepository.js`**: Repositório para atualizar dados e gêneros dos usuários.

### `routes/`
Contém as definições de rotas da aplicação:
- **`auth.js`**: Define as rotas relacionadas à autenticação, como registro, login, atualização e exclusão de usuários.

### `services/`
Contém os serviços que implementam a lógica de negócios da aplicação:
- **`userDeleteService.js`**: Serviço para deletar usuários.
- **`userLoginService.js`**: Serviço para autenticar usuários.
- **`userRegisterService.js`**: Serviço para registrar novos usuários.
- **`userUpdateService.js`**: Serviço para atualizar informações de usuários.

### `utils/`
Contém utilitários e configurações auxiliares:
- **`prismaClient.js`**: Configuração do cliente Prisma para interagir com o banco de dados.
- **`generateTokenJWT.js`**: Função para gerar tokens JWT.

### `server.js`
Arquivo principal que inicializa o servidor Express, configura middlewares e define as rotas.

### `prisma/`
Contém os arquivos relacionados ao Prisma:
- **`schema.prisma`**: Define o esquema do banco de dados.
- **`migrations/`**: Contém os arquivos de migração gerados pelo Prisma.

---

Essa estrutura modular facilita a separação de responsabilidades, tornando o código mais organizado, escalável e de fácil manutenção.