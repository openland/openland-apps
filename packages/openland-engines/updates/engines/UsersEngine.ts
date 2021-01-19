import { StoredMap } from './storage/StoredMap';
import { ShortUser } from './../Types';
import { Transaction, Persistence } from './../../persistence/Persistence';

export class UsersEngine {

    private persistence: Persistence;
    private users = new StoredMap<ShortUser>('users');

    constructor(persistence: Persistence) {
        this.persistence = persistence;
    }

    async persistUsers(tx: Transaction, users: ShortUser[]) {
        for (let u of users) {
            this.users.set(tx, u.id, u);
        }
    }

    getUser(id: string): ShortUser {
        return this.users.getSyncOrFail(id);
    }

    private async _preloadUser(tx: Transaction, id: string) {
        return this.users.get(tx, id);
    }

    //
    // Download users
    //

    async loadMissingUsers(src: any): Promise<string[]> {
        let extractedIds = this.extractUsers(src);
        if (extractedIds.length > 0) {
            return await this.persistence.inTx(async (tx) => {
                let missing: string[] = [];
                for (let id of extractedIds) {
                    if (!(await this._preloadUser(tx, id))) {
                        missing.push(id);
                    }
                }
                return missing;
            });
        }
        return [];
    }

    private extractUsers(src: any): string[] {
        let res = new Set<string>();
        this._extractUsers(src, res);
        return Array.from(res);
    }

    private _extractUsers(src: any, res: Set<string>) {
        if (!src) {
            return;
        }
        if (typeof src === 'object') {
            if (src.__typename === 'User' && typeof src.id === 'string') {
                res.add(src.id);
            }
            for (let key of Object.keys(src)) {
                this._extractUsers(src[key], res);
            }
        }
    }
}