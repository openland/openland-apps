function get(key: string): any | null {
    let val = localStorage.getItem(key);
    if (val) {
        return JSON.parse(val);
    }
    return null;
}

function set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

const randomKey = () => (Math.random() * Math.pow(2, 55)).toString(16);

interface LockValue {
    expires: number;
    seed: string;
}

const LockSeed = randomKey();

export const tryLock = (key: string, timeout: number) => {
    let value: LockValue | null = get('lock-' + key);
    if (value === null) {
        set('lock-' + key, { expires: Date.now() + timeout, seed: LockSeed });
        return true;
    }

    let lockExpired = value!.expires <= Date.now();
    let sameSeed = value!.seed === LockSeed;

    if (lockExpired || sameSeed) {
        set('lock-' + key, { expires: Date.now() + timeout, seed: LockSeed });
        let val: LockValue = get('lock-' + key);
        return val.seed === LockSeed;
    } else {
        return false;
    }
};

export const releaseLock = (key: string) => {
    let value: LockValue | null = get('lock-' + key);
    if (value && value.seed === LockSeed) {
        localStorage.removeItem('lock-' + key);
    }
};

export const lockStatus = (key: string) => {
    let value: LockValue | null = get('lock-' + key);
    if (!value) {
        return { locked: false, byMe: false };
    }
    return {
        locked: value.expires > Date.now(),
        byMe: value.seed === LockSeed
    };
};