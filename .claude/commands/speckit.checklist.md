---
description: Gera um checklist de qualidade/verificação para a feature ativa.
---

O tipo de checklist solicitado está em `$ARGUMENTS` (ex: "segurança", "acessibilidade",
"revisão de API").

Faça:

1. Carregue `spec.md`, `plan.md` e `docs/contracts/` da feature ativa e
   `.specify/templates/checklist-template.md`.
2. Derive itens verificáveis (`CHK-001`...), cada um rastreável a um requisito,
   critério de sucesso ou princípio da constituição.
3. Salve em `docs/specs/checklists/[tipo].md` e relate a contagem de itens.
