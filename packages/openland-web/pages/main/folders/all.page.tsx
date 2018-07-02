import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous, { CSSProperties } from 'glamorous';
import { withApp } from '../../../components/withApp';
import { Scaffold } from '../../../components/Scaffold';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Sidebar } from '../../../components/Sidebar';
import { withFolders } from '../../../api/withFolders';
import { withCreateFolderMutation } from '../../../api/withCreateFolderMutation';
import { withFolder } from '../../../api/withFolder';
import { withFolderActions } from '../../../api/withFolderActions';
import { withFolderItems } from '../../../api/withFolderItems';
import { withFolderExportTask } from '../../../api/withFolderExportTask';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XLinkProps, XLink } from 'openland-x/XLink';
import { XLoader } from 'openland-x/XLoader';
import { XHeader } from 'openland-x/XHeader';
import { XIcon } from 'openland-x/XIcon';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XForm } from 'openland-x-forms/XForm';
import { TableParcels } from '../../../components/TableParcels';
import { XEmpty } from 'openland-x/XEmpty';
import { XButton } from 'openland-x/XButton';
import { XFooter } from 'openland-x/XFooter';
import { FolderTileSource } from '../../../api/FolderTileSource';
import { ParcelCard } from '../../../components/Incubator/MapComponents/MapParcelCard';
import { ParcelMap } from '../../../components/ParcelMap';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XMapCameraLocation } from 'openland-x-map/XMap';
import { trackEvent } from 'openland-x-analytics';
import { XMapImageLayer } from 'openland-x-map/XMapImageLayer';
import { CitySelector } from '../../../components/Incubator/MapComponents/MapCitySelect';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withQueryLoader } from '../../../components/withQueryLoader';

const SidebarItemsStyle = {
    height: 40,
    borderRadius: 4,
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 4,
    marginRight: 4,
    color: '#334562',
    '& span': {
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    '& i': {
        fontSize: 18,
        marginRight: 6,
        color: '#bcc3cc'
    },
    '&:hover': {
        '& i': {
            color: '#334562'
        }
    }
} as CSSProperties;

const CreateFolderButonStyle = Glamorous(Sidebar.Item)({
    ...SidebarItemsStyle,
    position: 'relative',
    marginTop: 16,
    '&:hover': {
        color: '#334562',
        '& > i': {
            color: '#334562'
        }
    },
    '&::after': {
        content: `''`,
        display: 'block',
        position: 'absolute',
        top: -8,
        left: 10,
        width: 'calc(100% - 20px)',
        height: 1,
        backgroundColor: 'rgba(220, 222, 228, 0.6)'
    }
});

const CreateFolderButton = (props: XLinkProps) => (
    <CreateFolderButonStyle {...props}>
        <XIcon icon="add_circle" />
        <span>New folder</span>
    </CreateFolderButonStyle>
);

const CreateFolder = withCreateFolderMutation((props) => {
    return (
        <XModalForm
            title="Create folder"
            actionName="Create"
            target={(props as any).target || <CreateFolderButton />}
            submitMutation={props.createFolder}
            mutationDirect={true}
        >
            <XForm.Text
                field="name"
                autofocus={true}
                placeholder="Folder name like 'Tower Opportunity' or 'Interesting lots'"
            />
        </XModalForm>
    );
}) as React.ComponentClass<{ target?: any }>;

const Edit = withFolderActions((props) => {
    return (
        <XModalForm
            title="Edit folder"
            actionName="Rename"
            target={<XButton text="Edit" />}
            submitMutation={props.alterFolder}
            mutationDirect={true}
            secondaryActions={[{ actionName: 'Delete', submitMutation: props.deleteFolder, actionStyle: 'danger' }]}
        >
            <XForm.Text
                field="name"
                autofocus={true}
                value={props.folderName}
                placeholder="Folder name like 'Tower Opportunity' or 'Interesting lots'"
            />
        </XModalForm>
    );
}) as React.ComponentType<{ variables: { folderId: string }, folderName: string }>;

const SidebarItemWrapper = Glamorous(Sidebar.Item)({
    ...SidebarItemsStyle,
    justifyContent: 'space-between',
    '&.is-active': {
        color: '#654bfa',
        backgroundColor: '#eff1f3',
        '& i': {
            color: '#654bfa'
        },
        '& .counter': {
            opacity: 1,
            color: '#654bfa'
        }
    },
    '& .counter': {
        opacity: 0.5,
        color: '#334562'
    }
});

const SidebarItemTitle = Glamorous.div({
    minWidth: 0,
    maxWidth: '85%',
    display: 'flex',
    alignItems: 'center',
});

const SidebarItemCounter = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.43,
    textAlign: 'right',
});

