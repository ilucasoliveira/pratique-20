import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import App from '../App';
function setup() { render(<RecoilRoot><App /></RecoilRoot>); return userEvent.setup(); }
async function add(user, title) { await user.type(screen.getByLabelText('Qual é o próximo passo?'), title); await user.click(screen.getByRole('button', { name: '+ Adicionar' })); }
describe('Lista de tarefas', () => {
  it('adiciona, conclui, filtra, reabre e remove tarefas', async () => {
    const user = setup();
    await add(user, '  Estudar Recoil  '); await add(user, 'Praticar React');
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    await user.click(screen.getByRole('checkbox', { name: 'Estudar Recoil' }));
    await user.click(screen.getByRole('button', { name: 'Pendentes', exact: true }));
    expect(screen.queryByRole('checkbox', { name: 'Estudar Recoil' })).not.toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Praticar React' })).not.toBeChecked();
    await user.click(screen.getByRole('button', { name: 'Concluídas', exact: true }));
    expect(screen.getByRole('checkbox', { name: 'Estudar Recoil' })).toBeChecked();
    expect(screen.queryByRole('checkbox', { name: 'Praticar React' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Estudar Recoil' }));
    expect(screen.getByRole('status')).toHaveTextContent('Cada passo conta.');
    await user.click(screen.getByRole('button', { name: 'Todas', exact: true }));
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Remover tarefa: Estudar Recoil' }));
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: 'Remover tarefa: Praticar React' }));
    expect(screen.getByRole('status')).toHaveTextContent('Um passo de cada vez.');
  });
  it('rejeita espaços e permite adicionar com Enter', async () => {
    const user = setup(); await add(user, '   ');
    expect(screen.getByRole('alert')).toHaveTextContent('Digite uma tarefa');
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('Qual é o próximo passo?'), 'Ler documentação{Enter}');
    expect(screen.getByRole('checkbox', { name: 'Ler documentação' })).toBeInTheDocument();
    expect(screen.getByLabelText('Qual é o próximo passo?')).toHaveValue('');
  });
  it('mantém tarefas com nomes iguais independentes', async () => {
    const user = setup(); await add(user, 'Revisar'); await add(user, 'Revisar');
    await user.click(screen.getAllByRole('checkbox')[0]);
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
    await user.click(screen.getAllByRole('button', { name: 'Remover tarefa: Revisar' })[0]);
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
