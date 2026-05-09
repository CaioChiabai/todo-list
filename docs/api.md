# API REST

Documentação completa dos endpoints da API.

**Base URL:** `/api`

## Endpoints

### Listar Tarefas

```
GET /api/tasks
```

Retorna todas as tarefas ordenadas por data de criação (mais recentes primeiro).

**Resposta (200):**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Estudar para a prova",
    "description": "Capítulos 3 e 4 do livro",
    "completed": false,
    "createdAt": "2026-05-09T10:00:00.000Z",
    "updatedAt": "2026-05-09T10:00:00.000Z"
  }
]
```

---

### Criar Tarefa

```
POST /api/tasks
```

**Body (JSON):**

| Campo | Tipo | Obrigatório | Descrição |
|:---|:---|:---|:---|
| `title` | string | ✅ Sim | Título da tarefa (max 100 chars) |
| `description` | string | ❌ Não | Descrição da tarefa (max 500 chars) |

**Exemplo:**

```json
{
  "title": "Comprar leite",
  "description": "Leite integral, 2 litros"
}
```

**Resposta (201):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Comprar leite",
  "description": "Leite integral, 2 litros",
  "completed": false,
  "createdAt": "2026-05-09T10:00:00.000Z",
  "updatedAt": "2026-05-09T10:00:00.000Z"
}
```

**Erros:**

| Status | Condição |
|:---|:---|
| 400 | Título ausente ou vazio |
| 400 | Título com mais de 100 caracteres |
| 400 | Descrição com mais de 500 caracteres |

---

### Atualizar Tarefa

```
PUT /api/tasks/:id
```

**Body (JSON):** Qualquer combinação dos campos abaixo.

| Campo | Tipo | Descrição |
|:---|:---|:---|
| `title` | string | Novo título |
| `description` | string | Nova descrição |
| `completed` | boolean | Status de conclusão |

**Exemplo — Marcar como concluída:**

```json
{
  "completed": true
}
```

**Resposta (200):** Tarefa atualizada completa.

**Erros:**

| Status | Condição |
|:---|:---|
| 400 | Dados de validação inválidos |
| 404 | Tarefa não encontrada |

---

### Remover Tarefa

```
DELETE /api/tasks/:id
```

**Resposta (200):**

```json
{
  "message": "Tarefa removida com sucesso."
}
```

**Erros:**

| Status | Condição |
|:---|:---|
| 404 | Tarefa não encontrada |

---

### Health Check

```
GET /api/health
```

Verifica se o servidor está operacional.

**Resposta (200):**

```json
{
  "status": "ok",
  "timestamp": "2026-05-09T10:00:00.000Z",
  "uptime": 3600.5
}
```

## Códigos de Status

| Código | Significado |
|:---|:---|
| 200 | Operação bem-sucedida |
| 201 | Recurso criado com sucesso |
| 400 | Dados inválidos na requisição |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |
