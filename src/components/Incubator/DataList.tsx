import * as React from 'react';
import { XLink } from '../X/XLink';
import * as qs from 'query-string';
import { XFilterInput } from '../X/XFilterInput';
import { withRouter } from '../../utils/withRouter';
import { XLayoutColumnWithMenu } from '../X/XLayoutColumnWithMenu';
import Glamorous from 'glamorous';
import { XDesktopContainer } from '../X/XDesktopContainer';
import { XVertical } from '../X/XVertical';
import XStyled from '../X/XStyled';

let FiltersTitle = Glamorous.div({
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    marginTop: 8,
    marginLeft: 16,
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

// let Separator =  Glamorous.div({
//     height: 1,
//     marginTop: '16px',
//     background: 'rgba(38,38,38,0.08)'
// })

let Separator = function () {
    return null
};

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

let FilterTitle = Glamorous.div({
    letterSpacing: '0.6px',
    marginTop: '8px',
    marginBottom: '8px',
    paddingLeft: '16px',
    textTransform: 'uppercase',

    color: 'rgba(24,38,66,0.8)',

    fontSize: '11px',
    lineHeight: '18px',
    fontWeight: 500
})

export function DataListRadio(props: { title: string, radioKey: string, children?: any }) {
    var childrenWithProps = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ radioKey: string }>, { radioKey: props.radioKey });
        } else {
            return child;
        }
    });
    return (
        <>
        <FilterTitle>{props.title}</FilterTitle>
        {childrenWithProps}
        <Separator />
        </>
    );
}

let RadioLink = XStyled(XLink)({
    margin: '0 0 1px',
    padding: '10px 16px',
    color: 'rgba(107,80,255,0.8) !important',
    borderRadius: '4px',
    textDecoration: 'none',

    position: 'relative',
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 500,

    '&:hover': { background: '#f0edff' }
});

let RadioLinkChecked = Glamorous(RadioLink)({
    background: '#F0EDFF',
    color: '#6B50FF'
});

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
    let Component = checked ? RadioLinkChecked : RadioLink;
    return (
        <Component path={path}>{props.title}</Component>
    );
});

let DataListSearchBox = Glamorous.div({
    position: 'relative'
});

let DataListSearchInput = Glamorous(XFilterInput)({
    background: '#F0EDFF',
    borderRadius: '4px!important',
    color: 'rgb(135, 113, 253)',
    padding: '14px 62px 16px 16px',
    border: 'none',
    display: 'block',
    width: '100%',
    height: '56px',
    fontSize: '15px',
    lineHeight: '26px',
    fontWeight: 500,
    fontFamily: '\'Aktiv Grotesk Corp\',arial,sans-serif',

    '::placeholder': {
        color: 'rgb(135, 113, 253)'
    },
    '&:focus': {
        '::placeholder': { color: 'rgba(135, 113, 253, 0.7)' }
    }
});

let DataListSearchButton = Glamorous.button({
    textAlign: 'center',
    border: 'none',
    background: 'none',
    color: '#6B50FF',
    padding: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    height: '56px',
    width: '62px',

    '> i': {
        fontSize: '14px',
        lineHeight: '56px'
    }
});

export const DataListSearch = withRouter<{ searchKey: string }>(props => {
    return (
        <>
        <DataListSearchBox>
            <DataListSearchInput searchKey={props.searchKey} placeholder="Search" />
            <DataListSearchButton type="submit"><i className="icon-search">{}</i></DataListSearchButton>
        </DataListSearchBox>
        <Separator />
        </>
    );
});

let InviteLink = Glamorous.a({
    textAlign: 'center',
    border: 'none',
    background: '#6B50FF',
    color: '#ffffff!important',
    padding: '18px 20px',
    textDecoration: 'none',
    borderRadius: '4px',

    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 500
})

export function DataListInvite() {
    return (
        <XDesktopContainer>
            <XVertical>
                <InviteLink target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">
                    Join as a contributor
            </InviteLink>
            </XVertical>
        </XDesktopContainer>
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