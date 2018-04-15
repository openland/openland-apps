import * as React from 'react';
import Glamorous from 'glamorous';
import { findChild } from './utils';
import { XScrollView } from './X/XScrollView';
import { XVertical } from './X/XVertical';
import { XPicture } from './X/XPicture';
import { XLink } from './X/XLink';
import { XIcon } from './X/XIcon';
import { withUserInfo } from './UserInfo';
import { XPopover } from './X/XPopover';
import { XMenu } from './X/XMenu';
import { withSearch } from '../api';
import { XCard } from './X/XCard';
import { XArea } from './X/XArea';
import { XWithRole } from './X/XWithRole';
import { XTooltip } from './Incubator/XTooltip';

//
// Root
//

const RootContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    width: '100vw'
});

// 
// Navigation
//

const NavigationWrapper = Glamorous.div<{ withMenu: boolean }>((props) => ({
    display: 'flex',
    flexShrink: 0,
    width: props.withMenu ? 280 : 72,
    order: 1
}));

const NavigationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '72px',
    paddingTop: '8px',
    backgroundColor: '#FAFAFC',
    flexShrink: 0,
    borderRightColor: 'rgba(0,0,0, 0.05)',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    alignItems: 'center',
    // overflowY: 'scroll',
    // position: 'fixed',
    // top: 0,
    // left: 0,
    // '> div': {
    //     flexShrink: 0
    // }
});

const Logo = Glamorous(XPicture)({
    height: '48px',
    width: '48px',
    marginTop: '12px',
    marginBottom: '12px',
    alignSelf: 'center',
    flexShrink: 0
});

const NavigationDivider = Glamorous.div({
    width: '36px',
    height: '1px',
    marginTop: '4px',
    marginBottom: '4px',
    alignSelf: 'center',
    backgroundColor: '#000000',
    opacity: 0.05
});

const NavigatorIcon = Glamorous(XIcon)({
    fontSize: '28px',
    textAlign: 'center'
});

const NavigatorItem = Glamorous(XLink)({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: '16px',
    paddingBottom: '16px',
    flexShrink: 0,
    color: '#000000',
    cursor: 'pointer',
    ':hover': {
        color: '#522BFF',
    },
    '.is-active': {
        color: '#522BFF'
    }
});

const BottomNavigation = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
    flexShrink: 0
});

const AvatarImg = Glamorous.img({
    overflow: 'hidden',
    borderRadius: '14px',
    marginLeft: 16,
    marginRight: 8,
    width: '36px',
    height: '36px',
    boxShadow: '0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)',
    cursor: 'pointer'
});

let UserProfile = withUserInfo<{ onClick?: any }>((props) => {
    return (
        <XPopover placement="right">
            <XPopover.Target>
                <AvatarImg src={props.user!!.picture} />
                {/* <UserInfoDiv><AvatarImg src={props.user!!.picture} /> {props.user!!.name}</UserInfoDiv> */}
            </XPopover.Target>
            <XPopover.Content>
                <XMenu>
                    <XMenu.Item path="/auth/logout">Sign Out</XMenu.Item>
                </XMenu>
            </XPopover.Content>
        </XPopover>
    );
});

//
// Content
//

const ContentView = Glamorous(XScrollView)<{ withMenu: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    flex: 1,
    order: 2,
    maxWidth: props.withMenu ? 'calc(100% - 280px)' : 'calc(100% - 72px)',
    // marginLeft: '-8px',
    // borderTopLeftRadius: 8,
    // borderBottomLeftRadius: 8,
    boxShadow: '0 2px 4px 1px rgba(0,0,0,.05), 0 4px 24px 2px rgba(0,0,0,.05)',
    // overflowY: 'scroll',
    position: 'relative'
}));

const SearchContainer = Glamorous.div<{ visible: boolean }>((props) => ({
    position: 'fixed',
    zIndex: 500,
    transition: 'opacity 220ms',
    left: 72,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: props.visible ? 1 : 0,
    pointerEvents: props.visible ? 'initial' : 'none',
    backgroundColor: 'rgba(9, 30, 66, 0.54)'
}));

const SearchContent = Glamorous.div<{ visible: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    zIndex: 501,
    transition: 'opacity 200ms',
    left: 72,
    top: 0,
    bottom: 0,
    width: '300px',
    opacity: props.visible ? 1 : 0,
    pointerEvents: props.visible ? 'initial' : 'none',
    backgroundColor: '#FFFFFF',
}));

