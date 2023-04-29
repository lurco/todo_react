import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { callOperationsApi, Operation } from '../helpers/Api.ts';
import { Task } from '../App.tsx';

interface SpendTimeProps {
    operation: Operation;
    setTasks: React.Dispatch<SetStateAction<Task[]>>;
    onCancel: Dispatch<number | null>;
}

export function SpentTimeForm({
    operation,
    setTasks,
    onCancel,
}: SpendTimeProps) {
    const [value, setValue] = useState(0);

    async function handleAddSpendTime(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        await callOperationsApi({
            data: { spentTime: operation.spentTime + value },
            id: operation.id,
            method: 'patch',
        });

        operation.spentTime += value;
        setTasks(prev => [...prev]);
    }

    return (
        <div>
            <form onSubmit={handleAddSpendTime}>
                <input
                    type="number"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
                <button type="submit">Add spend time</button>
                <button type="button" onClick={() => onCancel(null)}>Cancel</button>
            </form>
        </div>
    );
}

export default SpentTimeForm;
