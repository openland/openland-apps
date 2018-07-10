import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';

const CATALOG = {
    options: [
        { label: 'Selling', value: 'Selling' },
        { label: 'Buying', value: 'Buying' },
        { label: 'Joint ventures', value: 'Joint ventures' },
        { label: 'Leasing', value: 'Leasing' },
        { label: 'Option-to-buy', value: 'Option-to-buy' },
    ]
};

export class InterestPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { popper: boolean }> {
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

    onClick = (role: { value: string, label: string }) => {
        this.onPick({ type: 'role', value: role.value, label: role.label });
    }

    render() {
        let content = (
            <XVertical >
                {CATALOG.options.map(role => <XMenuItem key={role.value} onClick={(e) => this.onClick(role)}>{role.label}</XMenuItem>)}
            </XVertical>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
            >
                <XButton text="Interests" onClick={this.switch} />
            </XPopper>
        );
    }
}