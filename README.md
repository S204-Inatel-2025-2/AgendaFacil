# Agenda Fácil – Sistema de Agendamento Online

O **Agenda Fácil** é um sistema web desenvolvido para facilitar o agendamento de serviços de forma prática, rápida e intuitiva. A plataforma permite que usuários realizem agendamentos online e que administradores gerenciem horários, serviços e clientes.

---

## Tecnologias Utilizadas

### **Frontend**
- **Tailwind CSS** — utilizado para estilização moderna, responsiva e eficiente.

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

# Projeto PostgreSQL + pgAdmin Docker

Este projeto usa Docker para rodar **PostgreSQL** e **pgAdmin 4**, permitindo que o grupo trabalhe com o mesmo banco (via backup/importação) sem precisar compartilhar a pasta de dados diretamente.

---
## Comandos Docker básicos

### Subir os containers

```bash
docker-compose up -d
```

### Parar os containers

```bash
docker-compose down
```

### Verificar containers rodando

```bash
docker ps
```
---
## Criar backup do banco (export)

Sempre que precisar compartilhar os dados com o grupo:

```bash
docker exec -t postgres_container pg_dump -U usuario meu_banco > backup.sql
```

* Isso gera o arquivo `backup.sql` na máquina local.
---
## Restaurar backup do banco (import)

No outro computador do grupo:

```bash
docker exec -i postgres_container psql -U usuario meu_banco < backup.sql
```

* Isso popula o banco com os dados do backup.
