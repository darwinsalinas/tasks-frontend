import { useState } from "react";
import { storage } from "../helpers/local-storage.helper";

export const useLocalStorage = (keyName: string, defaultValue: any) => {
    const [storedValue, setStoredValue] = useState(storage.getValue(keyName, defaultValue));

    const setValue = (newValue: any) => {
        storage.setValue(keyName, newValue);
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};