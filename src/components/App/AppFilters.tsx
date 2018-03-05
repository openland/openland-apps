import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from '../X/XButton';
import { XModal } from '../X/XModal';
import { XSelect, XSelectProps } from '../X/XSelect';
// import { XIcon } from '../X/XIcon';
import { withRouter, RouterState } from '../../utils/withRouter';

let AllLandUse = [
    'Residental',
    'Mixed Use',
    'Commercial',
    'Industrial',
    'Public',
]

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

const ApplyButtonDiv = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    boxShadow: '0 0 0 1px #e6ebf1'
})

const FilterCellDiv = Glamorous.div({
    width: '100%',
    marginBottom: 32
})

const FilterCellTitle = Glamorous.div({
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 1.71,
    textAlign: 'left',
    color: '#182642',
})

const FilterSelector = Glamorous(XSelect)({
    width: '100%'
});

const RoutedSelector = withRouter<XSelectProps & { fieldName: string }>((props) => {
    let { fieldName, ...other } = props;
    let val = props.router.query!![fieldName] ? JSON.parse(props.router.query!![fieldName]) : undefined;

    return (
        <FilterSelector {...other}
            onChange={(v) => {
                console.warn(v);
                let value = undefined;
                if (v) {
                    if (Array.isArray(v)) {
                        if (v.length > 0) {
                            value = JSON.stringify(v.map((r: any) => r.value));
                        }
                    } else {
                        value = JSON.stringify((v as any).value);
                    }
                }
                props.router.pushQuery(fieldName, value);
            }}
            value={val}
        />
    );
});

function FilterCell(props: { title?: string, children: any }) {
    return (
        <FilterCellDiv>
            {props.title && <FilterCellTitle>{props.title}</FilterCellTitle>}
            {props.children}
        </FilterCellDiv>
    )
}

// const FilterCheckboxDiv = Glamorous.div<{ active: boolean }>((props) => ({
//     width: '45%',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     float: 'left',
//     '> input': {
//         display: 'none'
//     },
//     '> label': {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         fontSize: 14,
//         fontWeight: 'normal',
//         lineHeight: 1.71,
//         color: props.active ? '#4428e0' : '#525f7f',
//         cursor: 'pointer',
//         '> i': {
//             width: 14,
//             height: 14,
//             borderRadius: 2,
//             color: '#fff',
//             backgroundColor: props.active ? '#4428e0' : '#fff',
//             border: '1px solid rgba(82, 95, 127, 0.2)',
//             fontSize: 13,
//             lineHeight: '12px',
//             marginRight: 8
//         },
//     }
// }))

// class FilterCeckbox extends React.Component<{ label: string }, { isChecked: boolean }> {
//     constructor(props: { label: string }) {
//         super(props)

//         this.state = {
//             isChecked: false
//         }

//         this.handleChange = this.handleChange.bind(this)
//     }

//     handleChange() {
//         this.setState({
//             isChecked: !this.state.isChecked
//         })
//     }

//     render() {
//         const id = `toggle_${Math.random().toString().replace(/0\./, '')}`

//         return (
//             <FilterCheckboxDiv active={this.state.isChecked}>
//                 <input onChange={this.handleChange} id={id} type="checkbox" checked={this.state.isChecked} />
//                 <label htmlFor={id}>
//                     <XIcon icon={this.state.isChecked ? 'done' : ''} />
//                     <span>{this.props.label}</span>
//                 </label>
//             </FilterCheckboxDiv>
//         )
//     }
// }

const RangeInput = Glamorous.input({
    minWidth: 98,
    height: 40,
    boxSizing: 'border-box',
    border: '1px solid rgba(24, 38, 66, 0.2)',
    borderRadius: 4,
    color: '#525f7f',
    backgroundColor: '#fff',
    fontSize: 14,
    lineHeight: 1.71,
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    outline: 'none',
    '&:focus': {
        outline: 'none'
    }
})

const FilterRangeDiv = Glamorous.div({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 1.71,
    color: '#182642'
})

const FilterRangeSeparator = Glamorous.p({
    display: 'block',
    marginLeft: 12,
    marginRight: 12
})

interface FilterRangeProps {
    placeholderFrom?: string,
    placeholderTo?: string
}

const FilterRange = withRouter<FilterRangeProps>((props) => {

    let area: { gte?: number | string, lte?: number | string } = (props.router.query!!.area) ? JSON.parse(props.router.query!!.area) : { gte: '', lte: '' }

    let handleChange = (val: object) => {
        props.router.pushQuery('area', JSON.stringify(val));
    }

    return (
        <FilterRangeDiv>
            <RangeInput
                type="number"
                placeholder={props.placeholderFrom}
                onChange={(e: any) => {
                    console.warn(e);
                    area.gte = parseInt(e.target.value, 10) || '';
                    handleChange(area);
                }}
                value={area.gte || ''}
            />
            <FilterRangeSeparator> - </FilterRangeSeparator>
            <RangeInput
                type="number"
                placeholder={props.placeholderTo}
                onChange={(e: any) => {
                    console.warn(e);
                    area.lte = parseInt(e.target.value, 10) || '';
                    handleChange(area);
                }}
                value={area.lte || ''}
            />
        </FilterRangeDiv>
    )
})

