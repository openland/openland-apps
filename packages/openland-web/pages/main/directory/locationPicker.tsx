import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XIcon } from 'openland-x/XIcon';
import Glamorous from 'glamorous';
import { SearchCondition } from './root.page';
import { TextDirectory, TextDirectoryData } from 'openland-text/TextDirectory';
import { MultiplePicker } from './multiplePicker';

export const MultiStateRegions = TextDirectoryData.locationPicker.MultiStateRegions;
export const States = TextDirectoryData.locationPicker.States;
export const MetropolitanAreas = TextDirectoryData.locationPicker.MetropolitanAreas;
export const Cities = TextDirectoryData.locationPicker.Cities;

const PickerButton = Glamorous(XButton)<{ activated?: boolean }>((props) => ({
    backgroundColor: (props.activated) ? 'white' : 'none',
    borderColor: (props.activated) ? 'rgba(220, 222, 228, 0.5)' : 'none',
}));

const PickerWrapper = Glamorous(XVertical)({
    margin: -10
});

const PickerSearch = Glamorous.div({
    padding: '18px 18px 0',
    position: 'relative'
});

const PickerSearchIcon = Glamorous(XIcon)({
    position: 'absolute',
    top: 18,
    right: 27,
    fontSize: 20,
    lineHeight: '40px'
});

export class LocationControlledPicker extends React.Component<{ query?: string, onPick: (location: string) => void }> {
    options = [
        { label: TextDirectory.locationCities, values: Cities },
        { label: TextDirectory.locationMetropolitanAreas, values: MetropolitanAreas },
        { label: TextDirectory.locationStates, values: States },
        { label: TextDirectory.locationMultiStateRegions, values: MultiStateRegions },
    ];
    render() {
        return (<MultiplePicker title="Top locations" options={this.options} onPick={this.props.onPick} query={this.props.query} />);
    }
}

export class LocationPopperPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { query: string, popper: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { query: '', popper: false };
    }
    handleChange = (v: string) => {
        this.setState({ query: v });
    }

    onPick = (q: string) => {
        this.props.onPick({ type: 'location', value: q, label: q });
        this.setState({ query: '', popper: false });
    }

    onEnter = () => {
        if (this.state.query.length === 0) {
            return;
        }
        this.onPick(this.state.query);
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
                    <XInput placeholder={TextDirectory.locationSearchPlaceholder} value={this.state.query} onChange={this.handleChange} onEnter={this.onEnter} />
                    <PickerSearchIcon icon="search" />
                </PickerSearch>
                <LocationControlledPicker onPick={this.onPick} query={this.state.query} />
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
                <PickerButton iconOpacity={0.4} activated={this.state.popper} text={TextDirectory.locationPicker} style="flat" iconRight="expand_more" onClick={this.switch} />
            </XPopper>
        );
    }
}
