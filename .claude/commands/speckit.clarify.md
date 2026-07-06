---
description: Identifica e resolve ambiguidades ([NEEDS CLARIFICATION]) na spec da feature ativa.
---

Faça:

1. Localize a spec da feature ativa (`docs/specs/spec.md` ou `docs/specs/[###-*]/spec.md`).
2. Encontre todos os marcadores `[NEEDS CLARIFICATION: ...]` e ambiguidades
   (requisitos vagos, escopo indefinido, critérios não mensuráveis).
3. Para cada item, faça ao usuário **uma pergunta objetiva por vez** (use
   AskUserQuestion com opções mutuamente exclusivas quando fizer sentido).
4. Ao receber a resposta, atualize a spec: substitua o marcador pela decisão e ajuste
   os requisitos afetados.
5. Registre as decisões numa seção `## Clarifications` com data.
6. Pare quando não restar nenhum `[NEEDS CLARIFICATION]`. Relate o que mudou.
