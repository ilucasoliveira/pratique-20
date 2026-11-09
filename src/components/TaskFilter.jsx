import { useRecoilState } from 'recoil';
import { filterAtom } from '../atoms/filterAtom';
const filters = [['all', 'Todas'], ['pending', 'Pendentes'], ['completed', 'Concluídas']];
export default function TaskFilter() {
  const [filter, setFilter] = useRecoilState(filterAtom);
  return <div className="filters" role="group" aria-label="Filtrar tarefas">{filters.map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div>;
}
