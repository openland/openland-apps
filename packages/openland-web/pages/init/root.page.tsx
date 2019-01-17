import * as React from 'react';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { AuthRouter } from '../root/AuthRouter';
import { InitTexts } from './_text';
import { withUserInfo } from '../../components/UserInfo';
import { withAppBase } from '../../components/withAppBase';
import HomePage from 'openland-landing/home.page';
import { EnvironmentContext } from '../root/EnvironmentContext';

export default withAppBase(
    'Root',
    withUserInfo(props => {

        let env = React.useContext(EnvironmentContext);

        return (
            <AuthRouter>
                {(env.isApp || props.isCompleted) && (
                    <>
                        <XDocumentHead
                            title={InitTexts.rootPageTitle}
                            titleSocial={InitTexts.socialPageTitle}
                        />
                        <XPageRedirect path={'/mail'} />
                    </>
                )}
                {!(env.isApp || props.isCompleted) && (
                    <HomePage />
                )}
            </AuthRouter>
        );
    }),
);
