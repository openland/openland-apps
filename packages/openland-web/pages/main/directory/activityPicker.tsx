import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const LOOKINGFOR = {
    label: 'Looking for',
    options: [
        { label: 'Lookingfor1', value: 'Lookingfor1' },
        { label: 'Lookingfor2', value: 'Lookingfor2' },
        { label: 'Lookingfor3', value: 'Lookingfor3' },
    ]
};

const RECENT = {
    label: 'Recent events',
    options: [
        { label: 'Recent1', value: 'Recent1' },
        { label: 'Recent2', value: 'Recent2' },
        { label: 'Recent3', value: 'Recent3' },
    ]
};

export class ActivityPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { popper: boolean }> {
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
            <XHorizontal>
                <XVertical >
                    {LOOKINGFOR.options.map(role => <XMenuItem key={role.value} onClick={(e) => this.onClick(role)}>{role.label}</XMenuItem>)}
                </XVertical>
                <XVertical >
                    {RECENT.options.map(role => <XMenuItem key={role.value} onClick={(e) => this.onClick(role)}>{role.label}</XMenuItem>)}
                </XVertical>
            </XHorizontal>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
            >
                <XButton text="Activity" onClick={this.switch} />
            </XPopper>
        );
    }
}