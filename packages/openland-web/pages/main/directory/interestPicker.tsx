import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import Glamorous from 'glamorous';
import { XInput } from 'openland-x/XInput';
import { XIcon } from 'openland-x/XIcon';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { TextDirectory, TextDirectoryData } from 'openland-text/TextDirectory';
import { MultiplePicker } from './multiplePicker';

const PickerButton = Glamorous(XButton)<{ activated?: boolean }>((props) => ({
    backgroundColor: (props.activated) ? 'white' : 'none',
    borderColor: (props.activated) ? 'rgba(220, 222, 228, 0.5)' : 'none',
}));

const PickerWrapper = Glamorous(XVertical)({
    margin: -10
});

const PickerSearch = Glamorous.div({
    padding: '18px 18px 0',
    position: 'relative',
    margin: 0
});

const PickerSearchIcon = Glamorous(XIcon)({
    position: 'absolute',
    top: 18,
    right: 27,
    fontSize: 20,
    lineHeight: '40px'
});

const PickerEntries = Glamorous(XHorizontal)({
    margin: 0
});

class InterestsControlledPicker extends React.Component<{ query?: string, onPick: (location: { label: string, value: string }) => void }> {
    options = [
        { label: TextDirectory.interestTop, values: TextDirectoryData.interestPicker },
    ];
    render() {
        return (<MultiplePicker options={this.options} onPick={this.props.onPick} query={this.props.query} />);
    }
}

export class InterestPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { query: string, popper: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { query: '', popper: false };
    }
    handleChange = (v: string) => {
        this.setState({ query: v });
    }

    onPick = (q: { label: string, value: string }) => {
        this.props.onPick({ type: 'interest', ...q });
        this.setState({ query: '', popper: false });
    }

    switch = () => {
        this.setState({ popper: !this.state.popper });
    }

    close = () => {
        this.setState({ popper: false });
    }

    render() {
        let content = (
            <PickerWrapper>
                <PickerSearch>
                    <XInput placeholder={TextDirectory.interestSearchPlaceholder} value={this.state.query} onChange={this.handleChange} />
                    <PickerSearchIcon icon="search" />
                </PickerSearch>
                <PickerEntries separator="none" width="100%">
                    <InterestsControlledPicker query={this.state.query} onPick={this.onPick} />
                </PickerEntries>
            </PickerWrapper>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
                arrow={null}
            >
                <PickerButton iconOpacity={0.4} activated={this.state.popper} text={TextDirectory.interestPicker} style="flat" iconRight="expand_more" onClick={this.switch} />
            </XPopper>
        );
    }
}