class AppFiltersImpl extends React.Component<{ isActive?: boolean, onChange: (query?: any) => void, router: RouterState }> {

    private modal: XModal | null = null;

    constructor(props: { onChange: (query?: any) => void, router: RouterState }) {
        super(props);
    }

    handleUpdate = (e: any) => {
        e.preventDefault();
        let clauses: any[] = [];
        if (this.props.router.query!!.filterZoning) {
            clauses.push({ 'zone': JSON.parse(this.props.router.query!!.filterZoning) });
        }
        if (this.props.router.query!!.landUse) {
            clauses.push({ 'landUse': JSON.parse(this.props.router.query!!.landUse) });
        }
        if (this.props.router.query!!.filterStories) {
            clauses.push({ 'stories': JSON.parse(this.props.router.query!!.filterStories) });
        }
        if (this.props.router.query!!.filterCurrentUse) {
            clauses.push({ 'currentUse': JSON.parse(this.props.router.query!!.filterCurrentUse) });
        }
        if (this.props.router.query!!.filterOnSale) {
            clauses.push({ 'onSale': JSON.parse(this.props.router.query!!.filterOnSale) });
        }
        if (this.props.router.query!!.filterTransit) {
            clauses.push({
                'transitDistance': {
                    lt: parseInt(JSON.parse(this.props.router.query!!.filterTransit), 10)
                }
            });
        }
        if (this.props.router.query!!.area) {
            clauses.push({
                'area': JSON.parse(this.props.router.query!!.area)
            })
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
            <XModal title="Parcel filters" fullScreen={true} ref={this.handleInstance} width={320}>
                <XModal.Target>
                    <XButton bounce={true} style={this.props.isActive ? 'dark' : 'normal'}>Filters</XButton>
                </XModal.Target>
                <XModal.Content>
                    <FilterCell title="Zoning">
                        <RoutedSelector
                            fieldName="filterZoning"
                            options={AllZones.map((v) => ({ value: v, label: v }))}
                            placeholder="Zoning Code"
                            multi={true}
                        />
                    </FilterCell>
                    <FilterCell title="Land Use">
                        <RoutedSelector
                            fieldName="filterLandUse"
                            options={AllLandUse.map((v) => ({ value: v, label: v }))}
                            placeholder="Land Use"
                            multi={true}
                        />
                    </FilterCell>
                    <FilterCell title="Stories">
                        <RoutedSelector
                            fieldName="filterStories"
                            options={[
                                { value: '0', label: 'no stories' },
                                { value: '1', label: '1 story' },
                                { value: '2', label: '2 stories' },
                                { value: '3', label: '3 stories' },
                                { value: '4', label: '4 stories' }]}
                            placeholder="Stories"
                        />
                    </FilterCell>
                    <FilterCell title="Current Use">
                        <RoutedSelector
                            fieldName="filterCurrentUse"
                            options={[{ value: 'PARKING', label: 'Parking' }, { value: 'STORAGE', label: 'Storage' }]}
                            placeholder="Current Use"
                        />
                    </FilterCell>
                    <FilterCell title="On Sale">
                        <RoutedSelector
                            fieldName="filterOnSale"
                            options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]}
                            placeholder="On Sale"
                        />
                    </FilterCell>
                    <FilterCell title="Nearest Transit">
                        <RoutedSelector
                            fieldName="filterTransit"
                            options={[
                                { value: '60', label: '< 200 feet' },
                                { value: '243', label: '< 800 feet' },
                                { value: '457', label: '< 1500 feet' },
                                { value: '1220', label: '< 4000 feet' },
                                { value: '2430', label: '< 8000 feet' }]}
                            placeholder="Distance"
                        />
                    </FilterCell>
                    {/* <FilterCell title="Collections">
                        <FilterCeckbox label="Single story" />
                        <FilterCeckbox label="Stories count" />
                        <FilterCeckbox label="Parcel area" />
                        <FilterCeckbox label="Buildings count" />
                    </FilterCell> */}
                    <FilterCell title="Area">
                        <FilterRange placeholderFrom="1000 ft" placeholderTo="1000000 ft" />
                    </FilterCell>
                    <ApplyButtonDiv>
                        <XButton style="dark" size="medium" bounce={true} onClick={this.handleUpdate}>Apply</XButton>
                    </ApplyButtonDiv>
                </XModal.Content>
            </XModal>
        );
    }
}

export const AppFilters = withRouter<{ isActive?: boolean, onChange: (query?: any) => void }>(AppFiltersImpl);