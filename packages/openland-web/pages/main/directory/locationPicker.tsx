import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import Glamorous from 'glamorous';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';
import { XText } from 'openland-x/XText';

const VerticalScrollable = Glamorous(XVertical)({
    height: 200,
    width: 200,
    overflowY: 'scroll'
});

class EntriesComponent extends React.Component<{ title: string, options: string[], query: string, onPick: (q: SearchCondition) => void }> {
    render() {
        return (
            <XVertical>
                <XText textStyle="h500">{this.props.title}</XText>
                <VerticalScrollable>
                    {this.props.options.filter(e => e.split(' ').filter(s => this.props.query.length === 0 || s.toLowerCase().startsWith(this.props.query.toLowerCase())).length > 0).map((e, i) => <XMenuItem onClick={() => this.props.onPick({ type: 'location', value: e, label: e })} key={e + '_' + i}>{e}</XMenuItem>)}
                </VerticalScrollable>
            </XVertical>
        );
    }
}

const MultiStateRegions = [
    'West Coast',
    'East Coast',
    'Northeast',
    'Southeast',
    'Southwest',
    'Mideast',
    'Midwest',
    'New England',
    'Great Lakes',
    'Plains',
    'Rocky Mountains'
];
const States = [
    'California',
    'Texas',
    'Florida',
    'New York',
    'Pennsylvania',
    'Illinois',
    'Ohio',
    'Georgia',
    'North Carolina',
    'Michigan',
    'New Jersey',
    'Virginia',
    'Washington',
    'Arizona',
    'Massachusetts',
    'Tennessee',
    'Indiana',
    'Missouri',
    'Maryland',
    'Wisconsin',
    'Colorado',
    'Minnesota',
    'South Carolina',
    'Alabama',
    'Louisiana',
    'Kentucky',
    'Oregon',
    'Oklahoma',
    'Connecticut',
    'Iowa',
    'Utah',
    'Nevada',
    'Arkansas',
    'Mississippi',
    'Kansas',
    'New Mexico',
    'Nebraska',
    'West Virginia',
    'Idaho',
    'Hawaii',
    'New Hampshire',
    'Maine',
    'Montana',
    'Rhode Island',
    'Delaware',
    'South Dakota',
    'North Dakota',
    'Alaska',
    'District of Columbia',
    'Vermont',
];
const MetropolitanAreas = [
    'New York Metro Area',
    'Greater Los Angeles',
    'Chicagoland',
    'Dallas–Fort Worth',
    'Greater Houston',
    'Washington Metro Area',
    'Miami Metro Area',
    'Delaware Valley',
    'Atlanta Metro',
    'Greater Boston',
    'Phoenix Metro Area',
    'San Francisco Bay Area',
    'Inland Empire',
    'Metro Detroit',
    'Seattle Metro Area',
    'Twin Cities',
    'San Diego County',
    'Tampa Bay Area',
    'Denver Metro Area',
    'Baltimore Metro area',
    'Greater St. Louis',
    'Charlotte Metro',
    'Greater Orlando',
    'Greater San Antonio',
    'Greater Portland',
];
const Cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'Jacksonville',
    'Fort Worth',
    'San Francisco',
    'Columbus',
    'Charlotte',
    'Indianapolis',
    'Seattle',
    'Denver',
    'Washington Dc Dc',
    'El Paso',
    'Boston',
    'Nashville',
    'Detroit',
    'Portland',
    'Oklahoma City',
    'Las Vegas',
    'Memphis',
    'Louisville',
    'Baltimore',
    'Milwaukee',
    'Albuquerque',
    'Tucson',
    'Fresno',
    'Sacramento',
    'Mesa',
    'Kansas City',
    'Atlanta',
    'Colorado Springs',
    'Miami',
    'Raleigh',
    'Long Beach',
    'Virginia Beach',
    'Omaha',
    'Oakland',
    'Minneapolis',
    'Tulsa',
    'Arlington',
    'New Orleans',
    'Tampa',
    'Wichita',
    'Bakersfield',
    'Cleveland',
    'Aurora',
    'Anaheim',
    'Honolulu',
    'Santa Ana',
    'Riverside',
    'Corpus Christi',
    'Lexington Fayette',
    'Stockton',
    'Henderson',
    'St. Paul',
    'St. Louis',
    'Pittsburgh',
    'Cincinnati',
    'Anchorage',
    'Plano',
    'Orlando',
    'Greensboro',
    'Lincoln',
    'Irvine',
    'Newark',
    'Toledo',
    'Durham',
    'Chula Vista',
    'St. Petersburg',
    'Fort Wayne',
    'Jersey City',
    'Laredo',
    'Madison',
    'Scottsdale',
    'Lubbock',
    'Chandler',
    'Reno',
    'Buffalo',
    'Glendale',
    'North Las Vegas',
    'Gilbert',
    'Winston Salem',
    'Norfolk',
    'Chesapeake',
    'Irving',
    'Fremont',
    'Hialeah',
    'Garland',
    'Richmond',
    'Boise City',
    'Baton Rouge',
    'Spokane',
];

export class LocationPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { query: string, popper: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { query: '', popper: false };
    }
    handleChange = (v: string) => {
        this.setState({ query: v });
    }

    onPick = (q: SearchCondition) => {
        this.props.onPick(q);
        this.setState({ query: '', popper: false });
    }

    onEnter = () => {
        if (this.state.query.length === 0) {
            return;
        }
        this.onPick({ type: 'location', value: this.state.query, label: this.state.query });
    }

    switch = () => {
        this.setState({ popper: !this.state.popper });
    }

    close = () => {
        this.setState({ popper: false });
    }

    render() {
        let content = (
            <XVertical>
                <XInput value={this.state.query} onChange={this.handleChange} onEnter={this.onEnter} />
                <XHorizontal>
                    <EntriesComponent title="Multi-state regions" query={this.state.query} options={MultiStateRegions} onPick={this.onPick} />
                    <EntriesComponent title="States" query={this.state.query} options={States} onPick={this.onPick} />
                    <EntriesComponent title="Metropolitan areas" query={this.state.query} options={MetropolitanAreas} onPick={this.onPick} />
                    <EntriesComponent title="Cities" query={this.state.query} options={Cities} onPick={this.onPick} />
                </XHorizontal>
            </XVertical>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
            >
                <XButton text="Location" onClick={this.switch} />
            </XPopper>
        );
    }
}