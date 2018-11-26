import * as React from 'react';
import Glamorous from 'glamorous';
import { InviteMembersModal } from './inviteMembersModal';
import { XButton } from 'openland-x/XButton';

const EmptyRoot = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
});

const EmptyContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginBottom: 50
});

const Reactangle = Glamorous.div({
    width: '100%',
    height: 600,
    position: 'absolute',
    top: 'calc(50% - 300px)',
    left: 0,
    backgroundImage: 'url(\'/static/X/messenger/reactangle.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    zIndex: 0,
    pointerEvents: 'none'
});

const ImageWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50,
    alignSelf: 'center',
    marginBottom: 50
});

const Image = Glamorous.div<{ smaller: boolean }>(props => ({
    width: props.smaller ? 350 : 466,
    height: props.smaller ? 200 : 314,
    backgroundImage: 'url(\'/static/X/messenger/channel-members.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
}));

const Text = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.71,
    letterSpacing: -0.2,
    color: '#5c6a81',
    marginBottom: 8
});

const InfoText = Glamorous.div({
    opacity: 0.5,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.4,
    color: '#334562',
    marginBottom: 32
});

export const EmptyComponent = (props: { text: string, aloneMember: boolean, smaller: boolean, channelTitle: string, chatId: string, orgId: string }) => (
    <EmptyRoot>
        <Reactangle />
        <EmptyContent>
            <ImageWrapper>
                <Image smaller={props.smaller} />
            </ImageWrapper>
            {props.aloneMember && <Text>Grow this room</Text>}
            <InfoText>{props.text}</InfoText>
            <InviteMembersModal
                orgId={props.orgId}
                channelTitle={props.channelTitle}
                roomId={props.chatId}
                target={
                    <XButton style="primary" text="Send invitations" />
                }
            />
        </EmptyContent>
    </EmptyRoot>
);