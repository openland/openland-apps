import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XPopperContent } from 'openland-x/popper/XPopperContent';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { XAvatar2 } from 'openland-x/XAvatar2';

const contentWrapperClassName = css`
    cursor: pointer;
    color: #1790ff;
`;

export type JoinedUserPopperRowProps = {
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
            <XAvatar2 src={photo} title={title} id={id} size={28} />
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

export const OthersPopper = (props: { items: JoinedUserPopperRowProps[]; children: any }) => {
    return (
        <XPopper
            contentContainer={<XPopperContent />}
            content={props.items.map((item, key) => (
                <JoinedUserPopperRow {...item} key={key} />
            ))}
            showOnHover={true}
            placement="top"
        >
            <span className={contentWrapperClassName}>{props.children}</span>
        </XPopper>
    );
};
