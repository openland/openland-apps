import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from 'openland-x/XCard';
import { XCheckboxGroup } from 'openland-x/XCheckbox';
import { XRadioGroup } from 'openland-x/XRadio';
import { FilterButton } from './MapFilterButton';
import { XSelect, XSelectProps } from 'openland-x/XSelect';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { AllLandUse, AllZones, AllNYCZOnes } from './utils';
import { XRouter } from 'openland-x-routing/XRouter';
import { XButton } from 'openland-x/XButton';
import XStyles from 'openland-x/XStyles';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XGroup } from 'openland-x/XGroup';
import { XLink } from 'openland-x/retired/XLink';
import { XWithRole } from 'openland-x-permissions/XWithRole';

const FiltersContent = Glamorous.div<{ visible?: boolean }>((props) => ({
    maxHeight: 'calc(100vh - 150px)',
    overflowY: props.visible ? undefined : 'scroll',
    width: 'calc(100% + 20px)',
    minWidth: 240,
    maxWidth: 400,
    marginLeft: -10,
    marginRight: -10,
    marginTop: -10,
    marginBottom: -10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
}));

const FilterCategoryTitle = Glamorous.div({
    ...XStyles.text.m500,
    marginBottom: 18
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
                <XInput
                    type="text"
                    pattern="[0-9]*"
                    placeholder={this.props.placeholderFrom}
                    onChange={this.handleChangeFrom}
                    value={this.state.from}
                // onBlur={this.handleBlurFrom}
                />
                <FilterRangeSeparator> - </FilterRangeSeparator>
                <XInput
                    type="text"
                    pattern="[0-9]*"
                    placeholder={this.props.placeholderTo}
                    onChange={this.handleChangeTo}
                    value={this.state.to}
                // onBlur={this.handleBlurTo}
                />
            </FilterRangeDiv>
        );
    }
}

const FilterCategory = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.6)',
    marginBottom: 18,
    marginLeft: -20,
    marginRight: -20,
    paddingLeft: 20,
    paddingRight: 20,
    '&:last-child': {
        borderBottom: 'none',
        marginBottom: -20
    }
});

const FilterSelector = Glamorous(XSelect)({
    width: 250
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

    queryParam = (newValue: any) => {
        let value = undefined;
        if (newValue !== undefined) {
            if (Array.isArray(newValue)) {
                if (newValue.length > 0) {
                    value = JSON.stringify(newValue.map(r => r));
                }
            } else {
                value = newValue;
            }

        }
        ApplyFilterWrap.newQueryParams[this.props.fieldName] = value;
    }

    close = () => {
        FilterButton.closeAll();
    }

    render() {
        let { fieldName, ...other } = this.props;
        return (
            <XGroup>
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

                        this.queryParam(value);
                    }}
                    value={this.state.value}
                />
            </XGroup>
        );
    }
}

const SelectorNMargin = Glamorous(Selector)({
    margin: -12,
    marginBottom: 4,
    marginTop: -10,
});

const InlineApplyInputNMargin = Glamorous(XInput)({
    margin: -12,
    marginBottom: 4,
    marginTop: -10,
});

class InlineApplyInput extends React.Component<{ searchKey: string, placeholder?: string } & XWithRouter, { value: string }> {
    value: string | undefined = undefined;

    constructor(props: { searchKey: string, placeholder?: string } & XWithRouter) {
        super(props);

        this.value = this.props.router.query[this.props.searchKey];
        this.state = { value: this.props.router.query[this.props.searchKey] === undefined ? '' : this.props.router.query[this.props.searchKey] };
    }

    handleChange = (value: string) => {
        this.setState({ value: value });
        this.value = value === '' ? undefined : value;

        ApplyFilterWrap.newQueryParams[this.props.searchKey] = this.value;
    }

    apply = () => {
        FilterButton.closeAll();
    }

    render() {
        return (
            <InlineApplyInputNMargin onChange={this.handleChange} flexGrow={1} value={this.state.value} placeholder={this.props.placeholder} />
        );
    }
}

const FilterFooterContainer = Glamorous.div<{ addBorder?: boolean }>(props => ({
    borderTop: props.addBorder !== false ? '1px solid rgba(220, 222, 228, 0.6)' : undefined,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -20,
    marginLeft: -20,
    marginRight: -20,
    padding: 8,
    paddingLeft: 20
}));

const FolterCancelLink = Glamorous(XLink)({
    color: 'rgba(51, 69, 98, 0.4);'
});

