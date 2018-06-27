import * as React from 'react';
import { XModal } from 'openland-x-modal/XModal';
import { XMap, XMapProps } from 'openland-x-map/XMap';
import { XMapGeocoder, XMapGeocoderResult } from 'openland-x-map/XMapGeocoder';
import { XButton } from 'openland-x/XButton';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XInput } from 'openland-x/XInput';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XStoreContext } from 'openland-x-store/XStoreContext';

const MapSearcher = Glamorous(XMapGeocoder)({
    height: 52,
    top: 18,
    backgroundColor: 'transparent',
    left: 18,
    zIndex: 2,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    width: 325,

    '& .mapboxgl-ctrl-geocoder.mapboxgl-ctrl': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 36,
        paddingRight: 10,
        borderLeft: '1px solid #c1c7cf4d',
        backgroundImage: 'url(\'/static/img/icons/search-grey.svg\')',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'center',
        backgroundPositionX: 10,
        backgroundSize: 20,
        backgroundColor: '#fff',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        zIndex: 2,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        transition: 'all .2s',

        '& input': {
            width: '100%',
            height: '100%',
            fontSize: 16,
            lineHeight: 1.25,
            letterSpacing: 0.5,
            color: '#334562'
        },
        '& ul.suggestions': {
            position: 'absolute',
            top: 60,
            right: 0,
            width: 325,
            backgroundColor: '#fff',
            borderRadius: 6,
            boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
            listStyle: 'none',
            overflow: 'hidden',
            '& li': {
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.33,
                letterSpacing: 0.5,
                color: '#334562',
                height: 48,
                paddingLeft: 40,

                backgroundImage: 'url(\'/static/img/icons/icon-location-grey.svg\')',
                backgroundRepeat: 'no-repeat',
                backgroundPositionY: 'center',
                backgroundPositionX: 10,
                backgroundSize: 20,

                '&:hover': {
                    backgroundColor: '#f8f8fb',
                    backgroundImage: 'url(\'/static/img/icons/icon-location-purple.svg\')',
                },
                '& a': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    cursor: 'pointer',
                    paddingTop: 14
                }
            }
        }
    }
});

const MapContainer2 = Glamorous.div((props) => ({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    height: 'calc(100% - 50px)',
    width: '100%',

    '& .mapboxgl-ctrl-top-right': {
        left: '18px !important',
        bottom: '18px !important',
        top: 'auto',
        right: 'auto',
        zIndex: 0,
        '& .mapboxgl-ctrl-group': {
            border: 'none',
            boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',

            '& .mapboxgl-ctrl-zoom-in': {
                display: 'none',
                // borderBottom: 'solid 1px #c1c7cf4d',
                // backgroundImage: 'url(\'/static/X/zoomin.svg\')'
            },

            '& .mapboxgl-ctrl-zoom-out': {
                display: 'none',
                // borderBottom: 'none !important',
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

const JustMap = (props: XMapProps & { children?: any, mode?: 'satellite' | 'zoning', selectedParcel?: string, onParcelClick?: (id: string) => void }) => {
    let { children, mode, ...other } = props;
    let mapStyle = 'mapbox://styles/mapbox/light-v9';
    if (props.mode === 'zoning') {
        mapStyle = 'mapbox://styles/steve-kite/cje15jkmr3bvt2so3mu8nvsk6';
    }
    if (props.mode === 'satellite') {
        mapStyle = 'mapbox://styles/mapbox/satellite-v9';
    }
    return (
        <XMap mapStyle={mapStyle} {...other} key={props.mode || 'map'} scrollZoom={false}>
            {children}
        </XMap>
    );
};

const Footer = Glamorous(XHorizontal)({
    margin: 16,
    justifyContent: 'flex-end'
});

export interface XLocationPickerBaiscProps {
    onPicked?: (result: XMapGeocoderResult | null) => void;
    headerText?: string;
    confirmText?: string;
    clearText?: string;
    target?: any;
    targetQuery?: string;
    value?: XMapGeocoderResult;
    placeholder?: string;
}

class XLocationPickerModalBasic extends React.Component<XLocationPickerBaiscProps, { value?: XMapGeocoderResult, picked?: XMapGeocoderResult }> {

    constructor(props: XLocationPickerProps) {
        super(props);
        this.state = { picked: props.value, value: props.value };
    }

    onResult = (res: XMapGeocoderResult) => {
        this.setState({
            value: res
        });
    }

    onPicked = () => {
        this.setState({
            picked: this.state.value
        });

        if (this.props.onPicked && this.state.value) {
            this.props.onPicked(this.state.value);
        }

    }

    onClear = () => {
        this.setState({
            picked: undefined
        });
        if (this.props.onPicked) {
            this.props.onPicked(null);
        }

    }

    render() {
        let target = <XInput placeholder={(this.props.placeholder || 'Adress')} value={this.state.picked ? (this.state.picked.result.place_name || this.state.picked.result.text) : ''} />;
        return (
            <XModal
                targetQuery="pick"
                size="x-large"
                useTopCloser={true}
                bodyNoPadding={true}
                title={this.state.value ? (this.state.value.result.place_name || this.state.value.result.text) : this.props.headerText || 'Search for adress'}
                target={!this.props.targetQuery ? (this.props.target || target) : undefined}
                body={(
                    <MapContainer2>
                        <JustMap lastKnownCameraLocation={this.state.value ? { latitude: this.state.value.result.center[1], longitude: this.state.value.result.center[0], zoom: 17 } : undefined}>
                            <MapSearcher onResult={this.onResult} />
                        </JustMap>
                    </MapContainer2>
                )}
                footer={this.state.value ? (
                    <Footer>
                        {this.state.picked && <XButton text={this.props.clearText || 'Clear'} onClick={this.onClear} style="primary" autoClose={true} />}
                        <XButton text={this.props.confirmText || 'Ok'} onClick={this.onPicked} style="primary" autoClose={true} />
                    </Footer>
                ) : undefined}

            />
        );
    }
}

class XLocationPickerStored extends React.PureComponent<XLocationPickerProps & { store: XStoreState }> {
    handleChange = (location: XMapGeocoderResult | null) => {
        let key = this.props.valueStoreKey || ('fields.' + this.props.field);
        this.props.store.writeValue(key, location);
    }

    render() {
        let { valueStoreKey, field, ...other } = this.props;
        let key = this.props.valueStoreKey || ('fields.' + this.props.field);
        let value = this.props.store.readValue(key);

        return (
            <XLocationPickerModalBasic {...other} onPicked={this.handleChange} value={value} />
        );
    }
}

export interface XLocationPickerProps extends XLocationPickerBaiscProps {
    field?: string;
    valueStoreKey?: string;
}

export class XLocationPickerModal extends React.PureComponent<XLocationPickerProps> {
    render() {
        let { valueStoreKey, field, placeholder, ...other } = this.props;
        if (valueStoreKey || field) {
            let valueStoreKeyCached = valueStoreKey;
            let fieldCached = field;
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return (
                            <XLocationPickerStored
                                {...other}
                                valueStoreKey={valueStoreKeyCached}
                                field={fieldCached}
                                store={store}
                                placeholder={this.props.placeholder}
                            />
                        );
                    }}
                </XStoreContext.Consumer>
            );
        } else {
            return <XLocationPickerModalBasic {...other} />;
        }
    }
}
