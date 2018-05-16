import * as React from 'react';
import * as Turf from '@turf/turf';
import Glamorous from 'glamorous';
import { XStreetViewPreview } from './XStreetViewPreview';
import { parseGeometry } from 'openland-x-utils/parseGeometry';
import { CityLocations } from 'openland-x-utils/CityLocations';

function loadCenter(src: string) {
    let center = Turf.center({ type: 'MultiPolygon', coordinates: parseGeometry(src) });
    return { latitude: center.geometry!!.coordinates[1], longitude: center.geometry!!.coordinates[0] };
}
const StyledStreetViewPreview = Glamorous(XStreetViewPreview)<{ width: number, height: number }>((props) => ({
    height: props.height,
    width: props.width
}));

interface StreetViewModalPreviewProps {
    location?: {
        latitude: number,
        longitude: number
    };
    geometry?: string;
    width: number;
    height: number;
}

export class XStreetViewModalPreview extends React.Component<StreetViewModalPreviewProps, { location: any }> {
    constructor(props: StreetViewModalPreviewProps) {
        super(props);

        this.state = {
            location: ''
        };
    }

    componentDidMount() {
        let center = CityLocations.sf;
        if (this.props.location) {
            center = this.props.location;
        } else if (this.props.geometry) {
            center = loadCenter(this.props.geometry);
        }
        this.setState({
            location: center
        });
    }

    render() {
        return (
            <StyledStreetViewPreview location={this.state.location} width={this.props.width} height={this.props.height} />
        );
    }
}