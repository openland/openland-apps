import * as React from 'react';
import { XMenuItemWrapper } from 'openland-x/XMenuItem';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCheckbox } from 'openland-x/XCheckbox';
import { withChannelSetFeatured } from 'openland-web/api/withChannelSetFeatured';
import { withChannelSetHidden } from 'openland-web/api/withChannelSetHidden';

class SwitchComponent extends React.Component<
    {
        mutation: any;
        roomId: string;
        val: boolean;
        fieldName: string;
        fieldTitle?: string;
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
                        label={this.props.fieldTitle || this.props.fieldName}
                        value={this.state.val ? 'featured' : 'unfeatured'}
                        trueValue="featured"
                        onChange={() => {
                            this.props.mutation({
                                variables: {
                                    roomId: this.props.roomId,
                                    [this.props.fieldName]: !this.props.val,
                                },
                            });
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

export const RoomSetFeatured = withChannelSetFeatured(props => (
    <SwitchComponent
        mutation={props.setFeatured}
        val={(props as any).val}
        fieldName={'featured'}
        fieldTitle={'Featured'}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{ val: boolean; roomId: string }>;

export const RoomSetHidden = withChannelSetHidden(props => (
    <SwitchComponent
        mutation={props.setHidden}
        val={(props as any).val}
        fieldName={'listed'}
        fieldTitle={'Listed'}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{ val: boolean; roomId: string }>;
