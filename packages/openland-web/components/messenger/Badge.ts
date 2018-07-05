import { backoff } from 'openland-x-utils/timer';

export class Badge {

    items: Promise<any[]> | null = null;

    init = () => {
        this.items = backoff(() => import('favico.js')).then((v) => {
            let els = document.querySelectorAll('link[rel=icon]');
            let res = [];
            for (let i = 0; i < els.length; i++) {
                res.push(new (v as any)({
                    position: 'topright',
                    animation: 'none',
                    element: els.item(i)
                }));
            }
            return res;
        });
    }
    badge = (counter: number) => {
        this.items!!.then((v) => {
            for (let i of v) {
                i.badge(counter);
            }
        });
    }
}