import * as React from 'react';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { InitTexts } from './_text';
import { withUserInfo } from '../../components/UserInfo';
import { withAppBase } from '../../components/withAppBase';
import { HomePage } from 'openland-landing/home.page';
import { EnvironmentContext } from '../root/EnvironmentContext';

export default withAppBase(
    'Root',
    withUserInfo((props) => {
        let env = React.useContext(EnvironmentContext);

        if (env.isApp || props.isCompleted) {
            return (
                <>
                    <XDocumentHead
                        title={InitTexts.rootPageTitle}
                        titleSocial={InitTexts.socialPageTitle}
                    />
                    <XPageRedirect path={'/mail'} />
                </>
            );
        }

        return <HomePage />;
    }),
);
