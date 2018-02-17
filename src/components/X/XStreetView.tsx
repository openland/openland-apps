import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class XStreetView extends React.Component<{ className?: string, location: { latitude: number, longitude: number } }, { google?: GoogleMapsLoader.google | null }> {

    private _isMounted = true;

    constructor(props: { className?: string, location: { latitude: number, longitude: number } }) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div className={this.props.className} />);
    }

    componentDidMount() {
        this._isMounted = true;
        import('google-maps').then((GoogleMapsLoader) => {
            (GoogleMapsLoader as any).KEY = 'AIzaSyCSTFJaDPunRulhGV17tg_CUmosCZ0ks_8';
            GoogleMapsLoader.load((google) => {
                if (!this._isMounted) {
                    return
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
                                let node = ReactDOM.findDOMNode(this);
                                const panorama = new google.maps.StreetViewPanorama(node);
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
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}