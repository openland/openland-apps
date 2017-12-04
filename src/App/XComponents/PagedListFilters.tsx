import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from '../Components/Link';
import * as qs from 'query-string';

export function PagedListFilters(props: { title: string, children?: any }) {
    return (
        <div className="col-xs-12 col-lg-3">
            <div className="x-in--title">{props.title}</div>
            {props.children}
        </div>
    );
}

export const PagedListSearch = withRouter<{ searchKey: string }>(props => {
    let s = qs.parse(location.search);
    var value: string = '';
    if (s[props.searchKey]) {
        value = s[props.searchKey];
    }
    return (
        <div className="x-search">
            <form className="x-search--box" method="POST" action="">
                <input
                    className="x-search--input"
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={e => {
                        var s2 = qs.parse(location.search);
                        if (e.target.value === '') {
                            delete s2[props.searchKey];
                        } else {
                            s2[props.searchKey] = e.target.value;
                        }
                        let q = qs.stringify(s2);
                        if (q !== '') {
                            props.history.push(props.match.path + '?' + q);
                        } else {
                            props.history.push(props.match.path);
                        }
                    }}
                />
                <button className="x-search--button" type="submit"><i className="icon-search">{}</i></button>
            </form>
        </div>
    );
});

export function PagedListFilterRadio(props: { title: string, radioKey: string, children?: any }) {
    var childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ radioKey: string }>, { radioKey: props.radioKey });
        } else {
            return child;
        }
    });
    return (
        <div className="x-filter">
            <div className="x-filter--title">{props.title}</div>
            {childrenWithProps}
        </div>
    );
}

export const PagedListFilterRadioItem = withRouter<{ title: string, itemKey?: string, radioKey?: string }>(props => {
    var path = props.match.path;
    var checked = false;
    if (props.radioKey) {
        let s = qs.parse(location.search);
        if (props.itemKey) {
            checked = s[props.radioKey] === props.itemKey;
            s[props.radioKey] = props.itemKey;
        } else {
            checked = s[props.radioKey] === undefined;
            delete s[props.radioKey];
        }
        let q = qs.stringify(s);
        if (q !== '') {
            path = props.match.path + '?' + q;
        } else {
            path = props.match.path;
        }
    }
    return (
        <Link path={path} className={'x-filter--radio' + (checked ? ' is-checked' : '')}>{props.title}</Link>
    );
});