import * as React from 'react';
import { XLink } from './X/XLink';
import * as qs from 'query-string';
import { XContainer } from './X/XContainer';
import { XRow } from './X/XRow';
import { XFilterInput } from './X/XFilterInput';
import { withRouter } from '../utils/withRouter';

export function DataList(props: { children?: any }) {
    return (
        <div className="x-in">
            <XContainer wide={true}>
                <XRow>
                    {props.children}
                </XRow>
            </XContainer>
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
                    <a
                        className="x-filters--head"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({isShown: true});
                        }}
                    >
                        Filters
                    </a>
                    <div className="x-filters--body">
                        <a className="x-filters--close" href="#" onClick={(e) => {
                            e.preventDefault();
                            this.setState({isShown: false});
                        }}><i className="icon-close"/></a>

                        <div className="x-in--title">{this.props.title}</div>
                        {this.props.children}

                        <div className="x-join visible-xs visible-sm">
                            <div className="x-join--btn"><a className="x-btn is-block" href="#" onClick={(e) => {
                                e.preventDefault();
                                this.setState({isShown: false});
                            }}>Apply filters</a></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export function DataListContent(props: { title?: string, children?: any }) {
    return (
        <div className="col-xs-12 col-md-9">
            {props.children}
        </div>
    );
}

export function DataListContentStats(props: { totalProjects: number, totalProjectsVerified: number, newUnits: number, newUnitsVerified: number }) {
    return (
        <div className="x-in--title hidden-xs">
            {(props.totalProjects !== 0) && <div>{props.totalProjects}<span>Buildings</span></div>}
            {(props.newUnits !== 0) && <div>{props.newUnits}<span>Net new units</span></div>}
            {((props.totalProjectsVerified !== 0) || (props.newUnitsVerified !== 0)) &&
            <span className="is-verified">Verified</span>}
            {(props.totalProjectsVerified !== 0) && <div>{props.totalProjectsVerified}<span>Buildings</span></div>}
            {(props.newUnitsVerified !== 0) && <div>{props.newUnitsVerified}<span>Net new units</span></div>}
        </div>
    );
}

export function DataListRadio(props: { title: string, radioKey: string, children?: any }) {
    var childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ radioKey: string }>, {radioKey: props.radioKey});
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
    let path = props.router.pathname;
    let checked = false;
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
        <XLink path={path} className={'x-filter--radio' + (checked ? ' is-checked' : '')}>{props.title}</XLink>
    );
});

export const DataListSearch = withRouter<{ searchKey: string }>(props => {
    return (
        <div className="x-search">
            <div className="x-search--box">
                <XFilterInput className="x-search--input" searchKey={props.searchKey} placeholder="Search"/>
                <button className="x-search--button" type="submit"><i className="icon-search">{}</i></button>
            </div>
        </div>
    );
});