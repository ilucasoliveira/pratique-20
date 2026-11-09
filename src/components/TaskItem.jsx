import { useSetRecoilState } from 'recoil';
import { tasksAtom } from '../atoms/tasksAtom';
export default function TaskItem({ task }) {
  const setTasks = useSetRecoilState(tasksAtom);
  function toggleTask() {
    setTasks((current) => current.map((item) => item.id === task.id ? { ...item, completed: !item.completed } : item));
  }
  function removeTask() { setTasks((current) => current.filter((item) => item.id !== task.id)); }
  return <li className={task.completed ? 'task completed' : 'task'}>
    <label className="task-label"><input type="checkbox" checked={task.completed} onChange={toggleTask}/><span>{task.title}</span></label>
    <button className="remove" type="button" onClick={removeTask} aria-label={`Remover tarefa: ${task.title}`} title="Remover tarefa"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/></svg></button>
  </li>;
}
