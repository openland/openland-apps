import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { AppFull } from 'openland-api/Types';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XOverflow } from '../../openland-web/components/XOverflow';
import { XView } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XAvatar } from 'openland-x/XAvatar';

interface XUserCardProps {
    app: AppFull;
    customButton?: any;
    customMenu?: any;
    extraMenu?: any;
}

interface XUserCardState {
    isHovered: boolean;
}

export class XAppCard extends React.Component<XUserCardProps, XUserCardState> {
    state = {
        isHovered: false,
    };

    render() {
        let { app, customButton, customMenu, extraMenu } = this.props;

        let button = customButton;
        let menu =
            typeof customMenu === 'undefined' ? (
                <>
                    {extraMenu && (
                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            content={<div>{extraMenu}</div>}
                        />
                    )}
                </>
            ) : (
                customMenu
            );

        return (
            <XView
                backgroundColor="#ffffff"
                paddingVertical={12}
                paddingHorizontal={16}
                marginHorizontal={-16}
                borderRadius={8}
                height={64}
                hoverBackgroundColor="#f9f9f9"
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XView flexDirection="row" justifyContent="space-between">
                    <XAvatar
                        photoRef={app.photoRef || undefined}
                        objectName={app.name}
                        objectId={app.id}
                        style="colorus"
                    />
                    <XView flexDirection="row" flexGrow={1} marginLeft={16}>
                        <XView flexGrow={1} marginRight={12}>
                            <XView
                                flexDirection="row"
                                fontSize={14}
                                lineHeight="22px"
                                fontWeight="600"
                                color="#000000"
                                marginTop={-2}
                                marginBottom={2}
                            >
                                {app.name}
                            </XView>
                            <XView fontSize={13} lineHeight="18px" color="rgba(0, 0, 0, 0.5)">
                                /{app.shortname}
                            </XView>
                        </XView>
                        <XView flexDirection="row" alignItems="center">
                            {button}
                            {(customMenu || extraMenu) && <XView marginLeft={10}>{menu}</XView>}
                        </XView>
                    </XView>
                </XView>
            </XView>
        );
    }
}
