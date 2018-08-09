import * as React from 'react';
import Glamorous from 'glamorous';
import { XModal, XModalProps } from 'openland-x-modal/XModal';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';

function dataReturner() {
    let dataArr: {
        name: string;
        id: string;
        members: number;
        listings: number;
    }[] = [];

    for (let i = 0; i < 30; i++) {
        dataArr.push({
            id: Math.random().toString(35).substring(2),
            name: 'Channel ' + Math.random().toString(35).substring(2),
            members: Math.floor(Math.random() * 100),
            listings: Math.floor(Math.random() * 100)
        });
    }

    return dataArr;
}

interface ChannelsListProps {
    channels: {
        name: string;
        id: string;
        members: number;
        listings: number;
    }[];
}

const ChannelsList = (props: ChannelsListProps) => (
    <XVertical>
        {props.channels.map(i => (
            <div key={i.id}>
                <div>name - {i.name}</div>
                <div>{i.members} - members</div>
                <div>{i.listings} - listings</div>
            </div>
        ))}
    </XVertical>
);

interface BrowseChannelsModalProps extends Partial<XModalProps> {
    channels: {
        name: string;
        id: string;
        members: number;
        listings: number;
    }[];
}

interface BrowseChannelsModalState {
    searchText: string;
    channels: {
        name: string;
        id: string;
        members: number;
        listings: number;
    }[];
}

class BrowseChannelsModalRaw extends React.Component<BrowseChannelsModalProps, BrowseChannelsModalState> {
    constructor(props: BrowseChannelsModalProps) {
        super(props);

        this.state = {
            searchText: '',
            channels: this.props.channels,
        };
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        let channels = this.props.channels;

        let val = (e.target as any).value as string;

        channels = channels.filter(channel => (
            channel.name.toLowerCase().indexOf(val.toLocaleLowerCase()) !== -1
        ));

        this.setState({
            searchText: val,
            channels: channels
        });
    }

    render() {

        return (
            <XModal
                title={this.props.title}
                target={this.props.target}
                useTopCloser={true}
            >
                <XInput
                    value={this.state.searchText}
                    onChange={() => this.handleSearchChange}
                    placeholder="start typing..."
                    size="r-default" 
                    iconRight="search"
                    color="primary-sky-blue"
                />
                <XVertical>
                    <ChannelsList channels={this.state.channels} />
                </XVertical>
            </XModal>
        );
    }
}

export const BrowseChannelsModal = (props: XModalProps) => (
    <BrowseChannelsModalRaw {...props} channels={dataReturner()} />
);