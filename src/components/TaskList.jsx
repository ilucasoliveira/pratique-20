import { useRecoilValue } from 'recoil';
import { filteredTasksSelector } from '../selectors/filteredTasksSelector';
import { filterAtom } from '../atoms/filterAtom';
import TaskItem from './TaskItem';
const messages = { all: ['Um passo de cada vez.', 'Adicione sua primeira tarefa acima para começar.'], pending: ['Tudo em dia por aqui.', 'Você não tem tarefas pendentes.'], completed: ['Cada passo conta.', 'As tarefas concluídas vão aparecer aqui.'] };
export default function TaskList() {
  const tasks = useRecoilValue(filteredTasksSelector);
  const filter = useRecoilValue(filterAtom);
  if (!tasks.length) return <div className="empty" role="status"><span className="empty-icon" aria-hidden="true">✓</span><h3>{messages[filter][0]}</h3><p>{messages[filter][1]}</p></div>;
  return <ul className="task-list" aria-label="Lista de tarefas">{tasks.map((task) => <TaskItem key={task.id} task={task}/>)}</ul>;
}
