import * as React from 'react';
import { AppFull } from 'openland-api/Types';
import { XOverflow } from '../../openland-web/components/XOverflow';
import { XView } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { buildBaseImageUrl } from 'openland-x/XCloudImage';

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
                    <XAvatar2 src={buildBaseImageUrl(app.photoRef)} title={app.name} id={app.id} />
                    <XView flexDirection="row" flexGrow={1} marginLeft={16}>
                        <XView flexGrow={1} marginRight={12} justifyContent="center">
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
                            {app.shortname && (
                                <XView fontSize={13} lineHeight="18px" color="rgba(0, 0, 0, 0.5)">
                                    /{app.shortname}
                                </XView>
                            )}
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
