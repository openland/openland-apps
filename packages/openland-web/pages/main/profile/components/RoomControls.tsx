import * as React from 'react';
import { XMenuItemWrapper } from 'openland-x/XMenuItem';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCheckbox } from 'openland-x/XCheckbox';
import { useClient } from 'openland-web/utils/useClient';

class SwitchComponent extends React.Component<
    {
        handler: (val: boolean) => void;
        roomId: string;
        val: boolean;
        fieldTitle: string;
    },
    { val: boolean }
    > {
    constructor(props: any) {
        super(props);
        this.state = { val: props.val };
    }

    render() {
        return (
            <XMenuItemWrapper>
                <XVertical>
                    <XCheckbox
                        label={this.props.fieldTitle}
                        value={this.state.val ? 'featured' : 'unfeatured'}
                        trueValue="featured"
                        onChange={() => {
                            this.props.handler(!this.props.val)
                            this.setState({
                                val: !this.state.val,
                            });
                        }}
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

export const RoomSetFeatured = (props: { val: boolean; roomId: string }) => {
    let client = useClient();
    return (
        <SwitchComponent
            handler={(v) => client.mutateRoomAlterFeatured({ roomId: props.roomId, featured: v })}
            val={props.val}
            fieldTitle={'Featured'}
            roomId={props.roomId}
        />
    );
};

export const RoomSetHidden = (props: { val: boolean; roomId: string }) => {
    let client = useClient();
    return (
        <SwitchComponent
            handler={(v) => client.mutateRoomAlterHidden({ roomId: props.roomId, listed: v })}
            val={props.val}
            fieldTitle={'Listed'}
            roomId={props.roomId}
        />
    );
};
