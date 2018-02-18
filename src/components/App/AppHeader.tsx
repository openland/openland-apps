import * as React from 'react';
import Glamorous from 'glamorous';
import { withUserInfo } from '../Base/UserInfo';
import { XPopover } from '../X/XPopover';
import { XMenu } from '../X/XMenu';
import { AppSearch } from './AppSearch';

let Header = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '32px',
    marginTop: '16px',
    justifyContent: 'space-between',
    pointerEvents: 'auto',
    zIndex: 2
})

let UserInfoBox = Glamorous.div({
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
    color: '#525f7f',
    borderBottom: '1px solid #E5EBF2',
    '& > span': {
        display: 'block',
        fontSize: 12,
        lineHeight: '16px',
        fontWeight: 400,
    }
})

const AvatarImg = Glamorous.img({
    overflow: 'hidden',
    borderRadius: '14px',
    marginLeft: 16,
    marginRight: 16,
    width: '28px',
    height: '28px',
    boxShadow: '0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)',
    cursor: 'pointer'
});

let Popover = withUserInfo<{ onClick?: any }>((props) => {
    return (
        <XPopover placement="bottom-end">
                <XPopover.Target>
                    <AvatarImg src={props.user!!.picture} onClick={props.onClick} />
                </XPopover.Target>
                <XPopover.Content>
                    <XMenu>
                        <UserInfoBox>
                            {props.user!!.name}
                            <span>Administrator</span>
                        </UserInfoBox>
                        <XMenu.Item path="/auth/logout">Log Out</XMenu.Item>
                    </XMenu>
                </XPopover.Content>
            </XPopover>
    )
});

export let AppHeader = () => {
    return (
        <Header>
            <AppSearch />
            <Popover />
        </Header>
    )
}