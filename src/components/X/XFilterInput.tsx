import * as React from 'react';
import { withRouter } from '../../utils/withRouter';
import * as qs from 'query-string';

export const XFilterInput = withRouter<{ searchKey: string, placeholder?: string, className?: string }>((props) => {
    let s = JSON.parse(JSON.stringify(props.router.query!!));
    var value: string = '';
    if (s[props.searchKey]) {
        value = s[props.searchKey];
    }
    return (
        <input
            className={props.className}
            type="text"
            placeholder={props.placeholder}
            value={value}
            onChange={e => {
                let s2 = JSON.parse(JSON.stringify(props.router.query!!));
                if (e.target.value === '') {
                    delete s2[props.searchKey];
                } else {
                    s2[props.searchKey] = e.target.value;
                }
                let q = qs.stringify(s2);
                if (q !== '') {
                    props.router.replace(props.router.pathname + '?' + q);
                } else {
                    props.router.replace(props.router.pathname);
                }
            }}
        />
    );
});