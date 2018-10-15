import * as React from 'react';
import Glamorous from 'glamorous';
import { XModal, XModalProps } from 'openland-x-modal/XModal';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';

interface ChannelsProps {
    channels: {
        name: string;
        id: string;
        members: number;
        listings: number;
        invited: boolean;
        member?: boolean;
    }[];
}

function dataReturner() {
    let dataArr: {
        name: string;
        id: string;
        members: number;
        listings: number;
        invited: boolean;
        member?: boolean;
    }[] = [];

    for (let i = 0; i < 30; i++) {
        dataArr.push({
            id: Math.random().toString(35).substring(2),
            name: 'Channel ' + Math.random().toString(35).substring(2),
            members: Math.floor(Math.random() * 100),
            listings: Math.floor(Math.random() * 100),
            invited: i % 4 === 0 ? true : false,
            member: i % 5 === 0 ? true : undefined,
        });
    }

    return dataArr;
}

const ChannelsWrapper = Glamorous.div({
    maxHeight: '65vh',
    overflowY: 'scroll',
});

const ChannelRow = Glamorous(XHorizontal)({
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    '&:hover': {
        backgroundColor: '#f9fafb',
        '& > a.invite': {
            backgroundColor: 'rgb(23, 144, 255)',
            color: 'rgb(255, 255, 255)',
            '&:hover': {
                backgroundColor: 'rgb(69, 166, 255)',
                color: 'rgb(255, 255, 255)'
            }
        }
    },
    '& > a.invite': {
        backgroundColor: 'rgba(238, 240, 242, 0.5)',
        color: '#334562'
    }
});

const ChannelName = Glamorous.div({
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: -0.2,
    color: '#1790ff'
});

const ChannelText = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.29,
    letterSpacing: -0.3,
    color: '#99a2b0'
});

const ChannelsList = (props: ChannelsProps) => (
    <ChannelsWrapper>
        {props.channels.map(i => (
            <ChannelRow
                key={i.id}
                alignItems="center"
                justifyContent="space-between"
                flexGrow={1}
            >
                <XVertical separator={1}>
                    <ChannelName>{i.name}</ChannelName>
                    <ChannelText>{i.members} members • {i.listings} listings</ChannelText>
                </XVertical>
                {i.member === true && (
                    <XButton
                        text="member"
                        style="ghost"
                        size="r-default"
                        className="member"
                    />
                )}
                {!i.member && (
                    <XButton
                        text={i.invited ? 'Pending' : 'Reques invite'}
                        style={i.invited ? 'ghost' : 'primary-sky-blue'}
                        size="r-default"
                        className={i.invited ? undefined : 'invite'}
                    />
                )}
            </ChannelRow>
        ))}
    </ChannelsWrapper>
);

const InputWrapper = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24
});

interface BrowseChannelsModalState extends ChannelsProps {
    searchText: string;
}

class BrowseChannelsModalRaw extends React.Component<ChannelsProps & Partial<XModalProps>, BrowseChannelsModalState> {
    constructor(props: ChannelsProps & Partial<XModalProps>) {
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
                // customContent={true}
                body={(
                    <XVertical separator={3}>
                        <InputWrapper>
                            <XInput
                                value={this.state.searchText}
                                onChange={() => this.handleSearchChange}
                                placeholder="start typing..."
                                size="large"
                                iconRight="search"
                            />
                        </InputWrapper>

                        <XVertical>
                            <ChannelsList channels={this.state.channels} />
                        </XVertical>
                    </XVertical>
                )}
            />
        );
    }
}

export const BrowseChannelsModal = (props: XModalProps) => (
    <BrowseChannelsModalRaw {...props} channels={dataReturner()} scrollableContent={true} />
);