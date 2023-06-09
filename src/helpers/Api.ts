import axios, {AxiosResponse} from 'axios';
import { Task, TaskStatus } from '../App.tsx';

export async function callTasksApi(
    config: TaskApiArgs | CallApiArgsId | TaskApiArgsData
): Promise<Task> {
    const { method } = config;
    const requestConfig: {
        method: string;
        url: string;
        data?: Task | TaskStatus;
        id?: number;
    } = {
        method,
        url: `http://localhost:3000/api/v1/tasks/`,
    };

    if(method !== 'post'){
        requestConfig.url += config.id;
    }

    if (!['get', 'delete'].includes(method)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        requestConfig.data = config.data;
    }

    try {
        const response: AxiosResponse<Task> = await axios(requestConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function callOperationsApi(
    config: OperationApiArgs | OperationApiArgsData | CallApiArgsId
): Promise<Operation> {
    const { method} = config;
    const requestConfig: {
        method: string;
        url: string;
        data?: Operation;
        id?: number;
    } = {
        method,
        url: `http://localhost:3000/api/v1/operations/`,

    };
        if(method !== 'post'){
            requestConfig.url += config.id;
    }

    if (!['get', 'delete'].includes(method)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        requestConfig.data = config.data;
    }

    try {
        const response: AxiosResponse<Operation> = await axios(requestConfig);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export interface Operation {
    id: number;
    description: string;
    addedDate: Date;
    spentTime: number;
    taskId: number;
}

type CallApiArgs = {
    method: 'post';
};

type TaskApiArgs = CallApiArgs & {
    data: Omit<Task, 'id' | "operations">
}

type OperationApiArgs = CallApiArgs & {
    data: Omit<Operation, 'id'>
}

type CallApiArgsId = {
    method: 'get' | 'delete';
    id: number;
};

type CallApiArgsData = {
    method: 'patch' | 'put';
    id: number;
};

type TaskApiArgsData = CallApiArgsData & {
    data: Omit<Task, 'id' | "operations"> | TaskStatus;
}

type OperationApiArgsData = CallApiArgsData & {
    data: Omit<Operation, 'id'>;
}


export async function getTasksApi(): Promise<Task[]> {
    const response = await axios.get<Task[]>(
        `http://localhost:3000/api/v1/tasks`
    );
    return response.data;
}

export async function getOperationsApi(): Promise<Operation[]> {
    const response = await axios.get<Operation[]>(
        `http://localhost:3000/api/v1/operations`
    );
    return response.data;
}