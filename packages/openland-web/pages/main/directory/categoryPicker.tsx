import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';

const CATALOG = [
    {
        label: 'Ratail',
        options: [
            { label: 'reatail1', value: 'retail1' },
            { label: 'reatail2', value: 'retail2' },
            { label: 'reatail3', value: 'retail3' },
        ]
    },
    {
        label: 'Automotive',
        options: [
            { label: 'Gas station', value: 'gas' },
            { label: 'Parking', value: 'parking' },
            { label: 'Car wash', value: 'car-wash' },
        ]
    }
];

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
        this.onPick({ type: 'category', value: category.value, label: category.label });
    }

    onInner = (ref: any) => {
        this.inner += ref ? 1 : -1;
    }

    render() {
        let content = (
            <XVertical >
                {CATALOG.map(group => (
                    <XPopper
                        key={group.label}
                        showOnHover={true}
                        placement="right-start"
                        content={
                            group.options.map(category => <XMenuItem ref={this.onInner} key={category.value} onClick={(e) => this.onClick(category)}>{category.label}</XMenuItem>)}
                    >
                        <XMenuItem>{group.label}</XMenuItem>
                    </XPopper>
                ))}
            </XVertical>
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