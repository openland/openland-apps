import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from '../X/XButton';
import { XModalTargeted } from '../X/XModalTargeted';
import { XSelect, XSelectProps } from '../X/XSelect';
import { XWithRole } from '../X/XWithRole';
import XStyles from '../X/XStyles';
import { XFilterInput } from '../X/XFilterInput';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';

let AllLandUse = [
    'Residental',
    'Mixed Use',
    'Commercial',
    'Industrial',
    'Public',
];

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

let AllNYCZOnes = [
    'R5',
    'R4',
    'R6',
    'R3-2',
    'R3A',
    'R6B',
    'R3-1',
    'R3X',
    'R4-1',
    'R2',
    'R2A',
    'R5B',
    'R4A',
    'R6A',
    'R4B',
    'R7-1',
    'R1-2',
    'M1-1',
    'R7A',
    'R7-2',
    'R8B',
    'R5D',
    'R8',
    'R5A',
    'R7B',
    'PARK',
    'M1-2',
    'M3-1',
    'C8-1',
    'C4-3',
    'C4-2',
    'M2-1',
    'R1-1',
    'R8A',
    'R1-2A',
    'M1-4',
    'C6-2A',
    'M1-2/R6A',
    'C4-4A',
    'R10',
    'C8-2',
    'C1-9',
    'M1-2D',
    'R2X',
    'C4-4',
    'C4-2A',
    'R10A',
    'R7D',
    'C6-2',
    'C6-4',
    'C4-3A',
    'M1-6',
    'C3A',
    'C5-3',
    'C6-1',
    'M1-5B',
    'C8-3',
    'C1-6',
    'R7X',
    'C4-5X',
    'C3',
    'C2-8',
    'C5-2',
    'C6-1G',
    'C1-6A',
    'C4-1',
    'M1-5',
    'M1-3',
    'M1-1D',
    'C4-4L',
    'C1-8X',
    'R9A',
    'C6-3',
    'C5-1',
    'M1-4/R6B',
    'M1-2/R6B',
    'C6-3A',
    'C6-4.5',
    'C6-4A',
    'M1-4D',
    'C6-6',
    'C5-5',
    'C5-2.5',
    'M1-5A',
    'M1-4/R7A',
    'M1-2/R6',
    'C4-4D',
    'R9',
    'C6-2G',
    'C4-5D',
    'C4-6A',
    'C1-8A',
    'M1-2/R5B',
    'C2-6',
    'C6-4M',
    'M1-1/R7-2',
    'PARKNYS',
    'M1-2/R5D',
    'M3-2',
    'R8X',
    'M1-5/R7-3',
    'C4-7',
    'M1-5M',
    'C2-7A',
    'C4-6',
    'C1-9A',
    'C2-8A',
    'C4-5',
    'C8-4',
    'C1-7A',
    'C1-7',
    'C6-3X',
    'C6-4X',
    'C6-5',
    'C5-P',
    'M1-5/R9',
    'M2-4',
    'M1-6/R10',
    'M2-3',
    'C6-2M',
    'C7',
    'C6-7T',
    'R9X',
    'C5-2A',
    'M1-4/R6A',
    'C4-5A',
    'C6-5.5',
    'M1-1/R5',
    'C6-7',
    'M1-4/R8A',
    'M1-6D',
    'PARKUS',
    'C2-6A',
    'M1-3/R7X',
    'C5-4',
    'BPC',
    'C6-9',
    'C6-6.5',
    'M1-1/R7D',
    'M1-5/R7-2',
    'M1-5/R7X',
    'M1-4/R7X',
    'M1-5/R8A',
    'C2-7',
    'R7-3',
    'ZR 11-151',
    'R10H',
    'C6-3D',
    'M1-6/R9',
    'C5-1A',
    'M1-2/R8A',
    'C1-8',
    'M1-3/R8',
    'C6-1A',
    'C4-2F',
    'M1-5/R9-1',
    'M1-2/R8',
    'M1-5/R10',
    'M2-2',
    'M1-4/R7-2',
    'M1-2/R7A',
    'ZNA'
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
});

const FilterCellDiv = Glamorous.div({
    width: '100%',
    marginBottom: 32
});

const FilterCellTitle = Glamorous.div({
    marginBottom: 8,
    ...XStyles.text.h500,
    textAlign: 'left',
    color: '#182642',
});

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
    );
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
    height: 28,
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: 4,
    color: '#525f7f',
    backgroundColor: '#fff',
    fontSize: '14px',
    lineHeight: 1.6,
    paddingTop: 2,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
    '&:focus': {
        border: '1px solid transparent',
        boxShadow: '0 0 0 1px rgba(50, 50, 93, 0), 0 0 0 1px rgba(50, 151, 211, .2), 0 0 0 2px rgba(50, 151, 211, .25), 0 1px 1px rgba(0, 0, 0, .08)'
    },
    '&::placeholder': {
        color: '#C1CAD2'
    }
});

