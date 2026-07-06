---
description: Executa as tarefas de tasks.md para implementar a feature, respeitando ordem e TDD.
---

Faça:

1. Carregue `docs/specs/tasks.md` (e `plan.md`, `data-model.md`, `docs/contracts/`
   para contexto).
2. Execute as tarefas **na ordem**, respeitando dependências:
   - Setup → Testes → Implementação → Integração → Polish.
   - Escreva os testes primeiro e confirme que falham antes de implementar.
   - Tarefas `[P]` podem ser feitas em conjunto.
3. Após cada fase, rode `npm test` e só avance com a suíte adequada verde.
4. Marque cada tarefa concluída (`[X]`) no `tasks.md`.
5. Respeite a constituição: MVC, sem banco de dados, sem frameworks frontend.
6. Ao final, rode a suíte completa, valide via `quickstart.md` e relate o resultado.
