import * as React from 'react';
import Glamorous from 'glamorous';
import { findChild } from './utils';
// import { XScrollView } from './X/XScrollView';
import { XVertical } from 'openland-x-layout/XVertical';
import { XPicture } from 'openland-x/XPicture';
import { XIcon } from 'openland-x/XIcon';
import { withUserInfo } from './UserInfo';
import { withSearch, withAllAccounts } from '../api';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { TextAppBar } from 'openland-text/TextAppBar';
import { TextGlobal } from 'openland-text/TextGlobal';
import { TextGlobalSearch } from 'openland-text/TextGlobalSearch';
import { XLink } from 'openland-x/XLink';
import { XArea } from 'openland-x-format/XArea';
import { XList, XListItem } from 'openland-x/XList';
import { XTitle } from 'openland-x/XTitle';
import { XPopper } from 'openland-x/XPopper';
import { XAvatar } from 'openland-x/XAvatar';
import { XModal } from 'openland-x-modal/XModal';
import { XLoader } from 'openland-x/XLoader';
import { XTable } from 'openland-x/XTable';
import * as Cookie from 'js-cookie';

//
// Root
//

const RootContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
    minWidth: 800,
});

// 
// Navigation
//

const NavigationWrapper = Glamorous.div((props) => ({
    display: 'flex',
    flexShrink: 0,
    order: 1
}));

const NavigationContainer = Glamorous.div<{ sidebarBorderColor?: string }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: 72,
    paddingTop: 8,
    backgroundColor: '#FAFAFC',
    flexShrink: 0,
    borderRightColor: props.sidebarBorderColor ? props.sidebarBorderColor : 'rgba(0,0,0, 0.05)',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    alignItems: 'center',
    overflowY: 'scroll',
    position: 'sticky',
    top: 0
}));

const Logo = Glamorous(XPicture)({
    height: 48,
    width: 48,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: 'center',
    flexShrink: 0
});

const NavigationDivider = Glamorous.div({
    width: 36,
    height: 1,
    marginTop: 4,
    marginBottom: 4,
    alignSelf: 'center',
    backgroundColor: '#000000',
    opacity: 0.05,
    flexShrink: 0
});

const NavigatorIcon = Glamorous(XIcon)({
    fontSize: 28,
    textAlign: 'center'
});

const NavigatorItem = Glamorous(XLink)({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    flexShrink: 0,
    color: '#000000',
    cursor: 'pointer',
    '.is-active': {
        color: '#522BFF',
        '& > .reports .hover': {
            display: 'block'
        },
        '& > .reports .no-hover': {
            display: 'none'
        },
    },
    '&:hover': {
        color: '#522BFF',
        '& > .reports .hover': {
            display: 'block'
        },
        '& > .reports .no-hover': {
            display: 'none'
        },
    },
    '& > .reports': {
        width: 28,
        height: 28,
        display: 'flex',
        justifyContent: 'center',
        '& .hover': {
            display: 'none'
        },
        '& .no-hover': {
            display: 'block'
        }
    }
});

const BottomNavigation = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 0
});

const XMenuItem = Glamorous(XLink)({
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    width: '100%',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#525f7f',
    lineHeight: '28px',
    // '&:hover': {
    //     backgroundColor: '#f6f9fc',
    //     color: '#525f7f'
    // }
});

class XMenu extends React.Component {

    static Item = XMenuItem;

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

class UserPopper extends React.Component<{ picture: string | null }, { show: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { show: false };
    }

    switch = () => {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <XPopper
                placement="right"
                showOnHoverContent={false}
                onClickOutside={this.switch}
                show={this.state.show}
                padding={25}
                content={(
                    <XMenu>
                        <XMenu.Item query={{ field: 'org', value: 'true' }}>{TextGlobal.switch}</XMenu.Item>
                        <XMenu.Item path="/addOrganization">{TextGlobal.addOrganization}</XMenu.Item>
                        <XMenu.Item path="/auth/logout">{TextGlobal.signOut}</XMenu.Item>
                    </XMenu>
                )}
            >
                <XAvatar cloudImageUuid={this.props.picture || undefined} onClick={this.switch} />
            </XPopper>
        );
    }
}

