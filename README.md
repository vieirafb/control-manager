## Sobre

Este projeto tem como intenção demonstrar minhas habilidades com lógica programação, padrões de projetos e progressão de aprendizado.

## Instalação
    
Copie o arquivo .env e configure as variáveis conforme desejar ou utiliza a configuração padrão

    cp .env.example .env

Instale as dependências da API 

    docker compose run --rm -u $(id -u):$(id -g) api npm install

Instale as dependências da SPA

    docker compose run --rm -u $(id -u):$(id -g) spa npm install

Inicie o Docker

    docker compose up -d

Pronto! Sua aplicação frontend estará disponível na porta configurada no arquivo .env.  