class FilterFooter extends React.Component<{ addBorder?: boolean }> {

    cancel = () => {
        ApplyFilterWrap.newQueryParams = {};
        FilterButton.closeAll();
    }

    apply = () => {
        FilterButton.closeAll();
    }

    render() {
        return (
            <FilterFooterContainer className={(this.props as any).className} addBorder={this.props.addBorder}>
                <FolterCancelLink onClick={this.cancel}>Cancel</FolterCancelLink>

                <XButton text="Apply" style="primary" onClick={this.apply} />
            </FilterFooterContainer>
        );
    }
}

const OwnerNameFiltersContent = withRouter((props) => (
    <FiltersContent>
        <InlineApplyInput placeholder="Owner name contains" searchKey="ownerName" router={props.router} />
        {(props as any).addFooter !== false && (
            <FilterFooter addBorder={false} />
        )}
    </FiltersContent>
)) as React.ComponentClass<{ addFooter?: boolean }>;

const FilterRangeBaseNMargin = Glamorous.div({
    margin: -12,
    marginBottom: 4,
    marginTop: -10,
});

class AreaFiltersContent extends React.Component<XWithRouter> {
    area?: any;

    onChange = (area: any) => {
        this.area = area;
        (ApplyFilterWrap.newQueryParams as any).area = area === undefined ? area : JSON.stringify(this.area);
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
                <FilterRangeBaseNMargin>
                    <FilterRangeBase placeholderFrom="1000 ft" placeholderTo="1000000 ft" onChange={this.onChange} router={this.props.router} />
                </FilterRangeBaseNMargin>
                <FilterFooter addBorder={false} />

            </FiltersContent>
        );
    }
}

const MapFilterWrapper = Glamorous(XCard)<{ active?: boolean }>((props) => ({
    position: 'absolute',
    top: 18,
    left: 360,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 6,
    overflow: 'hidden',
    border: 'none',
    zIndex: props.active ? 12 : 1,
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
}));

const FilterButtonWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    borderRight: '1px solid #c1c7cf4d',
    '&:last-child': {
        borderRight: 'none'
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

const OtherContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
});

const OtherFooter = Glamorous(FilterFooter)({
    color: 'rgba(51, 69, 98, 0.4);',
    marginTop: 10,
    marginBottom: -10,
    marginLeft: -10,
    marginRight: -10,
});

class MapFilters extends React.Component<XWithRouter & { city?: string }, { active: boolean, widthState: 'wide' | 'narrow' }> {
    shadowRequests = new Set();
    otherFilters: Set<string> = new Set(['isVacant', 'publicOwner', 'compatible', 'filterTransit', 'isOkForTower', 'filterOnSale', 'filterCurrentUse']);

