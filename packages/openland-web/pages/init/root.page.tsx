import * as React from 'react';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { AuthRouter } from '../root/AuthRouter';
import { InitTexts } from './_text';
import { withUserInfo } from '../../components/UserInfo';
import { withAppBase } from '../../components/withAppBase';
import HomePage from 'openland-landing/home.page';

export default withAppBase(
    'Root',
    withUserInfo(props => {
        return (
            <AuthRouter>
                {props.isCompleted && (
                    <>
                        <XDocumentHead
                            title={InitTexts.rootPageTitle}
                            titleSocial={InitTexts.socialPageTitle}
                        />
                        <XPageRedirect path={'/mail'} />
                    </>
                )}
                {!props.isCompleted && (
                    <HomePage />
                )}
            </AuthRouter>
        );
    }),
);
