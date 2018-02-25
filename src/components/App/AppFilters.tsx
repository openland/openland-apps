import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from '../X/XButton';
import { XModal } from '../X/XModal';
import { XSelect } from '../X/XSelect';

let AllZones = ['P',
    'RH-1(D)',
    'RH-1',
    'RH-1(S)',
    'RH-2',
    'RH-3',
    'RM-1',
    'RM-2',
    'RM-3',
    'RM-4',
    'RC-3',
    'RC-4',
    'RTO',
    'RTO-M',
    'RH DTR',
    'SB-DTR',
    'TB DTR',
    'NC-1',
    'NC-2',
    'NC-3',
    'NC-S',
    'NCD',
    'SPD',
    'RED',
    'RED-MX',
    'RSD',
    'SLR',
    'SLI',
    'SALI',
    'SSO',
    'MUG',
    'WMUG',
    'MUO',
    'WMUO',
    'MUR',
    'UMU',
    'RCD',
    'C-2',
    'C-3-S',
    'C-3-R',
    'C-3-G',
    'C-3-O',
    'C-3-O(S)',
    'MB-OS',
    'MB-O',
    'MB-RA',
    'HP-RA',
    'NCT-1',
    'NCT-2',
    'NCT-3',
    'NCT',
    'M-1',
    'M-2',
    'PDR-1-B',
    'PDR-1-D',
    'PDR-1-G',
    'PDR-2',
    'CRNC',
    'CVR',
    'CCB',
    'PM-MU1',
    'PM-MU2',
    'PM-S',
    'PM-CF',
    'PM-OS',
    'PM-R'
];

const FilterSelector = Glamorous(XSelect)({
    width: '140px'
});

export class AppFilters extends React.Component<{ isActive?: boolean, onChange: (query?: any) => void }, { zones?: any, stories?: any, currentUse?: any, onSale?: any }> {

    private modal: XModal | null = null;

    constructor(props: { onChange: (query?: any) => void }) {
        super(props);
        this.state = {};
    }

    handleZonesChange = (src: any) => {
        this.setState({ zones: src });
    }

    handleCurrentUseChange = (src: any) => {
        this.setState({ currentUse: src });
    }

    handleStoriesChange = (src: any) => {
        this.setState({ stories: src });
    }

    handleOnSaleChange = (src: any) => {
        this.setState({ onSale: src });
    }

    handleUpdate = (e: any) => {
        e.preventDefault();
        let clauses: any[] = [];
        if (this.state.zones && this.state.zones.value) {
            clauses.push({ 'zone': this.state.zones.value })
        }
        if (this.state.stories && this.state.stories.value) {
            clauses.push({ 'stories': this.state.stories.value })
        }
        if (this.state.currentUse && this.state.currentUse.value) {
            clauses.push({ 'currentUse': this.state.currentUse.value })
        }
        if (this.state.onSale && this.state.onSale.value) {
            clauses.push({ 'onSale': this.state.onSale.value })
        }
        if (clauses.length > 0) {
            let query = { '$and': clauses };
            this.props.onChange(query);
        } else {
            this.props.onChange(undefined);
        }

        if (this.modal) {
            this.modal!!.handleClose();
        }
    }

    handleInstance = (e: XModal | null) => {
        if (e) {
            this.modal = e;
        }
    }

    render() {
        return (
            <XModal title="Parcels filter" fullScreen={true} ref={this.handleInstance}>
                <XModal.Target>
                    <XButton bounce={true} style={this.props.isActive ? 'dark' : 'normal'}>Filters</XButton>
                </XModal.Target>
                <XModal.Content>
                    <FilterSelector
                        name="zoning-field"
                        value={this.state.zones}
                        options={AllZones.map((v) => ({ value: v, label: v }))}
                        onChange={this.handleZonesChange}
                        placeholder="Zoning"
                    />
                    <FilterSelector
                        name="address-field"
                        value={this.state.stories}
                        options={[
                            { value: '0', label: 'no stories' },
                            { value: '1', label: '1 story' },
                            { value: '2', label: '2 stories' },
                            { value: '3', label: '3 stories' },
                            { value: '4', label: '4 stories' }]}
                        onChange={this.handleStoriesChange}
                        placeholder="Stories"
                    />
                    <FilterSelector
                        name="current-field"
                        value={this.state.currentUse}
                        options={[{ value: 'PARKING', label: 'Parking' }, { value: 'STORAGE', label: 'Storage' }]}
                        onChange={this.handleCurrentUseChange}
                        placeholder="Current Use"
                    />
                    <FilterSelector
                        name="on-sale-field"
                        value={this.state.onSale}
                        options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]}
                        onChange={this.handleOnSaleChange}
                        placeholder="On Sale"
                    />
                    <XButton onClick={this.handleUpdate} alignSelf="center">Apply</XButton>
                </XModal.Content>
            </XModal>
        );
    }
}