let UserProfile = withUserInfo<{ onClick?: any }>((props) => {
    return (
        <UserPopper picture={props.user!!.picture} />
    );
});

//
// Content
//

const ContentView = Glamorous.div<{ noBoxShadow?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
    // borderTopLeftRadius: 8,
    // borderBottomLeftRadius: 8,
    backgroundColor: '#ffffff',
    flex: 1,
    order: 2,
    minWidth: 0,
    maxWidth: '100%',
    boxShadow: props.noBoxShadow ? undefined : '0 2px 4px 1px rgba(0,0,0,.05), 0 4px 24px 2px rgba(0,0,0,.05)',
    position: 'relative',
    zIndex: 0
}));

const SearchWrapper = Glamorous.div<{ visible: boolean }>((props) => ({
    visibility: props.visible ? 'visible' : 'hidden',
    zIndex: 500,
    opacity: props.visible ? 1 : 0,
    transition: 'all 220ms',
}));

const SearchWrapperSticky = Glamorous.div({
    position: 'sticky',
    top: 0
});

const SearchContainer = Glamorous.div({
    position: 'absolute',
    left: 72,
    top: 0,
    width: 'calc(100vw - 72px)',
    height: '100vh',
    backgroundColor: 'rgba(9, 30, 66, 0.54)'
});

const SearchContent = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1,
    left: 72,
    top: 0,
    width: '300px',
    height: '100vh',
    backgroundColor: '#FFFFFF',
});

const SearchInput = Glamorous.input({
    border: 'none',
    marginTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    height: 48,
    width: '100%',
    fontWeight: 600,
    fontSize: 20,
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
    width: '100%',
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
    marginRight: 8,
    width: 100
});

const Tilte = Glamorous(XTitle)({
    paddingLeft: 16
});

