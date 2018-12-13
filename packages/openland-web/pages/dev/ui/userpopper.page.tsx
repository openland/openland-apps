import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XTitle } from 'openland-x/XTitle';
import { XPopper } from 'openland-x/XPopper';
import { XAvatar } from 'openland-x/XAvatar';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';

const Title = Glamorous.span({
    fontFamily: 'SFProText-Semibold',
    fontSize: 12,
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.67,
    letterSpacing: 'normal',
    color: '#000',
});

const SubTitle = Glamorous.span({
    opacity: 0.4,
    fontFamily: 'SFProText-Semibold',
    fontSize: 12,
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#000',
});

const XButtonStyled = Glamorous(XButton)({
    borderRadius: 20,
    width: 68,
    height: 22,
});

type JoinedUserPopperRowProps = {
    title: string;
    subtitle: string;
    userInfo: { photo: string; name: string; id: string };
};

const userInfoExample = {
    id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    name: 'Sergey Lapin',
    photo:
        'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/512x512/0,0/',
};

const joinedUserPopperRowExample = {
    title: 'Sarah Massey',
    subtitle: 'Altpoint Capital',
    userInfo: userInfoExample,
};

const JoinedUserPopperRow = ({
    title,
    subtitle,
    userInfo: { photo, name, id },
    onMessageClick,
}: JoinedUserPopperRowProps & { onMessageClick: Function }) => {
    return (
        <XView
            cursor="pointer"
            flexDirection="row"
            alignItems="center"
            hoverBackgroundColor="#f9f9f9"
            width={393}
            height={36}
        >
            <XAvatar
                cloudImageUuid={photo}
                objectName={name}
                objectId={id}
                size="m-small"
            />
            <XView marginLeft={12} flexDirection="column">
                <Title>{title}</Title>
            </XView>
            <XView marginLeft={9} flexDirection="column">
                <SubTitle>{subtitle}</SubTitle>
            </XView>
            <XView flexGrow={1} />
            <XButtonStyled
                text="Message"
                style="primary"
                size="tiny"
                onClick={() => {
                    onMessageClick(id);
                }}
            />
        </XView>
    );
};

const JoinedUsersPopper = ({
    items,
    onItemMessageClick,
}: {
    items: JoinedUserPopperRowProps[];
    onItemMessageClick: (id: string) => void;
}) => {
    return (
        <div>
            {items.map((item, key) => {
                return (
                    <JoinedUserPopperRow
                        {...item}
                        onMessageClick={onItemMessageClick}
                        key={key}
                    />
                );
            })}
        </div>
    );
};

export default withApp('UI Framework - Popper', 'viewer', props => {
    const onItemMessageClick = (str: string) => {
        console.log(str);
    };

    const joinedUsersPopperElem = (
        <JoinedUsersPopper
            onItemMessageClick={onItemMessageClick}
            items={[
                joinedUserPopperRowExample,
                joinedUserPopperRowExample,
                joinedUserPopperRowExample,
                joinedUserPopperRowExample,
                joinedUserPopperRowExample,
            ]}
        />
    );
    return (
        <DevDocsScaffold title="Popper">
            <XContent>
                <XVertical>
                    <XTitle>Popper</XTitle>
                    <XVertical>
                        {joinedUsersPopperElem}

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <XPopper
                            content={joinedUsersPopperElem}
                            // showOnHover={true}
                            show={true}
                            placement="top"
                        >
                            <XButton text="5 others" alignSelf="flex-start" />
                        </XPopper>
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
