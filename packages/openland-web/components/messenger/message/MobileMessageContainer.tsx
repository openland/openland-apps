import * as React from 'react';
import { XView } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UserShort } from 'openland-api/Types';

export interface MobileMessageContainerProps {
    children: any;
    sender: UserShort;
    senderNameEmojify: any;
    date: number;
}

const MobileMessageContainerWrapper = ({ children }: { children: any }) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            marginTop={12}
            paddingTop={7}
            paddingLeft={18}
            paddingRight={20}
            paddingBottom={3}
        >
            {children}
        </XView>
    );
};

interface PreambulaContainerProps {
    children: any;
    onClick?: () => void;
    haveReactions?: boolean;
}

const NotCompactPreambulaContainer = ({ children }: PreambulaContainerProps) => {
    return (
        <XView
            alignSelf="flex-start"
            minHeight={23}
            width={55}
            fontSize={12}
            whiteSpace={'nowrap'}
            paddingTop={3}
            paddingLeft={3}
        >
            {children}
        </XView>
    );
};

export const MobileMessageContainer = (props: MobileMessageContainerProps) => {
    const { sender, date } = props;

    const preambula = (
        <NotCompactPreambulaContainer>
            <XAvatar2 id={sender.id} title={sender.name} src={sender.photo} size={36} />
        </NotCompactPreambulaContainer>
    );

    // Content
    const content = (
        <XView
            flexDirection="column"
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            minWidth={0}
            alignItems="stretch"
        >
            <XView flexDirection="row" marginBottom={4}>
                <XView flexDirection="row">
                    <XView
                        flexDirection="row"
                        fontSize={14}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.8)"
                    >
                        {props.senderNameEmojify}
                    </XView>
                    {props.sender.primaryOrganization && (
                        <XView
                            as="a"
                            fontSize={12}
                            fontWeight="600"
                            color="rgba(0, 0, 0, 0.4)"
                            paddingLeft={8}
                            alignSelf="flex-end"
                            marginBottom={-1}
                            path={`/mail/o/${props.sender.primaryOrganization.id}`}
                            hoverTextDecoration="none"
                        >
                            {props.sender.primaryOrganization.name}
                        </XView>
                    )}
                </XView>
                <XView
                    paddingLeft={8}
                    fontSize={12}
                    color="rgba(0, 0, 0, 0.4)"
                    fontWeight="600"
                    alignSelf="flex-end"
                    marginBottom={-1}
                >
                    <XDate value={date.toString()} format="time" />
                </XView>
            </XView>
            <XView flexDirection="column">{props.children}</XView>
        </XView>
    );

    return (
        <MobileMessageContainerWrapper>
            {preambula}
            {content}
        </MobileMessageContainerWrapper>
    );
};