interface SidebarProps extends XLinkProps {
    icon: string;
    title: string;
    counter: string | number;
}

const SidebarItem = (props: SidebarProps) => (
    <SidebarItemWrapper path={props.path}>
        <SidebarItemTitle>
            <XIcon icon={props.icon} />
            <span>{props.title}</span>
        </SidebarItemTitle>
        <SidebarItemCounter className="counter">{props.counter}</SidebarItemCounter>
    </SidebarItemWrapper>
);

const MapLink = Glamorous(XLink)({
    color: '#5640d6'
});

const TableFooterContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#6b7c93',
    fontSize: '13px',
    lineHeight: '1.6',
    whiteSpace: 'pre',
    '& > div': {
        display: 'flex',
        alignItems: 'center',
    }
});

const FolderItems = withFolderItems(withQueryLoader((props) => {
    return (
        <>
            {props.data.items.pageInfo.itemsCount > 0 && (
                <TableParcels items={props.data.items.edges.map((v) => v.node.parcel)} />
            )}
            {props.data.items.pageInfo.itemsCount > 0 && (

                <XFooter text={props.data.items.pageInfo.itemsCount + (props.data.items.pageInfo.itemsCount === 1 ? ' item' : ' items')}>

                    <TableFooterContent>
                        <XHorizontal>
                            {props.data.items.pageInfo.pagesCount > 1 && <span>page: {props.data.items.pageInfo.currentPage}</span>}

                            {props.data.items.pageInfo.currentPage > 1 && (
                                <XButton text="Prev" query={{ field: 'page', value: (props.data.items.pageInfo.currentPage - 1).toString() }} />
                            )}
                            {(props.data.items.pageInfo.currentPage < props.data.items.pageInfo.pagesCount - 1) && (
                                <XButton text="Next" query={{ field: 'page', value: (props.data.items.pageInfo.currentPage + 1).toString() }} />
                            )}
                        </XHorizontal>
                    </TableFooterContent>

                </XFooter>
            )}
            {props.data.items.pageInfo.itemsCount <= 0 && (
                <XEmpty icon="folder" text="Add parcels from the " flexGrow={1} >
                    <MapLink path="/map">Map</MapLink>
                    {' tab'}
                </XEmpty>
            )}
        </>
    );
})) as React.ComponentClass<{ folderName: string }>;

const MapContainer2 = Glamorous.div<{ noParcels: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    height: 'calc(100vh - 76px)',
    width: '100%',

    '& .mapboxgl-ctrl-top-right': {
        left: '18px !important',
        bottom: '18px !important',
        top: 'auto',
        right: 'auto',
        zIndex: 0,
        '& .mapboxgl-ctrl-group': {
            border: 'none',
            borderTopRightRadius: props.noParcels ? 0 : undefined,
            borderBottomRightRadius: props.noParcels ? 0 : undefined,
            boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',

            '& .mapboxgl-ctrl-zoom-in': {
                borderBottom: 'solid 1px #c1c7cf4d',
                // backgroundImage: 'url(\'/static/X/zoomin.svg\')'
            },

            '& .mapboxgl-ctrl-zoom-out': {
                borderBottom: 'none !important',
                // backgroundImage: 'url(\'/static/X/zoomin.svg\')'
            },
            '& .mapboxgl-ctrl-compass': {
                display: 'none !important'
            }
        }
    },
    '& .mapboxgl-ctrl-bottom-left': {
        display: 'none'
    }
}));

const MapContainer = Glamorous.div({
    flexGrow: 1,
});

const NoParcelsMessage = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 233,
    left: 48,
    bottom: 78,
    height: 60,
    zIndex: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    background: 'white',
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
    color: '#A7B8C4',
    cursor: 'pointer',
    '> span': {
        color: '#334562'
    },
    ':hover': {
        color: '#5640d6',
        '> span': {
            color: '#5640d6',
        }

    }
});