const SearchInput = Glamorous.input({
    border: 'none',
    marginTop: '24px',
    paddingLeft: '24px',
    paddingRight: '24px',
    height: '48px',
    width: '100%',
    fontWeight: 600,
    fontSize: '20px',
    backgroundColor: 'transparent',
    '::placeholder': {
        color: 'rgb(24, 39, 66, 0.6)'
    },
    '&:focus': {
        '::placeholder': { color: 'rgba(24, 39, 66, 0.3)' }
    }
});

const ResultsContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: '16px',
    width: '100%'
});

let HighlightedWrapper = Glamorous.span({
    '> em': {
        color: '#3297d3',
        fontWeight: 600,
        fontStyle: 'normal'
    }
});

const Highlighted = (props: { text?: string, field: string, highlight: { key: string, match: string }[] }) => {
    let existing = props.highlight.find((k) => k.key === props.field);
    if (existing) {
        return <HighlightedWrapper dangerouslySetInnerHTML={{ __html: existing.match }} />;
    } else {
        if (props.text) {
            return <>{props.text}</>;
        } else {
            return null;
        }
    }
};

// const ResultHeader = Glamorous.div({
//     display: 'flex',
//     flexDirection: 'row',
//     color: '#3297d3',
//     fontSize: 12,
//     fontWeight: 700
// })

const ResultTilte = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
});

const ResultTilteMain = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    fontSize: 13,
    flexGrow: 1
});

const ResultTilteHint = Glamorous.div({
    fontSize: 13,
    opacity: 0.7
});

const ResultBody = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    fontSize: 13
});

const ResultBodyMain = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    opacity: 0.7,
    marginRight: '8px',
    width: 100
});

let SearchResults = withSearch((props) => {
    if (props.data && props.data.search && props.data.search.parcels.edges.length > 0) {
        return (
            <ResultsContainer>
                <XCard.List>
                    {props.data.search.parcels.edges.map((v) => (
                        <XCard.ListItem key={v.node.id} path={'/parcels/' + v.node.id}>
                            <ResultTilte>
                                <ResultTilteMain>Parcel #<Highlighted text={v.node.title} field={'title'} highlight={v.highlight} /></ResultTilteMain>
                                <ResultTilteHint>{v.node.extrasArea && <XArea area={v.node.extrasArea} />}</ResultTilteHint>
                            </ResultTilte>
                            {!v.highlight.find((k) => k.key === 'address') && (
                                <ResultBody>
                                    <ResultBodyMain>Neighborhood</ResultBodyMain>
                                    {v.node.extrasNeighborhood}
                                </ResultBody>
                            )}
                            {v.highlight.find((k) => k.key === 'address') && (
                                <ResultBody>
                                    <ResultBodyMain>Address</ResultBodyMain>
                                    <Highlighted field={'address'} highlight={v.highlight} />
                                </ResultBody>
                            )}
                        </XCard.ListItem>
                    ))}
                </XCard.List>
            </ResultsContainer>
        );
    } else {
        return null;
    }
});

//
// Menu
//

const MenuView = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFAFC',
    // position: 'fixed',
    // top: 0,
    // left: 72,
    // height: '100vh'
});

//
// Implementation
//

class ScaffoldMenu extends React.Component {
    static defaultProps = {
        _isSidebarMenu: true
    };
    render() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        return (
            <MenuView>
                {this.props.children}
            </MenuView>
        );
    }
}

const PageDiv = Glamorous.div({
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    width: '64px',
    height: '64px'
});

class ScaffoldContent extends React.Component<{ padding?: boolean, bottomOffset?: boolean }> {
    static defaultProps = {
        _isSidebarContent: true
    };
    render() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        if (this.props.padding === false) {
            return (
                <>
                    {this.props.children}
                    {this.props.bottomOffset !== false && <PageDiv />}
                </>
            );
        }
        return (
            <XVertical>
                {this.props.children}
                {this.props.bottomOffset !== false && <PageDiv />}
            </XVertical>
        );
    }
}

export class Scaffold extends React.Component<{}, { search: boolean, searchText: string }> {
    static Menu = ScaffoldMenu;
    static Content = ScaffoldContent;

    searchRef: any | null = null;

    constructor(props: {}) {
        super(props);
        this.state = { search: false, searchText: '' };
    }

