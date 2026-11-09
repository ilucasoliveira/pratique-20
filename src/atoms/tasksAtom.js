import { atom } from 'recoil';
// Fonte única da lista. Cada tarefa contém id, title e completed.
export const tasksAtom = atom({ key: 'tasksAtom', default: [] });