const NoParcelsMessageIcon = Glamorous(XIcon)({
    marginLeft: 14,
    marginRight: 10,
});

class FolderMap extends React.Component<XWithRouter, { zoomToSmallForParcels: boolean, mapLoaded: boolean }> {
    knownCameraLocation?: XMapCameraLocation;
    map?: mapboxgl.Map;

    constructor(props: XWithRouter) {
        super(props);
        if (canUseDOM) {
            let k = sessionStorage.getItem('__folders_location');
            if (k != null) {
                this.knownCameraLocation = JSON.parse(k);
            }
        }

        this.state = {
            zoomToSmallForParcels: false,
            mapLoaded: false,
        };
    }

    onMapLoaded = (map: mapboxgl.Map) => {
        this.map = map;
        if (!this.state.mapLoaded) {
            this.setState({
                mapLoaded: true
            });
        }
    }

    handleMap = (e: XMapCameraLocation) => {
        sessionStorage.setItem('__folders_location', JSON.stringify(e));
        this.knownCameraLocation = e;
        let zoomToSmallForParcels = e.zoom < 12;
        if (zoomToSmallForParcels !== this.state.zoomToSmallForParcels) {
            this.setState({ zoomToSmallForParcels: zoomToSmallForParcels });
        }
    }

    handleParcelClick = (id: string) => {
        trackEvent('Folder Map view Parcel', { id: id });
        this.props.router.pushQuery('selectedParcel', id);
    }
    handleItemClick = (id: string, item: any) => {
        if (item.properties && item.properties.parcelId) {
            this.handleParcelClick(item.properties.parcelId as string);
        }
    }

    resolveCity = () => {
        let defaultCity = 'nyc';
        let pendingCity = this.props.router.routeQuery.city || defaultCity;
        return pendingCity;
    }

    render() {
        let city = this.resolveCity();
        let focus = city === 'sf'
            ? { latitude: 37.75444398077139, longitude: -122.43963811583545, zoom: 12 }
            : { latitude: 40.713919, longitude: -74.002332, zoom: 12 };
        return (
            <MapContainer2 noParcels={this.state.zoomToSmallForParcels}>
                <MapContainer>
                    <ParcelMap
                        onLoaded={this.onMapLoaded}
                        mode={this.props.router.query.mode}
                        focusPosition={focus}
                        lastKnownCameraLocation={this.knownCameraLocation}
                        onCameraLocationChanged={this.handleMap}
                        onParcelClick={this.handleParcelClick}
                        selectedParcel={this.props.router.routeQuery.selectedParcel}
                    >

                        <FolderTileSource
                            layer="folder"
                            minZoom={9}
                            variables={{
                                folderId: this.props.router.routeQuery.folderId,
                            }}
                        />

                        <XMapImageLayer
                            source="folder"
                            layer="folder"
                            minZoom={9}
                            onClick={this.handleItemClick}
                            flyToMaxZoom={18}
                            image="/static/img/icons/pin1.png"
                            clusterColor="#e8bd58"
                        />
                    </ParcelMap>

                    {this.state.mapLoaded && (
                        <>

                            <CitySelector title={city === 'sf' ? 'San Francisco' : 'New York City'} width={160}>
                                <CitySelector.Item
                                    query={{ field: 'city', value: 'sf' }}
                                    active={city === 'sf'}
                                    label="San Francisco"
                                />
                                <CitySelector.Item
                                    query={{ field: 'city', value: 'nyc' }}
                                    active={city !== 'sf'}
                                    label="New York City"
                                />
                            </CitySelector>
                        </>
                    )}

                    {this.state.zoomToSmallForParcels && (
                        <NoParcelsMessage
                            onClick={() => {
                                if (this.map) {
                                    this.map.jumpTo({
                                        zoom: 12,
                                    });
                                }
                            }}
                        >
                            <NoParcelsMessageIcon icon="info" />
                            <span>Zoom in to see parcel grid</span>

                        </NoParcelsMessage>
                    )}

                </MapContainer>
                {this.props.router.routeQuery.selectedParcel && <ParcelCard compact={true} variables={{ parcelId: this.props.router.routeQuery.selectedParcel }} />}

            </MapContainer2>
        );
    }
}

