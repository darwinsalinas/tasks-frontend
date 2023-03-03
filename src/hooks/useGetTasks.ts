import { useEffect, useState } from "react";
import { getTasks } from '../services/tasks.service';

export const useGetTasks = <T>(initialData: T) => {
    const [tasks, setTasks] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        getTasks()
            .then((tasks) => {
                setTasks(tasks);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return { tasks, isLoading, error, reFetch: getData };
};