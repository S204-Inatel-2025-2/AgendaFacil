# Agenda Fácil – Sistema de Agendamento Online

O **Agenda Fácil** é um sistema web desenvolvido para facilitar o agendamento de serviços de forma prática, rápida e intuitiva. A plataforma permite que usuários realizem agendamentos online e que administradores gerenciem horários, serviços e clientes.

---

## Tecnologias Utilizadas

### **Frontend**
- **React + Vite** 
- **Tailwind CSS** 

### **Backend**
- **Spring**

### **Banco de Dados**
- **PostgreSQL** — escolhido por sua robustez, confiabilidade e ótimo desempenho.

### **Testes**
- **Cypress** - usado para testar o frontend.
- **Postman** - usado para testar o backend.
---

## Funcionalidades

- Cadastro e autenticação de usuários  
- Visualização de horários disponíveis  
- Agendamento online  


---
# Ambiente Local com Docker

Este projeto utiliza Docker para rodar todo o ambiente de desenvolvimento, incluindo:

- Backend Spring
- Banco PostgreSQL
- pgAdmin 4
- (Opcional) Imagens privadas do GHCR/DockerHub
  
--- 
# Para subir o ambiente localmente usando Docker

Será necessário configurar o login no **Docker Hub** e no **GitHub Container Registry (GHCR)** para baixar as imagens.

---
# Configurar login no Docker Hub
1. Acesse: https://login.docker.com/u/login/

2. Vá em: Accounts → Settings → Personal Access Tokens

3. Clique em **New Access Token** e gere o token.

4. No PowerShell, execute:

```bash
echo SEU_TOKEN | docker login -u SEU_USUARIO --password-stdin
```
---
# Configurar login no GHCR (GitHub Container Registry)

1. Acesse: https://github.com/settings/tokens

2. Gere um token **classic** com permissões:

- `write:packages`
- `read:packages`

3. Faça login:

```bash
echo SEU_TOKEN | docker login ghcr.io -u SEU_USUARIO --password-stdin
```
---
# Baixar e subir os containers
Após configurar os logins:

### Baixar imagens

```bash
docker compose pull
```

### Subir ambiente

```bash
docker compose up -d
```

### Parar o ambiente

```bash
docker compose down
```
---
## Comandos Docker básicos

### Verificar containers rodando

```bash
docker ps
```
---
## Criar backup do banco (export)

```bash
docker exec -t postgres_container pg_dump -U usuario meu_banco > backup.sql
```

* Isso gera o arquivo `backup.sql` na máquina local.
---
## Restaurar backup do banco (import)
```bash
docker exec -i postgres_container psql -U usuario meu_banco < backup.sql
```

* Isso popula o banco com os dados do backup.
---
# CI/CD – GitHub Actions

O repositório possui pipeline automático na branch **main**:

### ✔ Build do Backend e Frontend
### ✔ Build da imagem Docker  
### ✔ Push da imagem no GHCR 
### ✔ Testes automáticos com Cypress
### ✔ Deploy automático no Render (Api) 
### ✔ Deploy automático no Vercel (frontend)  

Exemplo:

```yaml
 # FRONTEND
      - name: Build e Push do FRONTEND
        run: |
          docker build -t ghcr.io/${GITHUB_REPOSITORY,,}/frontend:${GITHUB_SHA} ./frontend
          docker push ghcr.io/${GITHUB_REPOSITORY,,}/frontend:${GITHUB_SHA}
          docker tag ghcr.io/${GITHUB_REPOSITORY,,}/frontend:${GITHUB_SHA} ghcr.io/${GITHUB_REPOSITORY,,}/frontend:latest
          docker push ghcr.io/${GITHUB_REPOSITORY,,}/frontend:latest

      # BACKEND
      - name: Build e Push do BACKEND
        run: |
          docker build -t ghcr.io/${GITHUB_REPOSITORY,,}/backend:${GITHUB_SHA} ./backend
          docker push ghcr.io/${GITHUB_REPOSITORY,,}/backend:${GITHUB_SHA}
          docker tag ghcr.io/${GITHUB_REPOSITORY,,}/backend:${GITHUB_SHA} ghcr.io/${GITHUB_REPOSITORY,,}/backend:latest
          docker push ghcr.io/${GITHUB_REPOSITORY,,}/backend:latest
```

---

# Deploy no Render (Backend)

O backend roda automaticamente no Render com:

- Banco PostgreSQL do Render
- Variáveis de ambiente:

```
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
SPRING_JPA_HIBERNATE_DDL_AUTO
PORT
```

O backend usa:

```
server.port=${PORT}
server.servlet.context-path=/api
```

---

# Deploy no Vercel (Frontend)

O frontend é deployado no Vercel.

Deve ter a variável:

```
VITE_API_URL=https://seu-backend.onrender.com/api
```

Deploy automático a cada push na branch main.

---

# Fluxo Completo do CI/CD

1. Desenvolvedor faz push → branch main
	Qualquer alteração enviada para main dispara automaticamente o pipeline.

2. GitHub Actions executa o CI/CD:
	  - Build do backend (Spring Boot)
	  - Build da imagem Docker

3. Publicação da imagem no GitHub Container Registry (GHCR)

4. Execução dos testes de UI (Cypress) no frontend

5.  Render faz o deploy do backend:
	  - Render detecta a nova imagem no GHCR
	  - Atualiza o serviço
	  - Reinicia a aplicação com a versão mais recente

6. Vercel faz deploy do frontend:
	  - Nova versão do frontend é buildada
	  - Variáveis de ambiente são aplicadas
	  - A aplicação é publicada automaticamente