const FilterRangeDiv = Glamorous.div({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 1.71,
    color: '#182642'
});

const FilterRangeSeparator = Glamorous.p({
    display: 'block',
    marginLeft: 12,
    marginRight: 12
});

interface FilterRangeProps {
    placeholderFrom?: string;
    placeholderTo?: string;
}

class FilterRangeBase extends React.Component<FilterRangeProps & XWithRouter, { from: string, fromValue?: number, to: string, toValue?: number }> {
    constructor(props: FilterRangeProps & XWithRouter) {
        super(props);

        let fromCurrent = undefined;
        let fromCurrentValue = undefined;
        let toCurrent = undefined;
        let toCurrentValue = undefined;
        if (props.router.query && props.router.query.area) {
            let parsed = JSON.parse(props.router.query.area) as { gte?: number, lte?: number };
            if (parsed.gte !== undefined) {
                fromCurrentValue = parsed.gte;
                fromCurrent = parsed.gte.toString();
            }
            if (parsed.lte !== undefined) {
                toCurrentValue = parsed.lte;
                toCurrent = parsed.lte.toString();
            }
        }
        this.state = {
            from: fromCurrent || '',
            fromValue: fromCurrentValue,
            to: toCurrent || '',
            toValue: toCurrentValue
        };
    }

    handleChangeFrom = (e: any) => {
        let value = e.target.value as string;
        if (value === '') {
            this.setState({ from: '', fromValue: undefined });
            this.updateRouter();
            return;
        }
        if (value.indexOf('.') >= 0) {
            return;
        }
        let nvalue = parseInt(value, 10);
        if (Number.isNaN(nvalue)) {
            return;
        }
        this.setState({ from: value, fromValue: nvalue });
        this.updateRouter();
    }
    handleChangeTo = (e: any) => {
        let value = e.target.value as string;
        if (value === '') {
            this.setState({ to: '', toValue: undefined });
            this.updateRouter();
            return;
        }
        if (value.indexOf('.') >= 0) {
            return;
        }
        let nvalue = parseInt(value, 10);
        if (Number.isNaN(nvalue)) {
            return;
        }
        this.setState({ to: value, toValue: nvalue });
        this.updateRouter();
    }

    handleBlurTo = () => {
        if (this.state.toValue !== undefined && this.state.fromValue !== undefined) {
            if (this.state.toValue < this.state.fromValue) {
                this.setState({ to: this.state.fromValue.toString(), toValue: this.state.fromValue });
            }
        }
    }
    handleBlurFrom = () => {
        if (this.state.fromValue !== undefined && this.state.toValue !== undefined) {
            if (this.state.toValue < this.state.fromValue) {
                this.setState({ from: this.state.toValue.toString(), fromValue: this.state.toValue });
            }
        }
    }

    updateRouter = () => {
        setTimeout(
            () => {
                if (this.state.fromValue === undefined && this.state.toValue === undefined) {
                    this.props.router.pushQuery('area');
                } else {
                    this.props.router.pushQuery('area', JSON.stringify({
                        gte: this.state.fromValue,
                        lte: this.state.toValue
                    }));
                }
            },
            100);
    }

    render() {
        return (
            <FilterRangeDiv>
                <RangeInput
                    type="text"
                    pattern="[0-9]*"
                    placeholder={this.props.placeholderFrom}
                    onChange={this.handleChangeFrom}
                    value={this.state.from}
                    onBlur={this.handleBlurFrom}
                />
                <FilterRangeSeparator> - </FilterRangeSeparator>
                <RangeInput
                    type="text"
                    pattern="[0-9]*"
                    placeholder={this.props.placeholderTo}
                    onChange={this.handleChangeTo}
                    value={this.state.to}
                    onBlur={this.handleBlurTo}
                />
            </FilterRangeDiv>
        );
    }
}

const FilterRange = withRouter<FilterRangeProps>(FilterRangeBase);

interface AppFiltersProps {
    isActive?: boolean;
    onChange: (query?: any) => void;
    city?: string;
}

const StyledInput = Glamorous(XFilterInput)({
    display: 'flex',
    height: 28,
    width: 320,
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: 4,
    color: '#525f7f',
    backgroundColor: '#fff',
    fontSize: '14px',
    lineHeight: 1.6,
    paddingTop: 2,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
    '&:focus': {
        border: '1px solid transparent',
        boxShadow: '0 0 0 1px rgba(50, 50, 93, 0), 0 0 0 1px rgba(50, 151, 211, .2), 0 0 0 2px rgba(50, 151, 211, .25), 0 1px 1px rgba(0, 0, 0, .08)'
    },
    '&::placeholder': {
        color: '#C1CAD2'
    }
});

class AppFiltersImpl extends React.Component<AppFiltersProps & XWithRouter> {

    private modal: XModalTargeted | null = null;

