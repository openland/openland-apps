import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XAvatar } from 'openland-x/XAvatar';
import { XPopper } from 'openland-x/XPopper';
import { XPopperContent } from 'openland-x/popper/XPopperContent';
import { XView } from 'react-mental';
import { css } from 'linaria';

type JoinedUserPopperRowProps = {
    title: string;
    subtitle: string;
    photo: string;
    id: string;
};

export const JoinedUserPopperRow = ({ title, subtitle, photo, id }: JoinedUserPopperRowProps) => {
    return (
        <XView
            cursor="pointer"
            flexDirection="row"
            alignItems="center"
            hoverBackgroundColor="#f9f9f9"
            paddingLeft={16}
            paddingRight={16}
            width={393}
            height={36}
            path={'/mail/u/' + id}
        >
            <XAvatar
                style="user"
                cloudImageUuid={photo === null ? undefined : photo}
                objectName={title}
                objectId={id}
                size="m-small"
            />
            <XView
                marginLeft={12}
                flexDirection="column"
                fontSize={12}
                fontWeight={'600'}
                lineHeight={1.67}
                color={'#000'}
            >
                {title}
            </XView>
            <XView
                marginLeft={9}
                flexDirection="column"
                opacity={0.4}
                fontSize={12}
                fontWeight={'600'}
                lineHeight={'1.5'}
                color={'#000'}
            >
                {subtitle}
            </XView>
            <XView flexGrow={1} />
            <XView>
                <XButton text="Message" style="primary" size="tiny" path={'/mail/' + id} />
            </XView>
        </XView>
    );
};

const xPopperContentClassName = css`
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
`;

export const OthersPopper = (props: any) => {
    return (
        <XPopper
            contentContainer={<XPopperContent className={xPopperContentClassName} />}
            content={props.items.map((item: any, key: any) => {
                return <JoinedUserPopperRow {...item} key={key} />;
            })}
            show={true}
            // showOnHover={true}
            placement="top"
        >
            <XView cursor="pointer" color="#1790ff">
                {props.children}
            </XView>
        </XPopper>
    );
};