const FolderExportTask = withFolderExportTask((props) => {

    const downloadNoTab = (downloadLink: string, folderName: string) => {
        var link = document.createElement('a');
        link.setAttribute('href', downloadLink);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {props.task.status !== 'COMPLETED' && <XButton onClick={() => props.task.startTask({ folderId: (props as any).folderId })} text="Export" alignSelf="flex-start" loading={props.task.status === 'IN_PROGRESS'} />}
            {props.task.status === 'COMPLETED' && <XButton onClick={() => downloadNoTab(props.task.result!!.downloadLink, 'folder')} text={'Download export.csv'} alignSelf="flex-start" />}
        </>
    );
}) as React.ComponentClass<{ folderId: string }>;

const FolderContent = withFolder((props) => {
    if (props.data.loading) {
        return <XLoader loading={true} />;
    }
    return (
        <>
            <XHeader text={props.data.folder.name}>
                <XButton text={props.router.routeQuery.mapView !== 'true' ? 'Map view' : 'Table view'} query={{ field: 'mapView', value: props.router.routeQuery.mapView !== 'true' ? 'true' : 'false' }} />
                <Edit variables={{ folderId: props.data.folder.id }} folderName={props.data.folder.name} />

                {props.router.routeQuery.mapView !== 'true' && (
                    <FolderExportTask folderId={props.data.folder.id} />
                )}
            </XHeader>
            {props.router.routeQuery.mapView === 'true' && <FolderMap router={props.router} />}
            {props.router.routeQuery.mapView !== 'true' && <FolderItems folderName={props.data.folder.name} />}
        </>
    );
});

const NoFoldersTextContainer = Glamorous.div({
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    textAlign: 'start',
    alignItems: 'center',
});

const EmptyWithMargin = Glamorous(XEmpty)({
    flexGrow: 1
});

const NewFolderForPlaceholder = Glamorous(CreateFolderButton)({
    '&::after': {
        display: 'none',
    }
});

export default withApp('Folders', 'viewer', withFolders(withQueryLoader((props) => {

    return (
        <>
            <XDocumentHead title={['Folders']} />
            <Scaffold>
                <Scaffold.Menu>
                    <Sidebar title="Folders">
                        {props.data.folders.map((v) => {
                            const type = v.special;
                            let icon = '';
                            switch (type) {
                                case 'ALL':
                                    icon = 'star';
                                    break;
                                case 'FAVORITES':
                                    icon = 'favorite';
                                    break;
                                default:
                                    icon = 'folder';
                            }
                            return (
                                <SidebarItem key={v.id} path={'/folders/' + v.id + '?mapView=' + !!(props.router.routeQuery.mapView)} icon={icon} title={v.name} counter={v.parcelsCount} />
                            );
                        })}
                        <CreateFolder />
                    </Sidebar>
                </Scaffold.Menu>
                <Scaffold.Content padding={false} bottomOffset={props.router.routeQuery.mapView !== 'true'}>
                    {!props.router.routeQuery.folderId && props.data.loading && <XLoader loading={true} />}
                    {!props.data.loading && (!props.router.routeQuery.folderId || props.data.folders.map(folder => folder.id).indexOf(props.router.routeQuery.folderId) === -1) && props.data.folders.length > 0 &&
                        (
                            <XPageRedirect path={'/folders/' + props.data.folders[0].id} />
                        )}
                    {!props.data.loading && props.router.routeQuery.folderId && props.data.folders.length === 0 && (
                        <XPageRedirect path={'/folders/'} />

                    )}
                    {!props.data.loading && !props.router.routeQuery.folderId && props.data.folders && props.data.folders.length <= 0 && (
                        <EmptyWithMargin icon="folder">
                            <NoFoldersTextContainer>

                                You can organize parcels with folders
                            <CreateFolder target={(<NewFolderForPlaceholder />)} />
                            </NoFoldersTextContainer>

                        </EmptyWithMargin>
                    )}
                    {props.router.routeQuery.folderId && <FolderContent variables={{ folderId: props.router.routeQuery.folderId }} />}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));
