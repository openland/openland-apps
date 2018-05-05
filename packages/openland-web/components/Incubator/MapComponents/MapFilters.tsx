import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from '../../X/XButton';
import { XCard } from '../../X/XCard';
import { XIcon } from 'openland-x/XIcon';
import { Filter } from './PopperFilterButton';
import XStyles from '../../X/XStyles';

const FiltersContent = Glamorous.div({
    maxHeight: 'calc(100vh - 150px)',
    overflowY: 'scroll'
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

const FilterInputDiv = Glamorous.div<{ active: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    '> input': {
        display: 'none'
    },
    '> label': {
        ...XStyles.text.h400,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: props.active ? '#4428e0' : '#525f7f',
        cursor: 'pointer',
        '> i': {
            width: 16,
            height: 16,
            borderRadius: 3.5,
            color: '#fff',
            backgroundColor: props.active ? '#4428e0' : '#fff',
            border: '1px solid rgba(97, 126, 156, 0.2)',
            fontSize: 13,
            lineHeight: '14px',
            marginRight: 10,
            paddingLeft: 1
        },
        '> div': {
            width: 16,
            height: 16,
            borderRadius: 50,
            backgroundColor: props.active ? '#4428e0' : '#fff',
            border: '1px solid rgba(97, 126, 156, 0.2)',
            marginRight: 10,
            position: 'relative',
            '&::after': {
                content: props.active ? `''` : undefined,
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: '#ffffff',
                position: 'absolute',
                top: 3,
                left: 3
            }
        },
        '> span': {
            color: '#1f3449'
        }
    }
}));

class FilterCeckbox extends React.Component<{ label: string, checked?: boolean }, { isChecked: boolean }> {
    constructor(props: { label: string }) {
        super(props);

        this.state = {
            isChecked: this.props.checked !== undefined ? this.props.checked : false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;

        return (
            <FilterInputDiv active={this.state.isChecked}>
                <input onChange={this.handleChange} id={id} type="checkbox" checked={this.state.isChecked} />
                <label htmlFor={id}>
                    <XIcon icon={this.state.isChecked ? 'done' : ''} />
                    <span>{this.props.label}</span>
                </label>
            </FilterInputDiv>
        );
    }
}

class FilterRadio extends React.Component<{ label: string, checked?: boolean }, { isChecked: boolean }> {
    constructor(props: { label: string }) {
        super(props);

        this.state = {
            isChecked: this.props.checked !== undefined ? this.props.checked : false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;

        return (
            <FilterInputDiv active={this.state.isChecked}>
                <input onChange={this.handleChange} id={id} type="radio" checked={this.state.isChecked} />
                <label htmlFor={id}>
                    <div />
                    <span>{this.props.label}</span>
                </label>
            </FilterInputDiv>
        );
    }
}

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
}

class FilterRangeBase extends React.Component<FilterRangeProps, { from: string, fromValue?: number, to: string, toValue?: number }> {
    constructor(props: FilterRangeProps) {
        super(props);

        let fromCurrent = undefined;
        let fromCurrentValue = undefined;
        let toCurrent = undefined;
        let toCurrentValue = undefined;

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

const OtherFiltersContent = () => (
    <FiltersContent>
        <FilterCategory>
            <FilterCategoryTitle>On Sale</FilterCategoryTitle>
            <FilterCeckbox label="Yes" checked={true} />
            <FilterCeckbox label="No" />
        </FilterCategory>
        <FilterCategory>
            <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
            <FilterCeckbox label="Yes (105+ height, 0-2 stories now)" checked={true} />
            <FilterCeckbox label="No" />
        </FilterCategory>
        <FilterCategory>
            <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
            <FilterRadio label="< 200 feet" checked={true} />
            <FilterRadio label="< 800 feet" />
            <FilterRadio label="< 1500 feet" />
            <FilterRadio label="< 4000 feet" />
            <FilterRadio label="< 8000 feet" />
            <FilterRadio label="< 20000 feet" />
        </FilterCategory>
        <FilterCategory>
            <FilterCategoryTitle>On Sale</FilterCategoryTitle>
            <FilterCeckbox label="Yes" checked={true} />
            <FilterCeckbox label="No" />
        </FilterCategory>
        <FilterCategory>
            <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
            <FilterCeckbox label="Yes (105+ height, 0-2 stories now)" checked={true} />
            <FilterCeckbox label="No" />
        </FilterCategory>
        <FilterCategory>
            <FilterCategoryTitle>Tower opportunity</FilterCategoryTitle>
            <FilterRadio label="< 200 feet" checked={true} />
            <FilterRadio label="< 800 feet" />
            <FilterRadio label="< 1500 feet" />
            <FilterRadio label="< 4000 feet" />
            <FilterRadio label="< 8000 feet" />
            <FilterRadio label="< 20000 feet" />
        </FilterCategory>
    </FiltersContent>
);

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

const InlineApplyInput = (props: { placeholder?: string }) => (
    <InlineInputWrapper>
        <div>
            <input type="text" placeholder={props.placeholder} />
        </div>
        <XButton style="dark">Apply</XButton>
    </InlineInputWrapper>
);

const OwnerNameFiltersContent = () => (
    <FiltersContent>
        <InlineApplyInput placeholder="Owner name contains" />
        <FIlterDescriptionWrapper>
            <FilterDescription>
                The land with the objects used under the commercial <br />institution (Banks, sales outlets and so on)
            </FilterDescription>
        </FIlterDescriptionWrapper>
    </FiltersContent>
);

const AreaFiltersContent = () => (
    <FiltersContent>
        <FilterRangeBase placeholderFrom="1000 ft" placeholderTo="1000000 ft" />
        <FIlterDescriptionWrapper>
            <FilterDescription>
                The land with the objects used under the
                <br />l institution (Banks, sales outlets and so on)
            </FilterDescription>
            <XButton autoClose={true} style="dark">Apply</XButton>
        </FIlterDescriptionWrapper>
    </FiltersContent>
);

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

export class MapFilters extends React.Component<{ shadowHandler: Function }, { active: boolean }> {
    shadowRequests = new Set();

    constructor(props: { shadowHandler: Function }) {
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

    render() {
        return (
            <>
                <MapFilterWrapper active={this.state.active}>
                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton style="dark">Owner name</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <OwnerNameFiltersContent />
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>
                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton>Zoning</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <XButton autoClose={true}>qwe</XButton>
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>
                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton>Commercial</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <XButton autoClose={true}>qwe</XButton>
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>
                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton style="dark">Area</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <AreaFiltersContent />
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>
                    <FilterSwitcher>
                        <Filter handler={this.shadowHandler}>
                            <Filter.Target>
                                <XButton style="dark">Other filters</XButton>
                            </Filter.Target>
                            <Filter.Popper>
                                <OtherFiltersContent />
                            </Filter.Popper>
                        </Filter>
                    </FilterSwitcher>

                </MapFilterWrapper>
            </>
        );
    }
}