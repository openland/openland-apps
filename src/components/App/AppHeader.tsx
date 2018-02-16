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
    justifyContent: 'space-between'
})

const AvatarImg = Glamorous.img({
    overflow: 'hidden',
    borderRadius: '14px',
    marginLeft: 16,
    marginRight: 16,
    width: '28px',
    height: '28px',
    boxShadow: '0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08)'
});

let XMenuDiv = Glamorous(XMenu)({
    backgroundColor: '#fff',
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)'
})

let XMenuItem = Glamorous(XMenu.Item)({
    width: 230,
    height: 28,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#525f7f',
    lineHeight: '28px',
    '&:hover': {
        color: '#525f7f'
    }
})

let Avatar = withUserInfo<{ onClick?: any }>((props) => {
    return (<AvatarImg src={props.user!!.picture} onClick={props.onClick} />)
});

export let AppHeader = () => {
    return (
        <Header>
            <AppSearch />
            <XPopover placement="bottom-end">
                <XPopover.Target>
                    <Avatar />
                </XPopover.Target>
                <XPopover.Content>
                    <XMenuDiv>
                        <XMenuItem path="/auth/logout">Log Out</XMenuItem>
                    </XMenuDiv>
                </XPopover.Content>
            </XPopover>
        </Header>
    )
}