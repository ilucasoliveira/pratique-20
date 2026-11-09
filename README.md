# Em dia — To-do List com Recoil

Exercício de gerenciamento de estado global com React, Vite e Recoil. Interface responsiva em português, com navegação por teclado, filtros e indicadores de progresso.

## Executar

Instale o Node.js 22.12 ou superior. Dentro da pasta extraída:

```bash
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite no terminal.

```bash
npm test          # testes de interação
npm run build    # gera dist/
npm run preview  # visualiza o build localmente
```

## Funcionalidades

- Adicionar tarefas pelo botão ou pela tecla Enter.
- Recusar tarefas vazias ou compostas apenas por espaços.
- Marcar e desmarcar a conclusão.
- Remover individualmente, inclusive quando os títulos são iguais.
- Filtrar por todas, pendentes e concluídas.
- Exibir contagem e percentual concluído.
- Usar em telas pequenas e grandes.

Os dados ficam em memória e são apagados ao recarregar. Não há backend nem localStorage.

## Organização e conceitos

| Arquivo | Responsabilidade |
| --- | --- |
| `src/main.jsx` | Envolve a aplicação em `RecoilRoot` |
| `src/atoms/tasksAtom.js` | Guarda a lista global, inicialmente vazia |
| `src/atoms/filterAtom.js` | Guarda o filtro global: all, pending ou completed |
| `src/selectors/filteredTasksSelector.js` | Lê os dois átomos com get e deriva a lista filtrada |
| `src/components/TaskForm.jsx` | Adiciona tarefas com atualização funcional |
| `src/components/TaskFilter.jsx` | Lê e atualiza o filtro usando useRecoilState |
| `src/components/TaskList.jsx` | Consome o seletor com useRecoilValue |
| `src/components/TaskItem.jsx` | Alterna conclusão e remove pelo ID |
| `src/components/TaskSummary.jsx` | Consome a lista global para mostrar o resumo |
| `src/tests/App.test.jsx` | Testa o fluxo integrado das ações e filtros |

Cada tarefa possui `{ id, title, completed }`. O ID é gerado com `crypto.randomUUID()`, disponível em localhost ou HTTPS. As atualizações usam map/filter e cópias, sem mutar o estado original. O texto ainda não enviado e a mensagem de validação pertencem somente ao formulário e usam useState; lista e filtro pertencem ao Recoil. Componentes que apenas escrevem usam useSetRecoilState para evitar assinatura desnecessária da lista.

## Versões

React e React DOM estão fixados em 18.3.1, e Recoil em 0.7.7. Mantenha essas versões ao reproduzir o exercício. O repositório oficial do Recoil foi arquivado em 1º de janeiro de 2025; ele foi usado aqui por ser requisito da atividade. O package-lock.json registra as versões instaladas.

Referências: [RecoilRoot](https://recoiljs.org/docs/api-reference/core/RecoilRoot/), [conceitos](https://recoiljs.org/docs/introduction/core-concepts/) e [repositório oficial](https://github.com/facebookexperimental/Recoil).

## Publicar no GitHub

1. Na sua conta, crie um repositório chamado `todo-recoil`, com visibilidade **Public**. Deixe-o vazio, sem criar README ou .gitignore pelo GitHub.
2. Abra o terminal na pasta deste projeto e execute:

```bash
git init
git add .
git commit -m "Implementa lista de tarefas com React e Recoil"
git branch -M main
git remote add origin https://github.com/ilucasoliveira/todo-recoil.git
git push -u origin main
```

A URL acima considera seu usuário `ilucasoliveira`; ajuste se usar outra conta ou nome de repositório. Se aparecer `remote origin already exists`, confira `git remote -v` e atualize com:

```bash
git remote set-url origin https://github.com/ilucasoliveira/todo-recoil.git
git push -u origin main
```

A publicação exige sua autenticação no GitHub. Depois de publicar, entregue o link do repositório público. Este ZIP não publica automaticamente o projeto.

## Conferência manual

Adicione duas tarefas, conclua uma, verifique os três filtros, desmarque a tarefa concluída e remova ambas. Tente enviar apenas espaços. Confira a interface em 375 px e em desktop. Recarregue para confirmar que a lista reinicia vazia.
