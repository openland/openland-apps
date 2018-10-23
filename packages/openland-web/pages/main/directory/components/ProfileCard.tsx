import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';

interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

const ProfileCardWrapper = makeNavigable(Glamorous.div<NavigableChildProps>((props) => ({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#fff',
    padding: '11px 24px 10px 23px',
    '&:hover': {
        backgroundColor: '#F9F9F9'
    },
    cursor: 'pointer'
})));

const ProfileContentWrapper = Glamorous(XHorizontal)({
    flexGrow: 1,
    marginLeft: -1
});

const ProfileInfoWrapper = Glamorous.div({
    flexGrow: 1,
    paddingTop: 1,
});

const ProfileAvatar = Glamorous(XAvatar)({
    cursor: 'pointer'
});

const ProfileName = Glamorous(XLink)({
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 500,
    letterSpacing: -0.4,
    color: '#1790ff',
    display: 'block',
    marginBottom: 4
});

const ProfileOrganization = Glamorous.div({
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: -0.5,
    color: '#99a2b0'
});

const ProfileToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 4
});

interface ProfileCardProps {
    item: {
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization: {
            id: string,
            name: string,
            photo: string | null,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null,
        isYou: boolean,
    };
    onPick: (q: SearchCondition) => void;
}

export class ProfileCard extends React.Component<ProfileCardProps, { isHovered: boolean }> {
    constructor(props: ProfileCardProps) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    render() {
        let user = this.props.item;

        return (
            <ProfileCardWrapper
                path={'/directory/u/' + user.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal justifyContent="space-between" separator={12}>
                    <XLink path={'/directory/u/' + user.id}>
                        <ProfileAvatar
                            cloudImageUuid={user.picture || undefined}
                            objectId={user.id}
                            objectName={user.name}
                            style="colorus"
                        />
                    </XLink>
                    <ProfileContentWrapper>
                        <ProfileInfoWrapper>
                            <ProfileName path={'/directory/u/' + user.id}>{user.name}</ProfileName>
                            {user.primaryOrganization && <ProfileOrganization>{user.primaryOrganization.name}</ProfileOrganization>}
                        </ProfileInfoWrapper>
                        <ProfileToolsWrapper separator={5}>
                            {user.isYou
                                ? (<XButton
                                    style={this.state.isHovered ? 'primary' : 'default'}
                                    path={'/settings/profile'}
                                    text="Edit profile"
                                />)
                                : (<XButton
                                    style={this.state.isHovered ? 'primary' : 'default'}
                                    path={'/mail/' + user.id}
                                    text="Message"
                                />)
                            }
                        </ProfileToolsWrapper>
                    </ProfileContentWrapper>
                </XHorizontal>
            </ProfileCardWrapper>
        );
    }
}