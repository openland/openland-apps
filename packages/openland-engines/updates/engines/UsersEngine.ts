import { ShortUser } from './../Types';
import { Transaction, Persistence } from './../../persistence/Persistence';

export class UsersEngine {

    private persistence: Persistence;
    private users = new Map<string, ShortUser>();

    constructor(persistence: Persistence) {
        this.persistence = persistence;
    }

    async persistUsers(tx: Transaction, users: ShortUser[]) {
        for (let u of users) {
            this.users.set(u.id, u);
        }
    }

    async hasUser(tx: Transaction, id: string) {
        return this.users.has(id);
    }

    async getUser(tx: Transaction, id: string): Promise<ShortUser> {
        if (this.users.has(id)) {
            return this.users.get(id)!;
        }

        throw Error('Unable to find user');
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
                    if (!(await this.hasUser(tx, id))) {
                        missing.push(id);
                    }
                }
                return missing;
            });
        }
        return [];
    }

    //
    // Extract users from response
    //

    extractUsers(src: any): string[] {
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