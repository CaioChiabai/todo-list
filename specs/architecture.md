# Arquitetura — TODO List

## 1. Padrão Arquitetural: MVC

A aplicação segue o padrão **Model-View-Controller (MVC)**:

```
┌─────────────────────────────────────────────────┐
│                    CLIENT                        │
│              (Browser / Frontend)                │
│                                                  │
│   ┌──────────────────────────────────────────┐   │
│   │              VIEW (index.html)           │   │
│   │  ┌────────┐ ┌────────┐ ┌─────────────┐  │   │
│   │  │ style  │ │ app.js │ │ Fetch API   │  │   │
│   │  │  .css  │ │        │ │ (HTTP)      │  │   │
│   │  └────────┘ └────────┘ └──────┬──────┘  │   │
│   └───────────────────────────────┼──────────┘   │
└───────────────────────────────────┼──────────────┘
                                    │ HTTP Request
                                    ▼
┌─────────────────────────────────────────────────┐
│                    SERVER                        │
│               (Node.js + Express)                │
│                                                  │
│   ┌──────────────────────────────────────────┐   │
│   │            ROUTES (taskRoutes.js)        │   │
│   │  GET /api/tasks    POST /api/tasks       │   │
│   │  PUT /api/tasks/:id  DELETE /api/tasks/:id│  │
│   └──────────────────┬───────────────────────┘   │
│                      │                           │
│   ┌──────────────────▼───────────────────────┐   │
│   │       CONTROLLER (taskController.js)     │   │
│   │  createTask()  getAllTasks()              │   │
│   │  updateTask()  deleteTask()              │   │
│   │  getReminders()                          │   │
│   └──────────────────┬───────────────────────┘   │
│                      │                           │
│   ┌──────────────────▼───────────────────────┐   │
│   │          MODEL (taskModel.js)            │   │
│   │  In-Memory Array: tasks[]                │   │
│   │  create() findAll() findById()           │   │
│   │  update() delete() findReminders()       │   │
│   └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 2. Fluxo de Dados

### Criar Tarefa (POST /api/tasks)

```
Browser → fetch(POST /api/tasks, body) 
       → Router → Controller.createTask(req, res) 
       → Model.create(data) → tasks.push(newTask) 
       → return newTask → res.status(201).json(task)
       → Browser atualiza a lista
```

### Remover Tarefa (DELETE /api/tasks/:id)

```
Browser → fetch(DELETE /api/tasks/:id) 
       → Router → Controller.deleteTask(req, res) 
       → Model.delete(id) → tasks.splice(index, 1) 
       → return true → res.status(200).json({ message })
       → Browser remove o card da UI
```

### Verificar Lembretes (GET /api/tasks/reminders)

```
Browser polling (30s) → fetch(GET /api/tasks/reminders) 
       → Router → Controller.getReminders(req, res) 
       → Model.findReminders() → filter tasks with due reminders
       → return reminderTasks → res.json(tasks)
       → Browser destaca visualmente as tarefas com lembrete vencido
```

---

## 3. Estrutura de Diretórios

```
src/
├── app.js                    # Entry point - configura Express
├── models/
│   └── taskModel.js          # MODEL - dados em memória
├── controllers/
│   └── taskController.js     # CONTROLLER - lógica de negócio
├── routes/
│   └── taskRoutes.js         # ROUTES - definição de endpoints
└── views/
    ├── index.html            # VIEW - página principal
    ├── css/
    │   └── style.css         # VIEW - estilos
    └── js/
        └── app.js            # VIEW - lógica frontend
```

---

## 4. Contratos de API

### Modelo de Dados

```json
{
  "id": "string (UUID v4)",
  "title": "string (obrigatório, max 100 chars)",
  "description": "string (opcional, max 500 chars)",
  "completed": "boolean (default: false)",
  "reminderDate": "string ISO-8601 | null",
  "createdAt": "string ISO-8601",
  "updatedAt": "string ISO-8601"
}
```

### Endpoints

| Método | Endpoint | Corpo | Resposta | Status |
|:---|:---|:---|:---|:---|
| GET | `/api/tasks` | — | `Task[]` | 200 |
| POST | `/api/tasks` | `{ title, description?, reminderDate? }` | `Task` | 201 |
| PUT | `/api/tasks/:id` | `{ title?, description?, completed?, reminderDate? }` | `Task` | 200 |
| DELETE | `/api/tasks/:id` | — | `{ message }` | 200 |
| GET | `/api/tasks/reminders` | — | `Task[]` | 200 |

### Respostas de Erro

| Status | Significado |
|:---|:---|
| 400 | Dados inválidos (título ausente, formato incorreto) |
| 404 | Tarefa não encontrada |
| 500 | Erro interno do servidor |
