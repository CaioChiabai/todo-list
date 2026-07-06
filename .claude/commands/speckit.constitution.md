---
description: Cria ou atualiza a constituição do projeto em .specify/memory/constitution.md.
---

O usuário forneceu (via `$ARGUMENTS`) princípios ou mudanças para a constituição.

Faça:

1. Leia `.specify/memory/constitution.md` (estado atual) e
   `.specify/templates/constitution-template.md`.
2. Para cada princípio, garanta: nome, regra declarativa (MUST/SHOULD) e justificativa.
3. Aplique versionamento semântico:
   - **MAJOR**: remoção/redefinição incompatível de princípios.
   - **MINOR**: novo princípio/seção ou expansão material.
   - **PATCH**: esclarecimentos sem mudança de significado.
4. Atualize o `Sync Impact Report` (comentário HTML no topo) e as datas de
   `Ratified`/`Last Amended`.
5. Propague a mudança para os templates em `.specify/templates/` (em especial o
   `Constitution Check` do `plan-template.md`).
6. Sincronize a cópia publicável em `docs/memory/constitution.md`.
7. Escreva os arquivos e relate a nova versão + arquivos afetados.

Não invente princípios não solicitados; marque lacunas com `TODO`.
