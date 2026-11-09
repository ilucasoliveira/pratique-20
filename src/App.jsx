import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
export default function App() {
  return <div className="app"><header className="brand"><span className="brand-mark" aria-hidden="true">✓</span> em dia<span className="brand-note">MENOS RUÍDO. MAIS FOCO.</span></header><main><div className="intro"><p className="eyebrow">SEU ESPAÇO PARA ORGANIZAR</p><h1>Pequenas tarefas.<br/><span>Grandes avanços.</span></h1><p>Organize o que importa e faça uma coisa de cada vez.</p></div><TaskSummary/><section className="workspace" aria-labelledby="list-heading"><TaskForm/><div className="list-toolbar"><h2 id="list-heading">Minhas tarefas</h2><TaskFilter/></div><TaskList/></section><p className="session-note">Sua lista fica disponível nesta sessão. Ao recarregar, você começa de novo.</p></main><footer>Feito com React + Recoil <span>Um passo de cada vez.</span></footer></div>;
}
