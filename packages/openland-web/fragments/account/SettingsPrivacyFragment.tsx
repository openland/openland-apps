import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextDensed, TextLabel1 } from 'openland-web/utils/TextStyles';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-api/useClient';
import { FormSection } from './components/FormSection';
// import { useIsMobile } from 'openland-web/hooks/useIsMobile';

const entityItemContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    height: 64px;
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(242, 243, 245, 0.56) 0%, #f2f3f5 100%);
`;

const entityItemTitle = css`
    color: var(--foregroundSecondary);
`;

const entityItemSubtitle = css`
    color: var(--foregroundPrimary);
`;

interface EntityItemProps {
    title: string;
    subtitle: string;
    button?: JSX.Element;
}

const EntityItem = React.memo((props: EntityItemProps) => {
    return (
        <div className={entityItemContainer}>
            <XView flexGrow={1}>
                <div className={cx(entityItemTitle, TextDensed)}>{props.title}</div>
                <div className={cx(entityItemSubtitle, TextLabel1)}>{props.subtitle}</div>
            </XView>
        </div>
    );
});

export const SettingsPrivacyFragment = React.memo(() => {
    const client = useClient();
    const { phone, email } = client.useAuthPoints().authPoints;
    // const isMobile = useIsMobile();
    return (
        <Page track="account_privacy">
            <UHeader title="Account and privacy" />
            <XView marginTop={12}>
                <FormSection title="Login methods">
                    <XView
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        marginTop={8}
                    >
                        <XView flexGrow={1} flexShrink={0} flexBasis={0} marginRight={8}>
                            <EntityItem title="Phone" subtitle={phone || 'Not paired'} />
                        </XView>
                        <XView flexGrow={1} flexShrink={0} flexBasis={0} marginLeft={8}>
                            <EntityItem title="Email" subtitle={email || 'Not paired'} />
                        </XView>
                    </XView>
                </FormSection>
            </XView>
        </Page>
    );
});
