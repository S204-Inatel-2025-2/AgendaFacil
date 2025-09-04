# README - Projeto PostgreSQL + pgAdmin Docker

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
