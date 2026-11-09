import { useRecoilValue } from 'recoil';
import { tasksAtom } from '../atoms/tasksAtom';
export default function TaskSummary() {
  const tasks = useRecoilValue(tasksAtom);
  const completed = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  return <section className="summary" aria-label="Resumo das tarefas"><div className="stats" aria-live="polite"><p><strong>{tasks.length}</strong><span>Total de tarefas</span></p><p><strong>{tasks.length - completed}</strong><span>Pendentes</span></p><p><strong>{completed}</strong><span>Concluídas</span></p></div><div className="progress-label"><span>Seu progresso</span><strong>{progress}%</strong></div><progress aria-label="Progresso das tarefas" value={progress} max="100"/></section>;
}
