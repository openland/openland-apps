import * as React from 'react';
import { XLink } from './X/XLink';
import * as qs from 'query-string';
import { XFilterInput } from './X/XFilterInput';
import { withRouter } from '../utils/withRouter';
import { XLayoutColumnWithMenu } from './X/XLayoutColumnWithMenu';
import Glamorous from 'glamorous';

let FiltersTitle = Glamorous.div({
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    marginTop: 8,
    marginBottom: 8,
});

export class DataListFilters extends React.Component<{ title: string }> {
    constructor(props: { title: string }) {
        super(props);
    }

    render() {
        return (
            <XLayoutColumnWithMenu.Menu buttonTitle="Filters" actionTitle="Apply Filters">
                <FiltersTitle>{this.props.title}</FiltersTitle>
                {this.props.children}
            </XLayoutColumnWithMenu.Menu>
        );
    }
}

export function DataListContent(props: { children?: any }) {
    return (
        <XLayoutColumnWithMenu.Content>
            {props.children}
        </XLayoutColumnWithMenu.Content>
    );
}

let DataListStatsDiv = Glamorous.div({
    display: 'flex',
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    '> div > span': {
        color: 'rgba(38,38,38,0.6)',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        whiteSpace: 'nowrap',
        margin: '2px 12px -2px 8px',
        fontSize: '11px'
    }
})

export function DataListStatsRecord(props: { title: string, counter: number }) {
    return (
        <div>{props.counter}<span>{props.title}</span></div>
    )
}

let VerifiedWrapper = Glamorous.div({
    marginLeft: '62px',
    color: 'rgba(38,38,38,0.6)',
    textTransform: 'uppercase',
    margin: '2px 12px -2px 8px',
    fontSize: '11px',
})

let VerifiedIcon = Glamorous.span({
    fontFamily: '\'icomoon\'!important',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    textTransform: 'none',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    margin: '2px 4px -2px 8px',
})

export function DataListStatsVerified(props: {}) {
    return (
        <VerifiedWrapper><VerifiedIcon>{'\ue91d'}</VerifiedIcon>Verified</VerifiedWrapper>
    )
}

export class DataListStats extends React.Component {
    static Record = DataListStatsRecord;
    static Verified = DataListStatsVerified;

    render() {
        return (
            <DataListStatsDiv>
                {this.props.children}
            </DataListStatsDiv>
        )
    }
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

export const DataListRadioItem = withRouter<{ title: string, itemKey?: string, radioKey?: string, reset?: string[] }>(props => {
    let path = props.router.pathname;
    let checked = false;
    if (props.radioKey) {
        let s = JSON.parse(JSON.stringify(props.router.queryString!!));
        if (props.itemKey) {
            checked = s[props.radioKey] === props.itemKey;
            s[props.radioKey] = props.itemKey;
        } else {
            checked = s[props.radioKey] === undefined;
            delete s[props.radioKey];
        }

        if (props.reset) {
            for (let k of props.reset) {
                delete s[k];
            }
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
                <XFilterInput className="x-search--input" searchKey={props.searchKey} placeholder="Search" />
                <button className="x-search--button" type="submit"><i className="icon-search">{}</i></button>
            </div>
        </div>
    );
});

export function DataListInvite() {
    return (
        <div className="x-join hidden-xs hidden-sm">
            <div className="x-join--btn">
                <a className="x-btn is-block" target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">
                    Join as a contributor
                </a>
            </div>
        </div>
    );
}

export class DataList extends React.Component {

    static Filters = DataListFilters;
    static Content = DataListContent;
    static Stats = DataListStats;
    static Radio = DataListRadio;
    static RadioItem = DataListRadioItem;
    static Search = DataListSearch;
    static Invite = DataListInvite;

    render() {
        return (
            <XLayoutColumnWithMenu>
                {this.props.children}
            </XLayoutColumnWithMenu>
        );
    }
}