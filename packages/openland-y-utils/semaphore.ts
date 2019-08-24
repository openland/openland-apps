type Handler = (value: true) => void;

interface Acquirer {
    permits: number;
    handler: Handler;
}

function checkValidPermits(permits: number): void {
    if (permits < 0) {
        throw new TypeError('Permits can not be below 0!');
    }
}

/**
 * A counting semaphore based on Java's Concurrent Semaphore.
 */
export class Semaphore {
    private available: number;
    private readonly acquirers: Acquirer[] = [];
    private readonly fair: boolean;

    /**
     * Creates a {@code Semaphore} with no permits
     * and non-fair fairness setting.
     */
    constructor();
    /**
     * Creates a {@code Semaphore} with the given number of
     * permits and non-fair fairness setting.
     *
     * @param permits the initial number of permits available.
     *        This value may be negative, in which case releases
     *        must occur before any acquires will be granted.
     */
    constructor(permits: number);
    /**
     * Creates a {@code Semaphore} with the given number of
     * permits and the given fairness setting.
     *
     * @param permits the initial number of permits available.
     *        This value may be negative, in which case releases
     *        must occur before any acquires will be granted.
     * @param fair {@code true} if this semaphore will guarantee
     *        first-in first-out granting of permits under contention,
     *        else {@code false}
     *
     */
    constructor(permits: number, fair: boolean);
    constructor(permits: number = 0, fair: boolean = false) {
        this.available = permits;
        this.fair = fair;
    }

    /**
     * Returns {@code true} if this semaphore has fairness set true.
     *
     * @return {@code true} if this semaphore has fairness set true
     */
    public isFair(): boolean {
        return this.fair;
    }

    /**
     * Returns the current number of permits available in this semaphore.
     *
     * @return the number of permits available in this semaphore
     */
    public availablePermits(): number {
        return this.available;
    }

    /**
     * Acquires and returns all permits that are immediately available.
     *
     * @return the number of permits acquired
     */
    public drainPermits(): number {
        const available = this.available;
        this.available = 0;
        return available;
    }

    /**
     * Queries whether any threads are waiting to acquire.
     *
     * @return {@code true} if there are other acquirers waiting
     */
    public hasQueuedAcquirers(): boolean {
        return !!this.acquirers.length;
    }

    /**
     * Returns the number of threads waiting to acquire.
     *
     * @return the number of acquirers waiting
     */
    public getQueueLength(): number {
        return this.acquirers.length;
    }

    /**
     * Returns a collection of the awaiting acquirers
     *
     * @return the collection of acquirers
     */
    public getQueuedAcquirers(): Handler[] {
        return this.acquirers.map(({ handler }) => handler);
    }

    /**
     * Acquires a permit from this semaphore, only if one is available at the
     * time of invocation.
     *
     * @return {@code true} if a permit was acquired and {@code false} otherwise
     */
    public tryAcquire(): Promise<boolean>;
    /**
     * Acquires the given number of permits from this semaphore, only
     * if all are available at the time of invocation.
     *
     * @param permits the number of permits to acquire
     * @return {@code true} if the permits were acquired and{@code false} otherwise
     */
    public tryAcquire(permits: number): Promise<boolean>;
    /**
     * Acquires the given number of permits from this semaphore, if all
     * become available within the given waiting time.
     *
     * @param permits the number of permits to acquire
     * @param timeoutMs the maximum time to wait for the permits
     * @return {@code true} if all permits were acquired and {@code false}
     *         if the waiting time elapsed before all permits were acquired
     */
    public tryAcquire(permits: number, timeoutMs: number): Promise<boolean>;

    public async tryAcquire(permits: number = 1, timeoutMs?: number): Promise<boolean> {
        checkValidPermits(permits);

        if (timeoutMs == null) {
            if (this.available >= permits) {
                this.available -= permits;
                return true;
            }
            return false;
        }

        let timerId: any;
        const { promise, acquirer } = this.getAcquirePromise(permits);

        const timeoutPromise = new Promise<false>(resolve => {
            timerId = setTimeout(() => resolve(false), timeoutMs);
        });

        return Promise.race([
            timeoutPromise.then(() => {
                const acquirerIndex = this.acquirers.indexOf(acquirer);
                if (acquirerIndex !== -1) {
                    this.acquirers.splice(acquirerIndex, 1);
                    this._checkSemaphore();
                }
                return false;
            }),
            promise.then(() => {
                clearTimeout(timerId);
                return true;
            })
        ]);
    }

    /**
     * Releases a permit, returning it to the semaphore.
     */
    public release(): void;
    /**
     * Releases the given number of permits, returning them to the semaphore.
     */
    public release(permits: number): void;
    public release(permits: number = 1): void {
        checkValidPermits(permits);

        this.available += permits;

        this._checkSemaphore();
    }

    /**
     * Shrinks the number of available permits by the indicated
     * reduction. This method can be useful in subclasses that use
     * semaphores to track resources that become unavailable. This
     * method differs from {@code acquire} in that it does not block
     * waiting for permits to become available.
     *
     * @param reduction the number of permits to remove
     */
    public reducePermits(reduction: number): void {
        checkValidPermits(reduction);
        this.available -= reduction;
    }

    /**
     * Acquires 1 permit from this semaphore, only if it is available at the time of invocation.
     */
    public acquire(): Promise<void>;
    /**
     * Acquires the given number of permits from this semaphore,
     * only if all are available at the time of invocation.
     */
    public acquire(permits: number): Promise<void>;
    public async acquire(permits: number = 1): Promise<void> {
        checkValidPermits(permits);
        await this.getAcquirePromise(permits).promise;
    }

    /**
     * Checks the semaphore on which acquirers to be called.
     * @internal
     */
    private _checkSemaphore(): void {
        // if no available permits
        if (!this.available) {
            return;
        } else if (!this.acquirers.length) {
            return;
        }

        // check the acquirers
        let len = this.acquirers.length;

        for (let idx = 0; idx < len; idx++) {
            const acquirer = this.acquirers[idx];

            if (acquirer.permits > this.available) {
                // if fairness is true, FIFO rules applied
                if (this.fair) {
                    return;
                }

                continue;
            }

            // reduce the acquirers and availablePermits
            this.acquirers.splice(idx--, 1);
            len--;
            this.available -= acquirer.permits;

            /**
             * for scope handling for non-blocking calling
             */
            function next(handler: any) {
                process.nextTick(function callAcquirer(this: any) {
                    handler.call(this, true);
                });
            }

            (next)(acquirer.handler);
        }
    }

    /** @internal */
    private getAcquirePromise(permits: number): { promise: Promise<true>, acquirer: Acquirer } {
        let acquirer: Acquirer | null = null;

        const promise = new Promise<true>(handler => {
            acquirer = { permits, handler };
            this.acquirers.push(acquirer);

            this._checkSemaphore();
        });

        return { promise, acquirer: acquirer! };
    }
}