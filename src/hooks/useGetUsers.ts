import { useEffect, useState } from "react";
import { getUsers } from '../services/users.service';

export const useGetUsers = <T>(initialData: T) => {
    const [users, setUsers] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        getUsers()
            .then((tasks) => {
                setUsers(tasks);
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

    return { users, isLoading, error, reFetch: getData };
};