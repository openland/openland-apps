import * as React from 'react';
import { withUserInfo } from '../Base/UserInfo';
import { XCard } from '../X/XCard';
import { XView } from '../X/XView';
import { XButton } from '../X/XButton';
import { XVertical } from '../X/XVertical';

export const AuthenticationRequired = withUserInfo((props) => {
    if (props.isLoggedIn) {
        return <>{props.children}</>;
    } else {
        return (
            <>
            <XView css={{ flexGrow: 1 }} alignItems="center" justifyContent="center">
                <XCard>
                    <XCard.Content>
                        <XVertical>
                            Authentication Required!
                        <XButton path="/auth/login">Log In</XButton>
                        </XVertical>
                    </XCard.Content>
                </XCard>
            </XView>
            </>
        );
    }
})