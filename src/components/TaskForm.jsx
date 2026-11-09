import { useState, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { tasksAtom } from '../atoms/tasksAtom';
export default function TaskForm() {
  // O rascunho do formulário é local; a lista e o filtro são globais.
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const setTasks = useSetRecoilState(tasksAtom);
  const inputRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) { setError('Digite uma tarefa antes de adicionar.'); inputRef.current.focus(); return; }
    const task = { id: crypto.randomUUID(), title: trimmedTitle, completed: false };
    setTasks((current) => [...current, task]);
    setTitle(''); setError(''); inputRef.current.focus();
  }
  return <form onSubmit={handleSubmit} className="task-form">
    <label htmlFor="task-title">Qual é o próximo passo?</label>
    <div className="input-row"><input ref={inputRef} id="task-title" value={title} onChange={(event) => { setTitle(event.target.value); setError(''); }} maxLength={200} placeholder="Ex.: Praticar seletores do Recoil" aria-invalid={Boolean(error)} aria-describedby={error ? 'form-error' : undefined}/><button className="primary" type="submit">+ Adicionar</button></div>
    {error && <p id="form-error" role="alert" className="error">{error}</p>}
  </form>;
}
