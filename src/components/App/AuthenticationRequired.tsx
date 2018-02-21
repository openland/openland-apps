import * as React from 'react';
import { withUserInfo } from '../Base/UserInfo';
import { XCard } from '../X/XCard';
import { XView } from '../X/XView';
import { XButton } from '../X/XButton';
import { XVertical } from '../X/XVertical';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { withRouter } from '../../utils/withRouter';
import { XHead } from '../X/XHead';

export const AuthenticationRequired = withRouter<{}>(withUserInfo((props) => {

    if (props.isLoggedIn) {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return (
            <>
                <XHead title={['Statecraft', 'Authentication Required']} />
                <XDocumentAppRoot>
                    <XView css={{ flexGrow: 1 }} alignItems="center" justifyContent="center">
                        <XCard shadow="medium">
                            <XCard.Content>
                                <XVertical>
                                    Authentication Required!
                                    <XButton path={'/auth/login?r=' + encodeURIComponent(props.router.pathname)}>Log In</XButton>
                                </XVertical>
                            </XCard.Content>
                        </XCard>
                    </XView>
                </XDocumentAppRoot>
            </>
        );
    }
}))