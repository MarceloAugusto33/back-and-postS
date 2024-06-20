# PostS Back-End

PostS é uma aplicação full stack que funciona como uma rede social onde usuários podem se cadastrar, autenticar e interagir com posts. A plataforma permite a criação, edição e exclusão de postagens, e inclui funcionalidades de visualização de perfis e posts de outros usuários. Também implementei um sistema de autenticação seguro e uma interface de usuário intuitiva, proporcionando uma experiência completa e segura para os usuários.

## Funcionalidades

- **Autenticação de Usuário**: Sistema de registro e login utilizando JWT para autenticação.
- **Postagens**: Usuários podem criar, editar, deletar e visualizar postagens.
- **Perfis de Usuário**: Visualização de posts pessoais e de outros usuários.
- **Interação Social**: Funcionalidades similares a uma rede social para interação entre usuários.

## Tecnologias Utilizadas

### Back-End
- **Node.js**: Plataforma de desenvolvimento server-side.
- **Prisma**: ORM para banco de dados.
- **Docker**: Contêiner para instanciar o banco de dados PostgreSQL.
- **TypeScript**: Linguagem de programação para tipagem estática.

### Front-End
- **React**: Biblioteca para construção de interfaces de usuário.
- **Context API**: Gerenciamento de estado para autenticação.
- **Styled-Components**: Estilização de componentes.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- Docker instalado

### Instalação

### Clone o repositorio
```bash
    git clone https://github.com/MarceloAugusto33/back-and-postS.git
```

### Entre na pasta
```bash
    cd back-and-postS
```

### Instale as depencências
```bash
    npm i
```

### Inicie o Docker e suba o banco de dados postgres
```bash
    docker-compose up -d
```

### Inicie o projeto
```bash
    npm run dev
```


