import * as React from 'react';
import Glamorous from 'glamorous';
import { withUserInfo } from '../Base/UserInfo';
import { XPopover } from '../X/XPopover';
import { XButton } from '../X/XButton';
import { XCard } from '../X/XCard';
import { XMenu } from '../X/XMenu';

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

let Avatar = withUserInfo<{ onClick?: any }>((props) => {
    return (<AvatarImg src={props.user!!.picture} onClick={props.onClick} />)
});

export let AppHeader = () => {
    return (
        <Header>
            <div />
            <XPopover placement="bottom-end">
                <XPopover.Target>
                    <Avatar />
                </XPopover.Target>
                <XPopover.Content>
                    <XMenu>
                        <XMenu.Item>Make something people want</XMenu.Item>
                    </XMenu>
                </XPopover.Content>
            </XPopover>
        </Header>)
}