    constructor(props: { onChange: (query?: any) => void } & XWithRouter) {
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
        if (this.props.router.query!!.ownerName) {
            clauses.push({ 'ownerName': this.props.router.query.ownerName });
        }
        // ownerName
        if (this.props.router.query!!.filterCurrentUse) {
            clauses.push({ 'currentUse': JSON.parse(this.props.router.query!!.filterCurrentUse) });
        }
        if (this.props.router.query!!.isOkForTower) {
            clauses.push({ 'isOkForTower': JSON.parse(this.props.router.query!!.isOkForTower) });
        }
        if (this.props.router.query!!.publicOwner) {
            clauses.push({ 'ownerPublic': JSON.parse(this.props.router.query!!.publicOwner) });
        }
        let isVacantSet: boolean | undefined;
        if (this.props.router.query!!.isVacant) {
            if (JSON.parse(this.props.router.query!!.isVacant) === 'true') {
                isVacantSet = true;
            } else {
                isVacantSet = false;
            }
        }
        if (this.props.router.query!!.compatible) {
            isVacantSet = true;
            clauses.push({ 'compatibleBuildings': JSON.parse(this.props.router.query!!.compatible) });
        }
        if (isVacantSet !== undefined) {
            clauses.push({ 'isVacant': isVacantSet.toString() });
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
        if (this.props.router.query!!.customQuery) {
            let res = JSON.parse(this.props.router.query!!.customQuery) as string[];
            let q: any[] = [];
            for (let r of res) {
                q.push({
                    [r]: true
                });
            }
            clauses.push({
                '$or': q
            });
        }
        if (this.props.router.query!!.queryUrbyn2) {
            clauses.push({
                'customerUrbynQuery1': JSON.parse(this.props.router.query!!.queryUrbyn2)
            });
        }
        if (this.props.router.query!!.area) {
            let area = JSON.parse(this.props.router.query!!.area);
            area.gte = (area.gte * 0.092903);
            area.lte = (area.lte * 0.092903);
            clauses.push({
                'area': area
            });
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

    handleInstance = (e: XModalTargeted | null) => {
        if (e) {
            this.modal = e;
        }
    }

    render() {
        return (
            <XModalTargeted title="Parcel filters" fullScreen={true} ref={this.handleInstance} width={320}>
                <XModalTargeted.Target>
                    <XButton bounce={true} style={this.props.isActive ? 'dark' : 'normal'}>Filters</XButton>
                </XModalTargeted.Target>
                <XModalTargeted.Content>
                    {this.props.city === 'sf' && (
                        <>
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
                                    multi={true}
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
                            <FilterCell title="Tower opportunity">
                                <RoutedSelector
                                    fieldName="isOkForTower"
                                    options={[{ value: 'true', label: 'Yes (90+ height, 0-2 stories now)' }, { value: 'false', label: 'No' }]}
                                    placeholder="Tower opportunity"
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
                        </>
                    )}
                    <FilterCell title="Owner name">
                        <StyledInput
                            searchKey="ownerName"
                            placeholder="Owner name"
                        />
                    </FilterCell>
                    <FilterCell title="Zoning">
                        <RoutedSelector
                            fieldName="filterZoning"
                            options={AllNYCZOnes.map((v) => ({ value: v, label: v }))}
                            placeholder="Zoning code"
                            multi={true}
                        />
                    </FilterCell>
                    <FilterCell title="Vacant">
                        <RoutedSelector
                            fieldName="isVacant"
                            options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]}
                            placeholder="Vacant"
                        />
                    </FilterCell>
                    <FilterCell title="Publicly owned">
                        <RoutedSelector
                            fieldName="publicOwner"
                            options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]}
                            placeholder="Publicly owned"
                        />
                    </FilterCell>
                    <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                        <FilterCell title="Compatible buildings">
                            <RoutedSelector
                                fieldName="compatible"
                                options={[{ value: 'kasita-1', label: 'Elemynt-1' }, { value: 'kasita-2', label: 'Elemynt-2' }]}
                                placeholder="Building type"
                                multi={true}
                            />
                        </FilterCell>
                        {/* <FilterCell title="Public owners">
                            <RoutedSelector
                                fieldName="customQuery"
                                options={[
                                    { value: 'customerUrbynQuery1', label: 'Departments' },
                                    { value: 'customerUrbynQuery2', label: 'City of New York' },
                                    { value: 'customerUrbynQuery3', label: 'Abbreviations' }]}
                                placeholder="Public owners"
                                multi={true}
                            />
                        </FilterCell> */}
                    </XWithRole>
                    <FilterCell title="Area">
                        <FilterRange placeholderFrom="1000 ft" placeholderTo="1000000 ft" />
                    </FilterCell>
                    <ApplyButtonDiv>
                        <XButton style="dark" size="medium" bounce={true} onClick={this.handleUpdate}>Apply</XButton>
                    </ApplyButtonDiv>
                </XModalTargeted.Content>
            </XModalTargeted>
        );
    }
}

export const AppFilters = withRouter<AppFiltersProps>(AppFiltersImpl);