    handleSearch = () => {
        if (this.state.search) {
            this.setState({ search: false });
        } else {
            this.setState({ search: true, searchText: '' });
            if (this.searchRef) {
                this.searchRef.focus();
            }
        }
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (this.state.search) {
            this.setState({ searchText: (e.target as any).value as string });
        }
    }

    handleSearchRef = (ref: any | null) => {
        this.searchRef = ref;
    }

    render() {
        let menu = findChild(this.props.children, '_isSidebarMenu');
        let content = findChild(this.props.children, '_isSidebarContent');

        return (
            <RootContainer>
                <NavigationWrapper withMenu={menu ? true : false}>
                    <SearchContainer visible={this.state.search} onClick={this.handleSearch} />
                    <SearchContent visible={this.state.search}>
                        <SearchInput
                            placeholder="Search"
                            onChange={this.handleSearchChange}
                            innerRef={this.handleSearchRef}
                            value={this.state.searchText}
                        />
                        {this.state.searchText.trim().length > 0 && this.state.search && (<SearchResults query={this.state.searchText} />)}
                    </SearchContent>
                    <NavigationContainer>
                        <XLink path="/">
                            <Logo picture={{ url: '/static/branding/logo_inverted_squared.png', retina: '/static/branding/logo_inverted_squared@2x.png' }} />
                        </XLink>
                        <NavigationDivider />
                        <NavigatorItem onClick={this.handleSearch} active={this.state.search}>
                            <NavigatorIcon icon={this.state.search ? 'close' : 'search'} />
                        </NavigatorItem>
                        <NavigationDivider />
                        <XTooltip placement="right">
                            <XTooltip.Target>
                                <NavigatorItem path="/">
                                    <NavigatorIcon icon="explore" />
                                </NavigatorItem>
                            </XTooltip.Target>
                            <XTooltip.Content>
                                <strong>Explore</strong>
                            </XTooltip.Content>
                        </XTooltip>
                        <XTooltip placement="right">
                            <XTooltip.Target>
                                <NavigatorItem path="/prospecting" activateForSubpaths={true}>
                                    <NavigatorIcon icon="sort" />
                                </NavigatorItem>
                            </XTooltip.Target>
                            <XTooltip.Content>
                                <strong>Prospecting</strong>
                            </XTooltip.Content>
                        </XTooltip>
                        <XTooltip placement="right">
                            <XTooltip.Target>
                                <NavigatorItem path="/deals" activateForSubpaths={true}>
                                    <NavigatorIcon icon="work" />
                                </NavigatorItem>
                            </XTooltip.Target>
                            <XTooltip.Content>
                                <strong>Deals</strong>
                            </XTooltip.Content>
                        </XTooltip>
                        <XTooltip placement="right">
                            <XTooltip.Target>
                                <NavigatorItem path="/favorites" activateForSubpaths={true}>
                                    <NavigatorIcon icon="favorite" />
                                </NavigatorItem>
                            </XTooltip.Target>
                            <XTooltip.Content>
                                <strong>Favorites</strong>
                            </XTooltip.Content>
                        </XTooltip>
                        <BottomNavigation>
                            <XWithRole role={['super-admin', 'software-developer']}>
                                <XTooltip placement="right" centeredContent={true}>
                                    <XTooltip.Target>
                                        <NavigatorItem path="/super" activateForSubpaths={true}>
                                            <NavigatorIcon icon="fingerprint" />
                                        </NavigatorItem>
                                    </XTooltip.Target>
                                    <XTooltip.Content>
                                        <strong>DevTools</strong>
                                    </XTooltip.Content>
                                </XTooltip>
                                <XTooltip placement="right" centeredContent={true}>
                                    <XTooltip.Target>
                                        <NavigatorItem path="/ui" activateForSubpaths={true}>
                                            <NavigatorIcon icon="color_lens" />
                                        </NavigatorItem>
                                    </XTooltip.Target>
                                    <XTooltip.Content>
                                        <strong>X Framework</strong>
                                    </XTooltip.Content>
                                </XTooltip>
                            </XWithRole>
                            <NavigatorItem>
                                <UserProfile />
                            </NavigatorItem>
                        </BottomNavigation>
                    </NavigationContainer>
                    {menu}
                </NavigationWrapper>
                <ContentView withMenu={menu ? true : false}>
                    {content}
                </ContentView>
            </RootContainer>
        );
    }
}