let SearchResults = withSearch((props) => {
    if (props.data && props.data.search && (props.data.search.parcels.edges.length > 0 || props.data.search.folders.edges.length > 0)) {
        return (
            <ResultsContainer>
                <XList>
                    {props.data.search.folders.edges.length > 0 && <Tilte>Folders</Tilte>}
                    {props.data.search.folders.edges.map((v) => (
                        <XListItem key={v.node.id} path={'/folders/' + v.node.id}>
                            <ResultTilte>
                                <ResultTilteMain>{v.node.name}</ResultTilteMain>
                            </ResultTilte>
                        </XListItem>
                    ))}
                    {props.data.search.folders.edges.length > 0 && <Tilte>Parcels</Tilte>}
                    {props.data.search.parcels.edges.map((v) => (
                        <XListItem key={v.node.id} path={'/parcels/' + v.node.id}>
                            <ResultTilte>
                                <ResultTilteMain>{TextGlobalSearch.parcelIdPrefix}<Highlighted text={v.node.title} field={'title'} highlight={v.highlight} /></ResultTilteMain>
                                <ResultTilteHint>{v.node.extrasArea && <XArea value={v.node.extrasArea} />}</ResultTilteHint>
                            </ResultTilte>
                            {!v.highlight.find((k) => k.key === 'address') && (
                                <ResultBody>
                                    <ResultBodyMain>{TextGlobalSearch.neighborhood}</ResultBodyMain>
                                    {v.node.extrasNeighborhood}
                                </ResultBody>
                            )}
                            {v.highlight.find((k) => k.key === 'address') && (
                                <ResultBody>
                                    <ResultBodyMain>{TextGlobalSearch.address}</ResultBodyMain>
                                    <Highlighted field={'address'} highlight={v.highlight} />
                                </ResultBody>
                            )}
                        </XListItem>
                    ))}
                </XList>
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
    width: '208px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFAFC',
    position: 'sticky',
    top: 0,
    left: 72,
    height: '100vh',
    overflowY: 'scroll'
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
            <XVertical flexGrow={1}>
                {this.props.children}
                {this.props.bottomOffset !== false && <PageDiv />}
            </XVertical>
        );
    }
}

interface ScaffoldProps {
    noBoxShadow?: boolean;
    sidebarBorderColor?: string;
}

function pickOrganization(id: string) {
    Cookie.set('x-openland-org', id);
    window.location.href = '/';
}

const OrganizationPicker = withAllAccounts((props) => {
    if (props.data.loading) {
        return <XLoader loading={true} />;
    }
    return (
        <XTable>
            <XTable.Body>
                {props.data.orgs.map((v) => (
                    <XTable.Row onClick={() => pickOrganization(v.id)}>{v.title}</XTable.Row>
                ))}
            </XTable.Body>
        </XTable>
    );
});

export class Scaffold extends React.Component<ScaffoldProps, { search: boolean, searchText: string }> {
    static Menu = ScaffoldMenu;
    static Content = ScaffoldContent;

    searchRef: any | null = null;

    constructor(props: ScaffoldProps) {
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
                <XModal title={TextGlobal.switch} targetQuery="org">
                    <OrganizationPicker />
                </XModal>
                <NavigationWrapper>
                    <SearchWrapper visible={this.state.search}>
                        <SearchWrapperSticky>
                            <SearchContainer onClick={this.handleSearch} />
                            <SearchContent>
                                <SearchInput
                                    placeholder={TextGlobalSearch.placeholder}
                                    onChange={this.handleSearchChange}
                                    innerRef={this.handleSearchRef}
                                    value={this.state.searchText}
                                />
                                {this.state.searchText.trim().length > 0 && this.state.search && (<SearchResults variables={{ query: this.state.searchText }} />)}
                            </SearchContent>
                        </SearchWrapperSticky>
                    </SearchWrapper>
                    <NavigationContainer sidebarBorderColor={this.props.sidebarBorderColor}>
                        <XLink path="/">
                            <Logo picture={{ url: '/static/branding/logo_inverted_squared.png', retina: '/static/branding/logo_inverted_squared@2x.png' }} />
                        </XLink>
                        <NavigationDivider />
                        <XWithRole role={['feature-search-global']}>
                            <NavigatorItem onClick={this.handleSearch} active={this.state.search}>
                                <NavigatorIcon icon={this.state.search ? 'close' : 'search'} />
                            </NavigatorItem>
                            <NavigationDivider />
                        </XWithRole>
                        <XWithRole role={['feature-marketplace']}>
                            <XPopper
                                placement="right"
                                showOnHoverContent={false}
                                showOnHover={true}
                                groupId="scaffold_tooltip"
                                content={(
                                    <strong>{TextAppBar.items.home}</strong>
                                )}
                            >
                                <NavigatorItem path="/home">
                                    <NavigatorIcon icon="home" />
                                </NavigatorItem>
                            </XPopper>
                        </XWithRole>
                        <XWithRole role={['feature-marketplace']}>
                            <XPopper
                                placement="right"
                                showOnHoverContent={false}
                                showOnHover={true}
                                groupId="scaffold_tooltip"
                                content={(
                                    <strong>{TextAppBar.items.explore}</strong>

                                )}
                            >
                                <NavigatorItem path="/marketplace">
                                    <NavigatorIcon icon="explore" />
                                </NavigatorItem>
                            </XPopper>
                        </XWithRole>
                        <XPopper
                            placement="right"
                            showOnHoverContent={false}
                            showOnHover={true}
                            groupId="scaffold_tooltip"
                            content={(
                                <strong>{TextAppBar.items.map}</strong>

                            )}
                        >
                            <NavigatorItem path="/map">
                                <NavigatorIcon icon="map" />
                            </NavigatorItem>
                        </XPopper>
                        <XWithRole role={['feature-customer-kassita']} negate={true}>
                            <XPopper
                                placement="right"
                                showOnHoverContent={false}
                                showOnHover={true}
                                groupId="scaffold_tooltip"
                                content={(
                                    <strong>{TextAppBar.items.folders}</strong>

                                )}
                            >
                                <NavigatorItem path="/folders" activateForSubpaths={true}>
                                    <NavigatorIcon icon="folder" />
                                </NavigatorItem>
                            </XPopper>
                        </XWithRole>

                        <XWithRole role={['feature-prospecting']}>
                            <XPopper
                                placement="right"
                                showOnHoverContent={false}
                                showOnHover={true}
                                groupId="scaffold_tooltip"
                                content={(
                                    <strong>{TextAppBar.items.prospecting}</strong>

                                )}
                            >
                                <NavigatorItem path="/prospecting" activateForSubpaths={true}>
                                    <NavigatorIcon icon="sort" />
                                </NavigatorItem>

                            </XPopper>
                        </XWithRole>
                        <XWithRole role={['feature-deals']}>
                            <XPopper
                                placement="right"
                                showOnHoverContent={false}
                                showOnHover={true}
                                groupId="scaffold_tooltip"
                                content={(
                                    <strong>{TextAppBar.items.deals}</strong>

                                )}
                            >
                                <NavigatorItem path="/deals" activateForSubpaths={true}>
                                    <NavigatorIcon icon="business_center" />
                                </NavigatorItem>
                            </XPopper>
                        </XWithRole>
                        <XWithRole role={['feature-customer-kassita']}>
                            <XPopper
                                placement="right"
                                showOnHoverContent={false}
                                showOnHover={true}
                                groupId="scaffold_tooltip"
                                content={(
                                    <strong>{TextAppBar.items.reports}</strong>
                                )}
                            >

                                <NavigatorItem path="/reports/urbyn_mho_nyc" activateForSubpaths={true}>
                                    <div className="reports">
                                        <img src="/static/img/icons/reports/dh-icon-black.svg" className="no-hover" />
                                        <img src="/static/img/icons/reports/sh-iconblue.svg" className="hover" />
                                    </div>
                                </NavigatorItem>

                            </XPopper>
                        </XWithRole>
                        <XWithRole role={['feature-favorites']}>
                            <XPopper
                                placement="right"
                                showOnHoverContent={false}
                                showOnHover={true}
                                groupId="scaffold_tooltip"
                                content={(
                                    <strong>{TextAppBar.items.favorites}</strong>
                                )}
                            >
                                <NavigatorItem path="/favorites" activateForSubpaths={true}>
                                    <NavigatorIcon icon="favorite" />
                                </NavigatorItem>

                            </XPopper>
                        </XWithRole>
                        <BottomNavigation>
                            <XWithRole role={['super-admin', 'software-developer']}>
                                <XPopper
                                    placement="right"
                                    showOnHoverContent={false}
                                    showOnHover={true}
                                    groupId="scaffold_tooltip"
                                    content={(
                                        <strong>{TextAppBar.items.devTools}</strong>

                                    )}
                                >
                                    <NavigatorItem path="/super" activateForSubpaths={true}>
                                        <NavigatorIcon icon="fingerprint" />
                                    </NavigatorItem>
                                </XPopper>
                                <XPopper
                                    placement="right"
                                    showOnHoverContent={false}
                                    showOnHover={true}
                                    groupId="scaffold_tooltip"
                                    content={(
                                        <strong>{TextAppBar.items.xFramework}</strong>

                                    )}
                                >
                                    <NavigatorItem path="/ui" activateForSubpaths={true}>
                                        <NavigatorIcon icon="color_lens" />
                                    </NavigatorItem>
                                </XPopper>
                            </XWithRole>
                            <NavigatorItem>
                                <UserProfile />
                            </NavigatorItem>
                        </BottomNavigation>
                    </NavigationContainer>
                    {menu}
                </NavigationWrapper>
                <ContentView noBoxShadow={this.props.noBoxShadow}>
                    {content}
                </ContentView>
            </RootContainer>
        );
    }
}