import * as React from 'react';
import { withRouter } from 'next/router';
import { Link } from './Link';
import * as qs from 'query-string';

export function DataList(props: { children?: any }) {
    return (
        <div className="x-in">
            <div className="x-container is-wide">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export class DataListFilters extends React.Component<{ title: string, children?: any }, { isShown: boolean }> {
    constructor(props: { title: string, children?: any }) {
        super(props);

        this.state = {
            isShown: false
        };
    }

    render() {
        return (
            <div className="col-xs-12 col-md-3">
                <div className={'x-filters' + (this.state.isShown ? ' is-shown' : '')}>
                    <a className="x-filters--head" href="#" onClick={(e) => { e.preventDefault(); this.setState({ isShown: true }); }}>Filters</a>
                    <div className="x-filters--body">
                        <a className="x-filters--close" href="#" onClick={(e) => { e.preventDefault(); this.setState({ isShown: false }); }}><i className="icon-close" /></a>

                        <div className="x-in--title">{this.props.title}</div>
                        {this.props.children}

                        <div className="x-join visible-xs visible-sm">
                            <div className="x-join--btn"><a className="x-btn is-block" href="#" onClick={(e) => { e.preventDefault(); this.setState({ isShown: false }); }}>Apply filters</a></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export function DataListContent(props: { title: string, totalProjects: number, totalProjectsVerified: number, newUnits: number, newUnitsVerified: number, children?: any }) {
    return (
        <div className="col-xs-12 col-md-9">
            <div className="x-in--title hidden-xs">
                {(props.totalProjects !== 0) && <div>{props.totalProjects}<span>Buildings</span></div>}
                {(props.newUnits !== 0) && <div>{props.newUnits}<span>Net new units</span></div>}
                {((props.totalProjectsVerified !== 0) || (props.newUnitsVerified !== 0)) && <span className="is-verified">Verified</span>}
                {(props.totalProjectsVerified !== 0) && <div>{props.totalProjectsVerified}<span>Buildings</span></div>}
                {(props.newUnitsVerified !== 0) && <div>{props.newUnitsVerified}<span>Net new units</span></div>}
            </div>
            {props.children}
        </div>
    );
}

export function DataListRadio(props: { title: string, radioKey: string, children?: any }) {
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

export const DataListRadioItem = withRouter<{ title: string, itemKey?: string, radioKey?: string }>(props => {
    var path = props.router.pathname;
    var checked = false;
    if (props.radioKey) {
        let s = JSON.parse(JSON.stringify(props.router.query!!));
        if (props.itemKey) {
            checked = s[props.radioKey] === props.itemKey;
            s[props.radioKey] = props.itemKey;
        } else {
            checked = s[props.radioKey] === undefined;
            delete s[props.radioKey];
        }
        let q = qs.stringify(s);
        if (q !== '') {
            path = props.router.pathname + '?' + q;
        } else {
            path = props.router.pathname;
        }
    }
    return (
        <Link path={path} className={'x-filter--radio' + (checked ? ' is-checked' : '')}>{props.title}</Link>
    );
});

export const DataListSearch = withRouter<{ searchKey: string }>(props => {
    let s = JSON.parse(JSON.stringify(props.router.query!!));
    var value: string = '';
    if (s[props.searchKey]) {
        value = s[props.searchKey];
    }
    return (
        <div className="x-search">
            <div className="x-search--box">
                <input
                    className="x-search--input"
                    type="text"
                    placeholder="Search"
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
                <button className="x-search--button" type="submit"><i className="icon-search">{}</i></button>
            </div>
        </div>
    );
});