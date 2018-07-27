import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { MultiplePicker } from './multiplePicker';
import { XCheckboxBasic } from 'openland-x/XCheckbox';
import { delay } from 'openland-y-utils/timer';

const PickerButton = Glamorous(XButton)<{ activated?: boolean }>((props) => ({
    backgroundColor: (props.activated) ? 'white' : 'none',
    borderColor: (props.activated) ? 'rgba(220, 222, 228, 0.5)' : 'none',
}));

const PickerWrapper = Glamorous(XVertical)({
    margin: -10
});

const PickerEntries = Glamorous(XHorizontal)({
    margin: 0
});

class SortControlledPicker extends React.Component<{ query?: string, onPick: (location: { label: string, value: string }) => void }> {
    options = [
        { label: 'Sort by', values: [{ label: 'Last updated', value: 'updatedAt' }, { label: 'Join date', value: 'createdAt' }] },
    ];
    render() {
        return (<MultiplePicker options={this.options} onPick={this.props.onPick} query={this.props.query} />);
    }
}

const CheckboxWrap = Glamorous.div({
    marginTop: 8,
    marginLeft: -10,
    marginRight: -10,
    paddingLeft: 22,
    paddingTop: 16,
    paddingRight: 27,
    borderTop: '1px solid #f1f2f5',
});

export class SortPicker extends React.Component<{ sort: { orederBy: string, featured: boolean }, onPick: (sort: { orederBy: string, featured: boolean }) => void }, { popper: boolean, featured: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { popper: false, featured: props.sort.featured };
    }

    onPick = (q: { label: string, value: string }) => {
        this.close();
        this.props.onPick({ featured: this.props.sort.featured, orederBy: q.value });
    }

    onFeturedChange = (checked: { label: string, checked: boolean }) => {
        this.setState({ featured: checked.checked });
        delay(0).then(() => {
            this.props.onPick({ featured: checked.checked, orederBy: this.props.sort.orederBy });
        });
    }

    switch = () => {
        this.setState({ popper: !this.state.popper });
    }

    close = () => {
        this.setState({ popper: false });
    }

    render() {
        let content = (
            <>
                <PickerWrapper>

                    <PickerEntries separator="none" width="100%">
                        <SortControlledPicker onPick={this.onPick} />
                    </PickerEntries>
                </PickerWrapper>
                <CheckboxWrap>
                    <XCheckboxBasic label="Featured first" value={this.state.featured ? 'f' : ''} trueValue="f" onChange={this.onFeturedChange} />
                </CheckboxWrap>
            </>
        );
        return (
            <XPopper
                placement="bottom-end"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
                arrow={null}
            >
                <PickerButton iconOpacity={0.4} activated={this.state.popper} text={this.props.sort.orederBy === 'createdAt' ? 'Join date' : 'Last updated'} style="flat" iconRight="expand_more" onClick={this.switch} />
            </XPopper>
        );
    }
}