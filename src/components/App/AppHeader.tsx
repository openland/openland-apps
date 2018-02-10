import * as React from 'react';
import Glamorous from 'glamorous';
import { withUserInfo } from '../Base/UserInfo';
import { XPopover } from '../X/XPopover';
import { XButton } from '../X/XButton';
import { XCard } from '../X/XCard';

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

let Avatar = withUserInfo((props) => {
    return (<AvatarImg src={props.user!!.picture} />)
});

export let AppHeader = () => {
    return (
        <Header>
            <XPopover>
                <XPopover.Target>
                    <XButton>Hey!</XButton>
                </XPopover.Target>
                <XPopover.Content>
                    <XCard>
                        Make something people want
                    </XCard>
                </XPopover.Content>
            </XPopover>
            <Avatar />
        </Header>)
}