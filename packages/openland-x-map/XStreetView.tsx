import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';

interface XStreetViewProps {
    className?: string;
    location: {
        latitude: number,
        longitude: number
    };
}

const EmptyCard = Glamorous.div({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: -0.4,
    color: '#334562',
    '& img': {
        width: 34,
        marginBottom: 21
    }
});

export class XStreetView extends React.Component<XStreetViewProps, { google?: GoogleMapsLoader.google | null, streetFound: boolean }> {

    private _isMounted = true;
    private pano: google.maps.StreetViewPanorama | null = null;

    constructor(props: XStreetViewProps) {
        super(props);
        this.state = {
            streetFound: false
        };
    }

    render() {
        return (
            <>
                {this.state.streetFound && (
                    <div className={this.props.className} />
                )}
                {!this.state.streetFound && (
                    <EmptyCard>
                        <img src="/static/X/street-view-man.svg"/>
                        <span>No street view available for this parcel :(</span>
                    </EmptyCard>
                )}
            </>
        );
    }

    componentDidMount() {
        this._isMounted = true;
        import('google-maps').then((GoogleMapsLoader) => {
            (GoogleMapsLoader as any).KEY = 'AIzaSyCSTFJaDPunRulhGV17tg_CUmosCZ0ks_8';
            GoogleMapsLoader.load((google) => {
                if (!this._isMounted) {
                    return;
                }
                if (google) {
                    const streetView = new google.maps.StreetViewService();
                    const dest = { lat: this.props.location.latitude, lng: this.props.location.longitude };
                    streetView.getPanorama(
                        {
                            location: dest,
                            radius: 50,
                            source: google.maps.StreetViewSource.OUTDOOR
                        },
                        (data, status) => {
                            if (status === google.maps.StreetViewStatus.OK) {
                                if (!this._isMounted) {
                                    return;
                                }
                                this.setState({
                                    streetFound: true
                                });
                                console.warn('New Panorama');
                                let node = ReactDOM.findDOMNode(this);
                                const panorama = new google.maps.StreetViewPanorama(node as Element, { scrollwheel: false });
                                panorama.setPano(data!!.location!!.pano!!);
                                const heading = google.maps.geometry.spherical
                                    .computeHeading(data!!.location!!.latLng!!, new google.maps.LatLng(dest.lat, dest.lng));
                                panorama.setPov({
                                    heading,
                                    pitch: 0,
                                });
                                panorama.setVisible(true);
                            }
                        });
                }
            });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        if (this.pano) {
            this.pano.setVisible(false);
        }
    }
}