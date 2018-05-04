import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from '../../X/XButton';
import { XCard } from '../../X/XCard';
// import { XIcon } from '../../X/XIcon';
import { Filter } from './PopperFilterButton';
import XStyles from '../../X/XStyles';
import { ChangeEvent } from 'react';
import { withRouter, XWithRouter } from '../../withRouter';
import { XSelect, XSelectProps } from '../../X/XSelect';
import { XHorizontal } from '../../X/XHorizontal';
import { XVertical } from '../../X/XVertical';

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

const FiltersContent = Glamorous.div({
    maxHeight: 'calc(100vh - 150px)',
    overflowY: 'scroll'
});

// const FilterCategoryTitle = Glamorous.div({
//     ...XStyles.text.m500,
//     marginBottom: 20
// });

const FIlterDescriptionWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12
});

const FilterDescription = Glamorous.div({
    opacity: 0.4,
    fontSize: 13,
    lineHeight: 1.23,
    letterSpacing: -0.1,
    color: '#1f3449'
});

// const FilterInputDiv = Glamorous.div<{ active: boolean }>((props) => ({
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     '> input': {
//         display: 'none'
//     },
//     '> label': {
//         ...XStyles.text.h400,
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         color: props.active ? '#4428e0' : '#525f7f',
//         cursor: 'pointer',
//         '> i': {
//             width: 16,
//             height: 16,
//             borderRadius: 3.5,
//             color: '#fff',
//             backgroundColor: props.active ? '#4428e0' : '#fff',
//             border: '1px solid rgba(97, 126, 156, 0.2)',
//             fontSize: 13,
//             lineHeight: '14px',
//             marginRight: 10,
//             paddingLeft: 1
//         },
//         '> div': {
//             width: 16,
//             height: 16,
//             borderRadius: 50,
//             backgroundColor: props.active ? '#4428e0' : '#fff',
//             border: '1px solid rgba(97, 126, 156, 0.2)',
//             marginRight: 10,
//             position: 'relative',
//             '&::after': {
//                 content: props.active ? `''` : undefined,
//                 width: 8,
//                 height: 8,
//                 borderRadius: 50,
//                 backgroundColor: '#ffffff',
//                 position: 'absolute',
//                 top: 3,
//                 left: 3
//             }
//         },
//         '> span': {
//             color: '#1f3449'
//         }
//     }
// }));

// class FilterCeckbox extends React.Component<{ label: string, checked?: boolean }, { isChecked: boolean }> {
//     constructor(props: { label: string }) {
//         super(props);

//         this.state = {
//             isChecked: this.props.checked !== undefined ? this.props.checked : false
//         };

//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange() {
//         this.setState({
//             isChecked: !this.state.isChecked
//         });
//     }

//     render() {
//         const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;

//         return (
//             <FilterInputDiv active={this.state.isChecked}>
//                 <input onChange={this.handleChange} id={id} type="checkbox" checked={this.state.isChecked} />
//                 <label htmlFor={id}>
//                     <XIcon icon={this.state.isChecked ? 'done' : ''} />
//                     <span>{this.props.label}</span>
//                 </label>
//             </FilterInputDiv>
//         );
//     }
// }

// class FilterRadio extends React.Component<{ label: string, checked?: boolean }, { isChecked: boolean }> {
//     constructor(props: { label: string }) {
//         super(props);

//         this.state = {
//             isChecked: this.props.checked !== undefined ? this.props.checked : false
//         };

//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange() {
//         this.setState({
//             isChecked: !this.state.isChecked
//         });
//     }

//     render() {
//         const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;

//         return (
//             <FilterInputDiv active={this.state.isChecked}>
//                 <input onChange={this.handleChange} id={id} type="radio" checked={this.state.isChecked} />
//                 <label htmlFor={id}>
//                     <div />
//                     <span>{this.props.label}</span>
//                 </label>
//             </FilterInputDiv>
//         );
//     }
// }

const RangeInput = Glamorous.input({
    width: 180,
    height: 36,
    boxSizing: 'border-box',
    border: '1px solid rgba(97, 126, 156, 0.2)',
    borderRadius: 3.5,
    color: '#525f7f',
    backgroundColor: '#fff',
    fontSize: 14,
    lineHeight: 1.6,
    paddingTop: 2,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
    '&::placeholder': {
        color: 'rgba(97, 126, 156, 0.4)'
    }
});

const FilterRangeDiv = Glamorous.div({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 1.71,
    color: 'rgba(97, 126, 156, 0.4)'
});

const FilterRangeSeparator = Glamorous.p({
    display: 'block',
    marginLeft: 12,
    marginRight: 12
});

interface FilterRangeProps {
    placeholderFrom?: string;
    placeholderTo?: string;
    onChange: Function;
}

class FilterRangeBase extends React.Component<FilterRangeProps & XWithRouter, { from: string, fromValue?: number, to: string, toValue?: number }> {
    constructor(props: FilterRangeProps & XWithRouter) {
        super(props);
        let fromCurrentValue;
        let fromCurrent;
        let toCurrentValue;
        let toCurrent;
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
    }
    handleChangeTo = (e: any) => {
        let value = e.target.value as string;
        if (value === '') {
            this.setState({ to: '', toValue: undefined });
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

    componentDidUpdate() {
        if (this.state.fromValue === undefined && this.state.toValue === undefined) {
            this.props.onChange(undefined);
        } else {
            this.props.onChange({
                gte: this.state.fromValue,
                lte: this.state.toValue
            });
        }

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

// const FilterCategory = Glamorous.div({
//     borderBottom: '1px solid #d8d8d8',
//     marginBottom: 18,
//     '&:last-child': {
//         borderBottom: 'none',
//         marginBottom: 0
//     }
// });

// const OtherFiltersContent = () => (
//     <FiltersContent>
//         <FilterCategory>
//             <FilterCategoryTitle>On Sale</FilterCategoryTitle>
//             <FilterCeckbox label="Yes" checked={true} />
//             <FilterCeckbox label="No" />
//         </FilterCategory>
//         <FilterCategory>
//             <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
//             <FilterCeckbox label="Yes (105+ height, 0-2 stories now)" checked={true} />
//             <FilterCeckbox label="No" />
//         </FilterCategory>
//         <FilterCategory>
//             <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
//             <FilterRadio label="< 200 feet" checked={true} />
//             <FilterRadio label="< 800 feet" />
//             <FilterRadio label="< 1500 feet" />
//             <FilterRadio label="< 4000 feet" />
//             <FilterRadio label="< 8000 feet" />
//             <FilterRadio label="< 20000 feet" />
//         </FilterCategory>
//         <FilterCategory>
//             <FilterCategoryTitle>On Sale</FilterCategoryTitle>
//             <FilterCeckbox label="Yes" checked={true} />
//             <FilterCeckbox label="No" />
//         </FilterCategory>
//         <FilterCategory>
//             <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
//             <FilterCeckbox label="Yes (105+ height, 0-2 stories now)" checked={true} />
//             <FilterCeckbox label="No" />
//         </FilterCategory>
//         <FilterCategory>
//             <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
//             <FilterRadio label="< 200 feet" checked={true} />
//             <FilterRadio label="< 800 feet" />
//             <FilterRadio label="< 1500 feet" />
//             <FilterRadio label="< 4000 feet" />
//             <FilterRadio label="< 8000 feet" />
//             <FilterRadio label="< 20000 feet" />
//         </FilterCategory>
//     </FiltersContent>
// );

const InlineInputWrapper = Glamorous.div({
    display: 'flex',
    width: 310,
    height: 36,
    borderRadius: 3.5,
    border: '1px solid rgba(97, 126, 156, 0.2)',
    '& > div': {
        flexGrow: 1,
        '& > input': {
            width: '100%',
            height: '100%',
            outline: 'none',
            color: '#525f7f',
            backgroundColor: 'transparent',
            fontSize: 14,
            lineHeight: 1.6,
            paddingTop: 2,
            paddingLeft: 7,
            paddingRight: 7,
            paddingBottom: 2,
            '&::placeholder': {
                color: 'rgba(97, 126, 156, 0.4)'
            }
        }
    },
    '& > a': {
        borderTopLeftRadius: '0 !important',
        borderBottomLeftRadius: '0 !important'
    }
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
    width: 350
});

function FilterCell(props: { title?: string, children: any }) {
    return (
        <FilterCellDiv>
            {props.title && <FilterCellTitle>{props.title}</FilterCellTitle>}
            {props.children}
        </FilterCellDiv>
    );
}

class Selector extends React.Component<XSelectProps & XWithRouter & { fieldName: string, applyButton?: boolean, applyCallbacks?: Set<Function> }, { value: string[] | string | undefined }> {
    constructor(props: XSelectProps & XWithRouter & { fieldName: string, applyButton?: boolean, applyCallbacks?: Set<Function> }) {
        super(props);
        this.state = { value: this.props.router.query!![props.fieldName] ? JSON.parse(this.props.router.query!![props.fieldName]) : undefined };
        if (this.props.applyCallbacks !== undefined) {
            this.props.applyCallbacks.add(this.queryParam);
        }
    }

    queryParam = () => {
        let value = undefined;
        if (this.state.value !== undefined) {
            if (Array.isArray(this.state.value)) {
                if (this.state.value.length > 0) {
                    value = JSON.stringify(this.state.value.map(r => r));
                }
            } else {
                value = this.state.value;
            }

        }
        return ({ fieldName: this.props.fieldName, value: value });
    }

    apply = () => {
        if (this.state.value !== undefined) {
            if (Array.isArray(this.state.value)) {
                if (this.state.value.length > 0) {
                    this.props.router.pushQuery(this.props.fieldName, JSON.stringify(this.state.value.map(r => r)));
                } else {
                    this.props.router.pushQuery(this.props.fieldName, undefined);
                }
            } else {
                this.props.router.pushQuery(this.props.fieldName, this.state.value);
            }

        } else {
            this.props.router.pushQuery(this.props.fieldName, undefined);
        }
        if (this.props.applyButton === undefined || this.props.applyButton) {
            Filter.closeAll();
        }
    }

    render() {
        let { fieldName, ...other } = this.props;
        return (
            <XHorizontal>
                <FilterSelector {...other}
                    onChange={(v) => {
                        let value = undefined;
                        if (v) {
                            if (Array.isArray(v)) {
                                if (v.length > 0) {
                                    value = v.map((r: any) => r.value);
                                }
                            } else {
                                value = (v as any).value;
                            }
                        }

                        this.setState({ value: value });
                    }}
                    value={this.state.value}
                />
                {Boolean(this.props.applyButton === undefined || this.props.applyButton) && (
                    <XButton style="dark" onClick={this.apply} >Apply</XButton>
                )}
            </XHorizontal>);
    }

}

class InlineApplyInput extends React.Component<{ searchKey: string, placeholder?: string } & XWithRouter, { value: string }> {
    value: string | undefined = undefined;

    constructor(props: { searchKey: string, placeholder?: string } & XWithRouter) {
        super(props);

        this.value = this.props.router.query[this.props.searchKey];
        this.state = { value: this.props.router.query[this.props.searchKey] === undefined ? '' : this.props.router.query[this.props.searchKey] };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
        this.value = e.target.value === '' ? undefined : e.target.value;
    }

    apply = () => {
        this.props.router.pushQuery(this.props.searchKey, this.value);
        Filter.closeAll();
    }

    render() {
        return (
            <InlineInputWrapper>
                <div>
                    <input type="text" onChange={this.handleChange} value={this.state.value} />
                </div>
                <XButton style="dark" onClick={this.apply} >Apply</XButton>
            </InlineInputWrapper>);
    }

}

const OwnerNameFiltersContent = withRouter((props) => (
    <FiltersContent>
        <InlineApplyInput placeholder="Owner name contains" searchKey="ownerName" router={props.router}/>
        <FIlterDescriptionWrapper>
            <FilterDescription>
                The land with the objects used under the commercial <br />institution (Banks, sales outlets and so on)
            </FilterDescription>
        </FIlterDescriptionWrapper>
    </FiltersContent>
));

class AreaFiltersContent extends React.Component<XWithRouter> {
    area?: any;

    onChange = (area: any) => {
        this.area = area;
    }

    apply = () => {
        if (this.area === undefined) {
            this.props.router.pushQuery('area');
        } else {
            this.props.router.pushQuery('area', JSON.stringify(this.area));
        }
        Filter.closeAll();
    }

    render() {
        return (
            <FiltersContent>
                <FilterRangeBase placeholderFrom="1000 ft" placeholderTo="1000000 ft" onChange={this.onChange} router={this.props.router} />
                <FIlterDescriptionWrapper>
                    <FilterDescription>
                        The land with the objects used under the
                        <br />l institution (Banks, sales outlets and so on)
                    </FilterDescription>
                    <XButton autoClose={true} style="dark" onClick={this.apply}>Apply</XButton>
                </FIlterDescriptionWrapper>
            </FiltersContent>);
    }
}

const MapFilterWrapper = Glamorous(XCard)<{ active?: boolean }>((props) => ({
    position: 'absolute',
    top: 18,
    left: 208,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 15,
    paddingBottom: 15,
    zIndex: props.active ? 2 : 1
}));

const FilterSwitcher = Glamorous.div({
    marginRight: 14,
    '&:last-child': {
        marginRight: 0
    }
});

class MapFilters extends React.Component<XWithRouter & { shadowHandler: (add: boolean, caller: any) => void, city?: string }, { active: boolean }> {
    shadowRequests = new Set();
    applyCallbacks: Set<Function> = new Set();

    constructor(props: XWithRouter & { shadowHandler: (add: boolean, caller: any) => void, city?: string }) {
        super(props);

        this.state = {
            active: false,
        };
    }

    shadowHandler = (add: boolean, caller: any) => {
        this.props.shadowHandler(add, caller);
        if (add) {
            this.shadowRequests.add(caller);
        } else {
            this.shadowRequests.delete(caller);
        }

        this.setState({ active: this.shadowRequests.size > 0 });
    }

    otherApply = () => {
        let params = {};
        for (let c of this.applyCallbacks) {
            let { fieldName, value } = c();
            params[fieldName] = value;
        }
        this.props.router.pushQueryParams(params);
        Filter.closeAll();
    }

    render() {
        let sfOther = [];

        sfOther.push(
            <FilterCell title="On Sale" key="On Sale" >
                <Selector
                    applyCallbacks={this.applyCallbacks}
                    router={this.props.router}
                    fieldName="filterOnSale"
                    options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]}
                    placeholder="On Sale"
                    applyButton={false}
                />
            </FilterCell>
        );

        sfOther.push(
            <FilterCell title="Tower opportunity">
                <Selector
                    applyCallbacks={this.applyCallbacks}
                    router={this.props.router}
                    fieldName="isOkForTower"
                    options={[{ value: 'true', label: 'Yes (90+ height, 0-2 stories now)' }, { value: 'false', label: 'No' }]}
                    placeholder="Tower opportunity"
                    applyButton={false}
                />
            </FilterCell>
        );

        sfOther.push(
            <FilterCell title="Nearest Transit">
                <Selector
                    applyCallbacks={this.applyCallbacks}
                    router={this.props.router}
                    fieldName="filterTransit"
                    options={[
                        { value: '60', label: '< 200 feet' },
                        { value: '243', label: '< 800 feet' },
                        { value: '457', label: '< 1500 feet' },
                        { value: '1220', label: '< 4000 feet' },
                        { value: '2430', label: '< 8000 feet' }]}
                    placeholder="Distance"
                    applyButton={false}
                />
            </FilterCell>
        );

        let other = [];

        other.push(
            <FilterCell title="Vacant">
                <Selector
                    applyCallbacks={this.applyCallbacks}
                    router={this.props.router}
                    fieldName="isVacant"
                    options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]}
                    placeholder="Vacant"
                    applyButton={false}
                />
            </FilterCell>
        );

        other.push(
            <FilterCell title="Publicly owned">
                <Selector
                    applyCallbacks={this.applyCallbacks}
                    router={this.props.router}
                    fieldName="publicOwner"
                    options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]}
                    placeholder="Publicly owned"
                    applyButton={false}
                />
            </FilterCell>
        );

        other.push(

            <FilterCell title="Compatible buildings">
                <Selector
                    applyCallbacks={this.applyCallbacks}
                    router={this.props.router}
                    fieldName="compatible"
                    options={[{ value: 'kasita-1', label: 'Elemynt-1' }, { value: 'kasita-2', label: 'Elemynt-2' }]}
                    placeholder="Building type"
                    multi={true}
                    applyButton={false}
                />
            </FilterCell>
        );

        if (this.props.city === 'sf') {
            other.push(...sfOther);
        }

        return (
            <>
                <MapFilterWrapper active={this.state.active}>
                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton style={this.props.router.query.ownerName !== undefined ? 'dark' : undefined}>Owner name</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <OwnerNameFiltersContent
                                />
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>
                    <FilterSwitcher>
                        {this.props.city === 'sf' && (
                            <Filter handler={this.shadowHandler}>
                                <Filter.Target>
                                    <XButton style={this.props.router.query.filterZoning !== undefined ? 'dark' : undefined}>Zoning</XButton>
                                </Filter.Target>
                                <Filter.Popper>
                                    <Selector
                                        router={this.props.router}
                                        fieldName="filterZoning"
                                        options={AllZones.map((v) => ({ value: v, label: v }))}
                                        placeholder="Zoning Code"
                                        multi={true}
                                    />
                                </Filter.Popper>
                            </Filter>
                        )}

                        {this.props.city === 'nyc' && (
                            <Filter handler={this.shadowHandler}>
                                <Filter.Target>
                                    <XButton style={this.props.router.query.filterZoning !== undefined ? 'dark' : undefined}>Zoning</XButton>
                                </Filter.Target>
                                <Filter.Popper>
                                    <Selector
                                        router={this.props.router}
                                        fieldName="filterZoning"
                                        options={AllNYCZOnes.map((v) => ({ value: v, label: v }))}
                                        placeholder="Zoning Code"
                                        multi={true}
                                    />
                                </Filter.Popper>
                            </Filter>
                        )}

                    </FilterSwitcher>

                    {this.props.city === 'sf' && (
                        <>
                            <FilterSwitcher>
                                <Filter handler={this.shadowHandler}>
                                    <Filter.Target>
                                        <XButton style={this.props.router.query.filterLandUse !== undefined ? 'dark' : undefined}>Land Use</XButton>
                                    </Filter.Target>
                                    <Filter.Popper>
                                        <Selector
                                            router={this.props.router}
                                            fieldName="filterLandUse"
                                            options={AllLandUse.map((v) => ({ value: v, label: v }))}
                                            placeholder="Land Use"
                                            multi={true}
                                        />
                                    </Filter.Popper>
                                </Filter>
                            </FilterSwitcher>

                            <FilterSwitcher>
                                <Filter handler={this.shadowHandler}>
                                    <Filter.Target>
                                        <XButton style={this.props.router.query.filterStories !== undefined ? 'dark' : undefined}>Stories</XButton>
                                    </Filter.Target>
                                    <Filter.Popper>
                                        <Selector
                                            router={this.props.router}
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
                                    </Filter.Popper>
                                </Filter>
                            </FilterSwitcher>

                            <FilterSwitcher>
                                <Filter handler={this.shadowHandler}>
                                    <Filter.Target>
                                        <XButton style={this.props.router.query.filterCurrentUse !== undefined ? 'dark' : undefined}>Current Use</XButton>
                                    </Filter.Target>
                                    <Filter.Popper>
                                        <Selector
                                            router={this.props.router}
                                            fieldName="filterCurrentUse"
                                            options={[{ value: 'PARKING', label: 'Parking' }, { value: 'STORAGE', label: 'Storage' }]}
                                            placeholder="Current Use"
                                        />
                                    </Filter.Popper>
                                </Filter>
                            </FilterSwitcher>
                        </>
                    )}

                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton style={this.props.router.query.area !== undefined ? 'dark' : undefined}>Area</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <AreaFiltersContent
                                    router={this.props.router}
                                />
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>

                    <FilterSwitcher>
                        <Filter handler={(add: boolean, caller: any) => {
                            this.shadowHandler(add, caller);
                        }}>
                            <Filter.Target>
                                <XButton>Other</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <XVertical>
                                    {...other}
                                    <XButton style="dark" size="medium" bounce={true} onClick={this.otherApply}>Apply</XButton>

                                </XVertical>
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>

                    {/* <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton style={this.props.router.query.commercial !== undefined ? 'dark' : undefined}>Commercial</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <XButton autoClose={true}>qwe</XButton>
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>
                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton style={this.props.router.query.area !== undefined ? 'dark' : undefined}>Area</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <AreaFiltersContent />
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>
                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton style={this.props.router.query.other !== undefined ? 'dark' : undefined}>Other filters</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <OtherFiltersContent />
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher> */}

                </MapFilterWrapper>
            </>
        );
    }
}

export const RoutedMapFilters = withRouter<{ shadowHandler: (add: boolean, caller: any) => void, city?: string }>(MapFilters);
