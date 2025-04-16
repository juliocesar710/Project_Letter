# Estrutura de Pastas do Frontend

O frontend do projeto **Letter** segue uma arquitetura baseada em componentes, com uma organização clara para facilitar a manutenção e escalabilidade do código. Abaixo está a descrição da estrutura de pastas:


## Descrição das Pastas

### `api/`
Contém os arquivos relacionados à comunicação com a API backend:
- **`Auth/`**: Implementa as funções para autenticação e gerenciamento de usuários, como login, registro, atualização e exclusão.
- **`Config/`**: Configuração do cliente Axios para chamadas HTTP.

### `components/`
Contém os componentes reutilizáveis da aplicação:
- **`Auth/`**: Componentes relacionados à autenticação, como formulários de login, registro e edição de perfil.
- **`Profile/`**: Componentes relacionados ao perfil do usuário, como exibição de posts e informações do perfil.
- **`utils/`**: Componentes utilitários, como mensagens de erro e confirmação.

### `pages/`
Contém as páginas principais da aplicação:
- **`AuthPage.jsx`**: Página de autenticação com abas para login e registro.
- **`ProfilePage.jsx`**: Página de perfil do usuário, exibindo informações e posts.

### `routes/`
Gerencia as rotas da aplicação:
- **`AppRoutes.jsx`**: Define as rotas principais da aplicação.
- **`PrivateRoute.jsx`**: Protege rotas que requerem autenticação.
- **`Router.jsx`**: Configura o roteador principal.

### `styles/`
Contém os estilos globais e temas da aplicação:
- **`theme.js`**: Define o tema com cores, espaçamentos e sombras.

### Arquivos Principais
- **`App.jsx`**: Componente raiz que encapsula o roteador e o provedor de tema.
- **`index.css`**: Estilos globais da aplicação.
- **`main.jsx`**: Ponto de entrada da aplicação React.

Essa estrutura modular facilita a separação de responsabilidades e a reutilização de código, tornando o desenvolvimento mais eficiente e organizado.