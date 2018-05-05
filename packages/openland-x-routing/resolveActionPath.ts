import { XRouter } from './XRouter';
import * as qs from 'query-string';

export function resolveActionPath(
    props: {
        path?: string | null,
        query?: { field: string, value?: string } | null
    },
    router: XRouter) {
    var destPath: string;
    if (props.path) {
        destPath = props.path;
    } else if (props.query) {
        let s = JSON.parse(JSON.stringify(router.query));
        if (props.query.value) {
            s[props.query.field] = props.query.value;
        } else {
            delete s[props.query.field];
        }
        let q = qs.stringify(s);

        var path = router.path;
        if (path.indexOf('?') >= 0) {
            path = path.split('?', 2)[0];
        }

        if (q !== '') {
            destPath = path + '?' + q;
        } else {
            destPath = path;
        }
    } else {
        destPath = '/';
    }
    return destPath;
}