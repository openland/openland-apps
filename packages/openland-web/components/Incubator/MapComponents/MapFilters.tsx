import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from 'openland-x/XCard';
import { XCheckboxGroup } from 'openland-x/XCheckbox';
import { XRadioGroup } from 'openland-x/XRadio';
import { FilterButton } from './MapFilterButton';
import { ChangeEvent } from 'react';
import { XSelect, XSelectProps } from 'openland-x/XSelect';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { AllLandUse, AllZones, AllNYCZOnes } from './utils';
import { XRouter } from 'openland-x-routing/XRouter';
import { XButton } from 'openland-x/XButton';
import XStyles from 'openland-x/XStyles';
import { XVertical } from 'openland-x-layout/XVertical';

const FiltersContent = Glamorous.div({
    maxHeight: 'calc(100vh - 150px)',
    overflowY: 'scroll',
    width: 'calc(100% + 20px)',
    marginLeft: -10,
    marginTop: -10,
    marginBottom: -10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
});

const FilterCategoryTitle = Glamorous.div({
    ...XStyles.text.m500,
    marginBottom: 20
});

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

const FilterCategory = Glamorous.div({
    borderBottom: '1px solid #d8d8d8',
    marginBottom: 18,
    '&:last-child': {
        borderBottom: 'none',
        marginBottom: 0
    }
});

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
        borderBottomLeftRadius: '0 !important',
        height: 'calc(100% + 2px)',
        marginTop: -1
    }
});

const FilterSelector = Glamorous(XSelect)({
    width: 350
});

class ApplyFilterWrap extends React.Component<{ fieldName: string, router: XRouter, children: any }, { value?: string | string[] }> {
    static newQueryParams = {};
    value?: string | string[];

    constructor(props: { fieldName: string, router: XRouter, applyCallbacks?: Set<Function>, children: any }) {
        super(props);
    }

    onChange = (value: string | string[]) => {
        this.value = value;

        let qvalue = undefined;
        if (this.value !== undefined) {
            if (Array.isArray(this.value)) {
                if (this.value.length > 0) {
                    qvalue = JSON.stringify(this.value.map(r => r));
                }
            } else {
                qvalue = this.value;
            }
        }
        ApplyFilterWrap.newQueryParams[this.props.fieldName] = qvalue;
    }

    modifyProps = (component: any): any => {
        let res: any = { onChange: this.onChange };
        if (component.props._isCheckBox) {
            res.checked = !!(this.props.router.query[this.props.fieldName]);
            this.value = this.props.router.query[this.props.fieldName];
        }

        if (component.props._isRadioGroup) {
            res.selected = this.props.router.query[this.props.fieldName];
            this.value = this.props.router.query[this.props.fieldName];
        }

        if (component.props._isCheckboxGroup) {
            res.selected = this.props.router.query!![this.props.fieldName] ? JSON.parse(this.props.router.query!![this.props.fieldName]) : undefined;
            this.value = this.props.router.query[this.props.fieldName];
        }

        return res;
    }

    render() {

        let children: any[] = [];

        for (let c of React.Children.toArray(this.props.children)) {
            children.push(React.cloneElement(c as any, this.modifyProps(c)));
        }
        return (
            children
        );
    }
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
            FilterButton.closeAll();
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
                    <XButton style="primary" onClick={this.apply} text="Apply" />
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
        FilterButton.closeAll();
    }

    render() {
        return (
            <InlineInputWrapper>
                <div>
                    <input type="text" onChange={this.handleChange} value={this.state.value} placeholder={this.props.placeholder} />
                </div>
                <XButton style="primary" onClick={this.apply} text="Apply" />
            </InlineInputWrapper>);
    }
}

const OwnerNameFiltersContent = withRouter((props) => (
    <FiltersContent>
        <InlineApplyInput placeholder="Owner name contains" searchKey="ownerName" router={props.router} />
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
        FilterButton.closeAll();
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
                    <XButton autoClose={true} style="primary" onClick={this.apply} text="Apply" />
                </FIlterDescriptionWrapper>
            </FiltersContent>);
    }
}

const MapFilterWrapper = Glamorous(XCard)<{ active?: boolean }>((props) => ({
    position: 'absolute',
    top: 18,
    left: 214,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 15,
    paddingBottom: 15,
    zIndex: props.active ? 12 : 1
}));

const FilterButtonMargins = Glamorous.div({
    marginRight: 14,
    '&:last-child': {
        marginRight: 0
    }
});

const Shadow = Glamorous.div<{ active: boolean }>((props) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    visibility: props.active ? 'visible' : 'hidden',
    opacity: props.active ? 1 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    zIndex: 10,
    // pointerEvents: 'none'
}));

