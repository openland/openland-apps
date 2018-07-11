import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';
import glamorous from 'glamorous';

export const OrgCategoties = [
    { label: 'Gas station', value: 'Gas station' },
    { label: 'Parking', value: 'Parking' },
    { label: 'Car wash', value: 'Car wash' },
    { label: 'Big box retail', value: 'Big box retail' },
    { label: 'Medium retail', value: ' Medium retail' },
    { label: 'Mall', value: 'Mall' },
    { label: 'Strip mall', value: 'Strip mall' },
    { label: 'Self storage', value: 'Self storage' },
    { label: 'Convenience store', value: 'Convenience store' },
    { label: 'Railway', value: 'Railway' },
    { label: 'Subway', value: 'Subway' },
    { label: 'Highway system', value: 'Highway system' },
    { label: 'Airport', value: 'Airport' },
    { label: 'Port authorities', value: 'Port authorities' },
    { label: 'Logistics company', value: 'Logistics company' },
    { label: 'Real estate develope', value: 'Real estate develope' },
    { label: 'Health system', value: 'Health system' },
    { label: 'Hospital', value: 'Hospital' },
    { label: 'School', value: 'School' },
    { label: 'College', value: 'College' },
    { label: 'Coal plant', value: 'Coal plant' },
    { label: 'Utility', value: 'Utility' },
    { label: 'REIT', value: 'REIT' },
    { label: 'Bank', value: 'Bank' },
    { label: 'Family offices', value: 'Family offices' },
    { label: 'State government', value: 'State government' },
    { label: 'County governmen', value: 'County governmen' },
    { label: 'City government', value: 'City government' },
    { label: 'Regional government', value: 'Regional government' },
    { label: 'Housing authority', value: 'Housing authority' },
    { label: 'Port authority', value: 'Port authority' },
    { label: 'Stadium authority', value: 'Stadium authority' },
    { label: 'Army', value: 'Army' },
    { label: 'Navy', value: 'Navy' },
    { label: 'Airforce', value: 'Airforce' },
    { label: 'Warehouse', value: 'Warehouse' },
    { label: 'Individuals', value: 'Individuals' },
];

const CATALOG = [

    {
        label: 'Automotive',
        options: [
            { label: 'Gas station', value: 'Gas station' },
            { label: 'Parking', value: 'Parking' },
            { label: 'Car wash', value: 'Car wash' },
        ]
    },
    {
        label: 'Retail',
        options: [
            { label: 'Big box retail', value: 'Big box retail' },
            { label: 'Medium retail', value: ' Medium retail' },
            { label: 'Mall', value: 'Mall' },
            { label: 'Strip mall', value: 'Strip mall' },
            { label: 'Self storage', value: 'Self storage' },
            { label: 'Convenience store', value: 'Convenience store' },
        ]
    },
    {
        label: 'Transportation',
        options: [
            { label: 'Railway', value: 'Railway' },
            { label: 'Subway', value: 'Subway' },
            { label: 'Highway system', value: 'Highway system' },
            { label: 'Airport', value: 'Airport' },
            { label: 'Port authorities', value: 'Port authorities' },
            { label: 'Logistics company', value: 'Logistics company' },
        ]
    },
    {
        label: 'Real estate develope',
        options: [
            { label: 'Real estate develope', value: 'Real estate develope' },
        ]
    },
    {
        label: 'Healthcare',
        options: [
            { label: 'Health system', value: 'Health system' },
            { label: 'Hospital', value: 'Hospital' },
        ]

    },
    {
        label: 'Education',
        options: [
            { label: 'School', value: 'School' },
            { label: 'College', value: 'College' },
        ]

    },
    {
        label: 'Energy and utilities',
        options: [
            { label: 'Coal plant', value: 'Coal plant' },
            { label: 'Utility', value: 'Utility' },
        ]

    },
    {
        label: 'Finance',
        options: [
            { label: 'REIT', value: 'REIT' },
            { label: 'Bank', value: 'Bank' },
            { label: 'Family offices', value: 'Family offices' },
        ]

    },
    {
        label: 'Government',
        options: [
            { label: 'State government', value: 'State government' },
            { label: 'County governmen', value: 'County governmen' },
            { label: 'City government', value: 'City government' },
            { label: 'Regional government', value: 'Regional government' },
            { label: 'Housing authority', value: 'Housing authority' },
            { label: 'Port authority', value: 'Port authority' },
            { label: 'Stadium authority', value: 'Stadium authority' },
        ]

    },
    {
        label: 'Military',
        options: [
            { label: 'Army', value: 'Army' },
            { label: 'Navy', value: 'Navy' },
            { label: 'Airforce', value: 'Airforce' },
        ]

    },
    {
        label: 'Other',
        options: [
            { label: 'Warehouse', value: 'Warehouse' },
            { label: 'Individuals', value: 'Individuals' },
        ]

    },
];
const VerticalScrollable = glamorous(XVertical)({
    maxHeight: '40vh',
    overflowY: 'scroll',
});
export class CategoryPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { popper: boolean }> {
    inner = 0;
    constructor(props: any) {
        super(props);
        this.state = { popper: false };
    }

    onPick = (q: SearchCondition) => {
        this.props.onPick(q);
        this.setState({ popper: false });
    }

    switch = () => {
        this.setState({ popper: !this.state.popper });
    }

    close = () => {
        if (!this.inner) {
            this.setState({ popper: false });
        }
    }

    onClick = (category: { value: string, label: string }) => {
        this.onPick({ type: 'organizationType', value: category.value, label: category.label });
    }

    onInner = (ref: any) => {
        this.inner += ref ? 1 : -1;
    }

    render() {
        let content = (
            <VerticalScrollable >
                {CATALOG.map(group => (
                    <XPopper
                        groupId="directory_catalog"
                        key={group.label}
                        showOnHover={true}
                        placement="right-start"
                        content={
                            <VerticalScrollable >
                                {group.options.map(category => <XMenuItem ref={this.onInner} key={category.value} onClick={(e) => this.onClick(category)}>{category.label}</XMenuItem>)}
                            </VerticalScrollable>}
                    >
                        <XMenuItem>{group.label}</XMenuItem>
                    </XPopper>
                ))}
            </VerticalScrollable>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
            >
                <XButton text="Organization category" onClick={this.switch} />
            </XPopper>
        );
    }
}