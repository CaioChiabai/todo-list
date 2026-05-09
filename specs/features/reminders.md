# Feature Spec: Lembretes

## 1. Objetivo

Permitir ao usuário configurar lembretes visuais para tarefas, destacando-as na interface quando a data/hora definida for atingida.

---

## 2. Requisitos Funcionais

### RF-01: Configuração do Lembrete

- Ao criar ou editar uma tarefa, o usuário pode definir uma data/hora de lembrete
- O campo é do tipo `datetime-local` no HTML
- O lembrete é opcional — tarefas podem existir sem lembrete

### RF-02: Indicador Visual de Lembrete

- Tarefas que possuem lembrete configurado exibem um ícone de sino (🔔)
- Tarefas com lembrete **vencido** (data/hora já passou) são destacadas visualmente:
  - Borda pulsante colorida (animação CSS)
  - Badge "Lembrete!" em destaque
  - Card com background diferenciado

### RF-03: Verificação de Lembretes (Polling)

- O frontend faz polling a cada 30 segundos no endpoint `GET /api/tasks/reminders`
- O endpoint retorna tarefas cujo `reminderDate` é menor ou igual ao momento atual
- O frontend atualiza a UI para destacar essas tarefas

### RF-04: Limpar Lembrete

- O usuário pode marcar a tarefa como concluída para "desativar" o lembrete
- Tarefas concluídas não aparecem nos lembretes pendentes

---

## 3. Requisitos Não-Funcionais

- O polling não deve impactar a performance (intervalo mínimo de 30 segundos)
- As animações de destaque devem ser suaves e não intrusivas
- O sistema deve funcionar em qualquer navegador moderno

---

## 4. Critérios de Aceitação

- [ ] Usuário cria tarefa com lembrete para daqui 1 minuto → após 1 minuto, a tarefa é destacada
- [ ] Tarefas com lembrete exibem ícone de sino
- [ ] Tarefas com lembrete vencido têm visual diferenciado (borda pulsante)
- [ ] Marcar tarefa como concluída remove o destaque de lembrete
- [ ] Tarefas sem lembrete não são afetadas pelo sistema de lembretes