class MapFilters extends React.Component<XWithRouter & { city?: string }, { active: boolean }> {
    shadowRequests = new Set();
    otherFilters: Set<string> = new Set(['isVacant', 'publicOwner', 'compatible', 'filterTransit', 'isOkForTower', 'filterOnSale']);

    constructor(props: XWithRouter & { city?: string }) {
        super(props);

        this.state = {
            active: false,
        };
    }

    shadowHandler = (add: boolean, caller: any) => {
        if (add) {
            this.shadowRequests.add(caller);
        } else {
            this.shadowRequests.delete(caller);
        }

        this.setState({ active: this.shadowRequests.size > 0 });
    }

    applyHandler = (add: boolean, caller: any) => {
        if (!add) {
            if (Object.keys(ApplyFilterWrap.newQueryParams).length > 0) {
                this.props.router.pushQueryParams(ApplyFilterWrap.newQueryParams);
            }
        } else {
            ApplyFilterWrap.newQueryParams = {};
        }
        this.shadowHandler(add, caller);
    }

    render() {
        let otherActive = false;
        for (let fieldKey of Object.keys(this.props.router.query)) {
            otherActive = otherActive || this.otherFilters.has(fieldKey);
        }

        let sfOther = [];

        sfOther.push(
            <FilterCategory key={'filter_filterOnSale'}>
                <FilterCategoryTitle>On Sale</FilterCategoryTitle>
                <ApplyFilterWrap fieldName="filterOnSale" router={this.props.router}>
                    <XRadioGroup elements={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} />
                </ApplyFilterWrap>
            </FilterCategory >
        );

        sfOther.push(
            <FilterCategory key={'filter_isOkForTower'}>
                <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
                <ApplyFilterWrap fieldName="isOkForTower" router={this.props.router}>
                    <XRadioGroup elements={[{ value: 'true', label: 'Yes (90+ height, 0-2 stories now)' }, { value: 'false', label: 'No' }]} />
                </ApplyFilterWrap>
            </FilterCategory>
        );

        sfOther.push(
            <FilterCategory key={'filter_filterTransit'}>
                <FilterCategoryTitle>Nearest Transit</FilterCategoryTitle>
                <ApplyFilterWrap fieldName="filterTransit" router={this.props.router}>
                    <XRadioGroup elements={[{ value: '60', label: '< 200 feet' },
                    { value: '243', label: '< 800 feet' },
                    { value: '457', label: '< 1500 feet' },
                    { value: '1220', label: '< 4000 feet' },
                    { value: '2430', label: '< 8000 feet' }]} />
                </ApplyFilterWrap>
            </FilterCategory>
        );

        let other = [];

        other.push(
            <FilterCategory key={'filter_isVacant'}>
                <FilterCategoryTitle>Vacant</FilterCategoryTitle>
                <ApplyFilterWrap fieldName="isVacant" router={this.props.router}>
                    <XRadioGroup elements={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} />
                </ApplyFilterWrap>
            </FilterCategory>
        );

        other.push(
            <FilterCategory key={'filter_publicOwner'}>
                <FilterCategoryTitle>Publicly owned</FilterCategoryTitle>
                <ApplyFilterWrap fieldName="publicOwner" router={this.props.router}>
                    <XRadioGroup elements={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} />
                </ApplyFilterWrap>
            </FilterCategory>
        );

        other.push(
            <FilterCategory key={'filter_compatible'}>
                <FilterCategoryTitle>Compatible buildings</FilterCategoryTitle>
                <ApplyFilterWrap fieldName="compatible" router={this.props.router}>
                    <XVertical>
                        <XCheckboxGroup elements={[{ value: 'kasita-1', label: 'Elemynt-1' }, { value: 'kasita-2', label: 'Elemynt-2' }]} />
                    </XVertical>
                </ApplyFilterWrap>
            </FilterCategory>
        );

        if (this.props.city === 'sf') {
            other.push(...sfOther);
        }

        return (
            <>

                <Shadow active={this.state.active} />

                <MapFilterWrapper active={this.state.active}>
                    <FilterButtonMargins key={'filter_ownerName'}>
                        <FilterButton
                            handler={this.shadowHandler}
                            fieldName="ownerName"
                            router={this.props.router}
                            content={(
                                <OwnerNameFiltersContent />
                            )}>
                            <XButton text="Owner name" />

                        </FilterButton>
                    </FilterButtonMargins>
                    <FilterButtonMargins key={'filter_filterZoning_container'}>
                        {this.props.city === 'sf' && (
                            <FilterButton
                                handler={this.shadowHandler}
                                key={'filter_filterZoning_sf'}
                                fieldName="filterZoning"
                                router={this.props.router}
                                filterTitle="Zoning"
                                content={(
                                    <FiltersContent>
                                        <Selector
                                            router={this.props.router}
                                            fieldName="filterZoning"
                                            options={AllZones.map((v) => ({ value: v, label: v }))}
                                            placeholder="Zoning Code"
                                            multi={true}
                                        />
                                    </FiltersContent>
                                )}>
                                <XButton />

                            </FilterButton>
                        )}

                        {this.props.city === 'nyc' && (
                            <FilterButton
                                handler={this.shadowHandler}
                                key={'filter_filterZoning_nyc'}
                                fieldName="filterZoning"
                                router={this.props.router}
                                filterTitle="Zoning"
                                content={(
                                    <FiltersContent>
                                        <Selector
                                            router={this.props.router}
                                            fieldName="filterZoning"
                                            options={AllNYCZOnes.map((v) => ({ value: v, label: v }))}
                                            placeholder="Zoning Code"
                                            multi={true}
                                        />
                                    </FiltersContent>
                                )}>
                                <XButton />

                            </FilterButton>
                        )}

                    </FilterButtonMargins>

                    {this.props.city === 'sf' && (
                        <>
                            <FilterButtonMargins key={'filter_filterLandUse'}>
                                <FilterButton
                                    handler={this.applyHandler}
                                    fieldName="filterLandUse"
                                    router={this.props.router}
                                    filterTitle="Land Use"
                                    content={(
                                        <ApplyFilterWrap fieldName="filterLandUse" router={this.props.router}>
                                            <XVertical>
                                                <XCheckboxGroup
                                                    divided={true}
                                                    elements={AllLandUse.map((v) => ({ value: v.label, label: v.label, hint: v.hint }))} />
                                            </XVertical>
                                        </ApplyFilterWrap>
                                    )}>
                                    <XButton />

                                </FilterButton>
                            </FilterButtonMargins>

                            <FilterButtonMargins key={'filter_filterStories'}>
                                <FilterButton handler={this.applyHandler}
                                    fieldName="filterStories"
                                    router={this.props.router}
                                    filterTitle="Stories"
                                    valueTitleMap={{
                                        '0': 'no stories',
                                        '1': '1 story',
                                        '2': '2 stories',
                                        '3': '3 stories',
                                        '4': '4 stories'
                                    }}
                                    content={(

                                        <ApplyFilterWrap fieldName="filterStories" router={this.props.router}>
                                            <XVertical>

                                                <XCheckboxGroup
                                                    divided={true}

                                                    elements={[
                                                        { value: '0', label: 'no stories' },
                                                        { value: '1', label: '1 story' },
                                                        { value: '2', label: '2 stories' },
                                                        { value: '3', label: '3 stories' },
                                                        { value: '4', label: '4 stories' }]} />
                                            </XVertical>

                                        </ApplyFilterWrap>
                                    )}>
                                    <XButton />
                                </FilterButton>
                            </FilterButtonMargins>

                            <FilterButtonMargins key={'filter_filterCurrentUse'}>
                                <FilterButton handler={this.applyHandler}
                                    fieldName="filterCurrentUse"
                                    filterTitle="Current Use"
                                    router={this.props.router}
                                    valueTitleMap={{
                                        'PARKING': 'Parking',
                                        'STORAGE': 'Storage'
                                    }}
                                    content={(
                                        <ApplyFilterWrap fieldName="filterCurrentUse" router={this.props.router}>
                                            <XVertical>

                                                <XCheckboxGroup
                                                    divided={true}
                                                    elements={[{ value: 'PARKING', label: 'Parking' }, { value: 'STORAGE', label: 'Storage' }]} />
                                            </XVertical>

                                        </ApplyFilterWrap>
                                    )}>
                                    <XButton />

                                </FilterButton>
                            </FilterButtonMargins>
                        </>
                    )}

                    <FilterButtonMargins key={'filter_filterArea'}>
                        <FilterButton
                            fieldName="area"
                            router={this.props.router}
                            handler={this.shadowHandler}
                            content={
                                <AreaFiltersContent
                                    router={this.props.router}
                                />
                            }>
                            <XButton text="Area" />

                        </FilterButton>
                    </FilterButtonMargins>

                    <FilterButtonMargins key={'filter_other_container'}>
                        <FilterButton handler={this.applyHandler}
                            router={this.props.router}
                            content={(
                                <FiltersContent>
                                    {...other}
                                </FiltersContent>
                            )}>
                            <XButton style={otherActive ? 'primary' : 'ghost'} text="Other" />

                        </FilterButton>

                    </FilterButtonMargins>
                </MapFilterWrapper>
            </>
        );
    }
}

export const RoutedMapFilters = withRouter<{ city?: string }>(MapFilters);