    constructor(props: XWithRouter & { city?: string }) {
        super(props);

        this.state = {
            active: false,
            widthState: window.innerWidth <= 1300 ? 'narrow' : 'wide',
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

    onResize = () => {
        this.setState({ widthState: window.innerWidth <= 1300 ? 'narrow' : 'wide' });
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        document.removeEventListener('resize', this.onResize);
    }

    render() {

        this.otherFilters = new Set(['isVacant', 'publicOwner', 'compatible', 'filterTransit', 'isOkForTower', 'filterOnSale', 'filterCurrentUse']);

        let sfOther = [];

        // sfOther.push(
        //     <FilterCategory key={'filter_filterOnSale'}>
        //         <FilterCategoryTitle>On Sale</FilterCategoryTitle>
        //         <ApplyFilterWrap fieldName="filterOnSale" router={this.props.router}>
        //             <XRadioGroup elements={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} />
        //         </ApplyFilterWrap>
        //     </FilterCategory >
        // );

        sfOther.push(
            <FilterCategory key={'filter_isOkForTower'}>
                <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
                <ApplyFilterWrap fieldName="isOkForTower" router={this.props.router}>
                    <XRadioGroup elements={[{ value: 'true', label: 'Yes(90+ height limit, 0-2 stories)' }]} anyOptionName="All" anyOptionOrder="before" />
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
                    { value: '2430', label: '< 8000 feet' }]} anyOptionOrder="before" anyOptionName="All" />
                </ApplyFilterWrap>
            </FilterCategory>
        );

        sfOther.push(
            <FilterCategory key={'filter_filterCurrentUse'}>
                <FilterCategoryTitle>Current Use</FilterCategoryTitle>
                <XVertical>
                    <ApplyFilterWrap fieldName="filterCurrentUse" router={this.props.router}>
                        <XCheckboxGroup
                            elements={[{ value: 'PARKING', label: 'Parking' }, { value: 'STORAGE', label: 'Storage' }]}
                        />
                    </ApplyFilterWrap>
                </XVertical>
            </FilterCategory>
        );

        let other = [];

        if (this.props.city !== 'sf') {
            other.push(
                <FilterCategory key={'filter_isVacant'}>
                    <FilterCategoryTitle>Vacant</FilterCategoryTitle>
                    <ApplyFilterWrap fieldName="isVacant" router={this.props.router}>
                        <XRadioGroup elements={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} anyOptionName="All" anyOptionOrder="before" />
                    </ApplyFilterWrap>
                </FilterCategory>
            );

        }

        if (this.props.city === 'nyc') {
            other.push(
                <FilterCategory key={'filter_publicOwner'}>
                    <FilterCategoryTitle>Publicly owned</FilterCategoryTitle>
                    <ApplyFilterWrap fieldName="publicOwner" router={this.props.router}>
                        <XRadioGroup elements={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} anyOptionName="All" anyOptionOrder="before" />
                    </ApplyFilterWrap>
                </FilterCategory>
            );
        }

        other.push(
            <XWithRole role={'feature-customer-kassita'} key={'filter_compatible'}>
                <FilterCategory>
                    <FilterCategoryTitle>Compatible buildings</FilterCategoryTitle>
                    <XVertical>
                        <ApplyFilterWrap fieldName="compatible" router={this.props.router}>
                            <XCheckboxGroup elements={[{ value: 'kasita-1', label: 'Elemynt-1' }, { value: 'kasita-2', label: 'Elemynt-2' }]} />
                        </ApplyFilterWrap>
                    </XVertical>
                </FilterCategory>
            </XWithRole>

        );

        if (this.state.widthState === 'narrow') {

            if (this.props.city === 'nyc') {
                other.unshift(
                    <FilterCategory>
                        <FilterCategoryTitle>Owner Name</FilterCategoryTitle>
                        <OwnerNameFiltersContent addFooter={false} />
                    </FilterCategory>
                );
            }

            if (this.props.city === 'sf') {
                other.unshift(
                    <FilterCategory>
                        <FilterCategoryTitle>Stories</FilterCategoryTitle>
                        <XVertical>
                            <ApplyFilterWrap fieldName="filterStories" router={this.props.router}>
                                <XCheckboxGroup
                                    elements={[
                                        { value: '0', label: 'no stories' },
                                        { value: '1', label: '1 story' },
                                        { value: '2', label: '2 stories' },
                                        { value: '3', label: '3 stories' },
                                        { value: '4', label: '4 + stories' }]} />
                            </ApplyFilterWrap>
                        </XVertical>
                    </FilterCategory>
                );

                other.unshift(
                    <FilterCategory>
                        <FilterCategoryTitle>Lans Use</FilterCategoryTitle>
                        <XVertical >
                            <ApplyFilterWrap fieldName="landUse" router={this.props.router}>
                                <XCheckboxGroup
                                    elements={AllLandUse.map((v) => ({ value: v.label, label: v.label, hint: v.hint }))} />
                            </ApplyFilterWrap>
                        </XVertical >
                    </FilterCategory>
                );
            }

            this.otherFilters.add('landUse');
            this.otherFilters.add('filterStories');
            this.otherFilters.add('ownerName');
        }

        if (this.props.city === 'sf') {
            other.push(...sfOther);
        }

        let otherActive = false;
        for (let fieldKey of Object.keys(this.props.router.query)) {
            otherActive = otherActive || this.otherFilters.has(fieldKey);
        }

        return (
            <>

                <Shadow active={this.state.active} />

                <MapFilterWrapper active={this.state.active}>
                    {this.props.city === 'nyc' && this.state.widthState === 'wide' && (
                        <FilterButtonWrapper key={'filter_ownerName'}>
                            <FilterButton
                                handler={this.applyHandler}
                                fieldName="ownerName"
                                router={this.props.router}
                                content={(
                                    <OwnerNameFiltersContent />
                                )}>
                                <XButton size="medium" text="Owner name" />

                            </FilterButton>
                        </FilterButtonWrapper>
                    )}
                    {this.props.city === 'sf' && (
                        <FilterButtonWrapper key={'filter_filterZoning_container'}>
                            <FilterButton
                                handler={this.applyHandler}
                                key={'filter_filterZoning_sf'}
                                fieldName="filterZoning"
                                router={this.props.router}
                                filterTitle="Zoning"
                                content={(
                                    <FiltersContent visible={true}>
                                        <SelectorNMargin
                                            router={this.props.router}
                                            fieldName="filterZoning"
                                            options={AllZones.map((v) => ({ value: v, label: v }))}
                                            placeholder="Zoning Code"
                                            multi={true}
                                        />
                                        <FilterFooter addBorder={false} />

                                    </FiltersContent>
                                )}>
                                <XButton size="medium" />
                            </FilterButton>
                        </FilterButtonWrapper>
                    )}

                    {this.props.city === 'nyc' && (
                        <FilterButtonWrapper key={'filter_filterZoning_container'}>
                            <FilterButton
                                handler={this.applyHandler}
                                key={'filter_filterZoning_nyc'}
                                fieldName="filterZoning"
                                router={this.props.router}
                                filterTitle="Zoning"
                                content={(
                                    <FiltersContent visible={true}>
                                        <SelectorNMargin
                                            router={this.props.router}
                                            fieldName="filterZoning"
                                            options={AllNYCZOnes.map((v) => ({ value: v, label: v }))}
                                            placeholder="Zoning Code"
                                            multi={true}
                                        />
                                        <FilterFooter addBorder={false} />

                                    </FiltersContent>
                                )}>
                                <XButton size="medium" />
                            </FilterButton>
                        </FilterButtonWrapper>
                    )}

                    {this.props.city === 'sf' && this.state.widthState === 'wide' && (
                        <>
                            <FilterButtonWrapper key={'filter_landUse'}>
                                <FilterButton
                                    handler={this.applyHandler}
                                    fieldName="landUse"
                                    router={this.props.router}
                                    filterTitle="Land Use"
                                    content={(
                                        <FiltersContent>
                                            <XVertical>
                                                <ApplyFilterWrap fieldName="landUse" router={this.props.router}>
                                                    <XCheckboxGroup
                                                        elements={AllLandUse.map((v) => ({ value: v.label, label: v.label, hint: v.hint }))} />
                                                </ApplyFilterWrap>
                                            </XVertical>
                                            <FilterFooter />

                                        </FiltersContent>
                                    )}>
                                    <XButton size="medium" />
                                </FilterButton>
                            </FilterButtonWrapper>

                            <FilterButtonWrapper key={'filter_filterStories'}>
                                <FilterButton handler={this.applyHandler}
                                    fieldName="filterStories"
                                    router={this.props.router}
                                    filterTitle="Stories"
                                    valueTitleMap={{
                                        '0': 'no stories',
                                        '1': '1 story',
                                        '2': '2 stories',
                                        '3': '3 stories',
                                        '4': '4 + stories'
                                    }}
                                    content={(
                                        <FiltersContent>
                                            <XVertical>
                                                <ApplyFilterWrap fieldName="filterStories" router={this.props.router}>
                                                    <XCheckboxGroup
                                                        elements={[
                                                            { value: '0', label: 'no stories' },
                                                            { value: '1', label: '1 story' },
                                                            { value: '2', label: '2 stories' },
                                                            { value: '3', label: '3 stories' },
                                                            { value: '4', label: '4 + stories' }]} />
                                                </ApplyFilterWrap>
                                            </XVertical>
                                            <FilterFooter />

                                        </FiltersContent>
                                    )}>
                                    <XButton size="medium" />
                                </FilterButton>
                            </FilterButtonWrapper>
                        </>
                    )}

                    <FilterButtonWrapper key={'filter_filterArea'}>
                        <FilterButton
                            fieldName="area"
                            router={this.props.router}
                            handler={this.applyHandler}
                            content={
                                <AreaFiltersContent
                                    router={this.props.router}
                                />
                            }>
                            <XButton size="medium" text="Area" />
                        </FilterButton>
                    </FilterButtonWrapper>

                    <FilterButtonWrapper key={'filter_other_container'}>
                        <FilterButton handler={this.applyHandler}
                            fieldName="other"
                            router={this.props.router}
                            content={(
                                <OtherContainer>
                                    <FiltersContent >
                                        {...other}
                                    </FiltersContent>
                                    <OtherFooter />
                                </OtherContainer>

                            )}>
                            <XButton size="medium" text="Other" style={otherActive ? 'primary' : 'flat'} />
                        </FilterButton>
                    </FilterButtonWrapper>
                </MapFilterWrapper>
            </>
        );
    }
}

export const RoutedMapFilters = withRouter<{ city?: string }>(MapFilters);
