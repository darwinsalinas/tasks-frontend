const getValue = (keyName: string, defaultValue: any) => {
    try {
        const value = window.localStorage.getItem(keyName);

        if (value) {
            return JSON.parse(value);
        } else {
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
        }
    } catch (err) {
        return defaultValue;
    }
}

const setValue = (keyName: string, newValue: any) => {
    try {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
        console.log('Error saving to local storage', err);

    }
};

export const storage = { getValue, setValue };