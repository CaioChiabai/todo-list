# Feature Spec: Remover Tarefas

## 1. Objetivo

Permitir ao usuário remover tarefas existentes do sistema TODO List.

---

## 2. Requisitos Funcionais

### RF-01: Botão de Remoção

- Cada tarefa na lista deve ter um botão/ícone de remoção visível
- O botão deve ser facilmente identificável (ícone de lixeira ou "X")

### RF-02: Confirmação (Opcional)

- Ao clicar no botão de remoção, a tarefa é removida diretamente
- Não há modal de confirmação (design decision: simplicidade > segurança para um TODO simples)

### RF-03: Remoção via API

- A remoção é feita via `DELETE /api/tasks/:id`
- O servidor deve validar que o ID existe
- Se o ID não existir, retornar status 404

### RF-04: Feedback Visual

- Ao remover com sucesso, a tarefa deve desaparecer da lista com animação (fade-out + slide)
- Uma mensagem de sucesso (toast) deve ser exibida
- Se houver erro, uma mensagem de erro deve ser exibida

---

## 3. Requisitos Não-Funcionais

- A remoção deve responder em menos de 200ms
- A animação de remoção deve durar ~300ms

---

## 4. Critérios de Aceitação

- [ ] Usuário clica no botão de remover → tarefa desaparece com animação
- [ ] Tarefa removida não aparece mais ao recarregar a página
- [ ] Tentar remover tarefa inexistente retorna erro 404
- [ ] Mensagem de sucesso é exibida após remoção
