# Feature Spec: Cadastrar Tarefas

## 1. Objetivo

Permitir ao usuário criar novas tarefas no sistema TODO List.

---

## 2. Requisitos Funcionais

### RF-01: Formulário de Criação

- O usuário deve visualizar um formulário com os campos:
  - **Título** (obrigatório, máximo 100 caracteres)
  - **Descrição** (opcional, máximo 500 caracteres)
  - **Data/Hora do Lembrete** (opcional, campo datetime-local)

### RF-02: Validação

- O título não pode estar vazio
- O título não pode exceder 100 caracteres
- A descrição não pode exceder 500 caracteres
- A data do lembrete, se fornecida, deve ser no futuro

### RF-03: Persistência

- Ao submeter o formulário, a tarefa deve ser enviada via `POST /api/tasks`
- A tarefa deve receber um ID único (UUID v4)
- Os campos `createdAt` e `updatedAt` devem ser preenchidos automaticamente
- O campo `completed` deve iniciar como `false`

### RF-04: Feedback Visual

- Ao criar com sucesso, a nova tarefa deve aparecer na lista imediatamente
- Uma mensagem de sucesso (toast) deve ser exibida
- O formulário deve ser limpo após a criação
- Se houver erro de validação, o campo inválido deve ser destacado

---

## 3. Requisitos Não-Funcionais

- A criação deve responder em menos de 200ms
- A interface deve ser responsiva (mobile e desktop)
- A animação de adição da tarefa deve ser suave (fade-in)

---

## 4. Critérios de Aceitação

- [ ] Usuário preenche título e clica "Adicionar" → tarefa aparece na lista
- [ ] Usuário tenta adicionar sem título → mensagem de erro é exibida
- [ ] Usuário adiciona tarefa com lembrete → ícone de lembrete aparece na tarefa
- [ ] Após adicionar, o formulário é limpo automaticamente
