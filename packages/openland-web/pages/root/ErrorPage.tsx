import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XView, XImage } from 'react-mental';
import { css, cx } from 'linaria';
import { TextTitle1 } from 'openland-web/utils/TextStyles';

const descriptionClassName = css`
    text-align: center;
    font-size: 14px;
    line-height: 22px;
    color: var(--foregroundSecondary);
    margin-bottom: 28px;

    a {
        color: var(--accentPrimary);

        &:hover {
            text-decoration: underline;
        }
    }
`;

const errorClassName = css`
    text-align: center;
`;

interface ErrorPageProps {
    statusCode: number | null | undefined;
    message?: string;
}

export const ErrorPage = ({ statusCode, message }: ErrorPageProps) => (
    <>
        <XDocumentHead title={statusCode === 404 ? 'Not found' : 'Something went wrong'} />
        <XTrack event="View 404">
            <XView minHeight="100vh" width="100%" backgroundColor="var(--backgroundPrimary)" alignItems="center">
                <XView flexGrow={1} alignItems="center">
                    <XView flexGrow={1} justifyContent="center" alignItems="center">
                        <XImage
                            marginBottom={16}
                            width={320}
                            height={200}
                            src="/static/X/illustration-error.png"
                            srcSet="/static/X/illustration-error@2x.png 2x"
                        />
                        <XView
                            fontSize={24}
                            lineHeight="29px"
                            color="var(--foregroundPrimary)"
                            marginBottom={10}
                            maxWidth={700}
                        >
                            <span className={cx(TextTitle1, errorClassName)}>
                                {statusCode === 404
                                    ? 'Not found'
                                    : message || 'Something went wrong'}
                            </span>
                        </XView>
                        <div className={descriptionClassName}>
                            Return home or contact our team at{' '}
                            <a href="mailto:hello@openland.com">hello@openland.com</a>
                        </div>
                        <XView width={150}>
                            <UButton
                                style="primary"
                                onClick={() => {
                                    document.location!.replace('/');
                                }}
                                text="Return home"
                                size="large"
                            />
                        </XView>
                    </XView>
                </XView>
                <XView
                    paddingTop={14}
                    paddingBottom={14}
                    fontSize={14}
                    lineHeight="24px"
                    color="var(--foregroundTertiary)"
                >
                    © Openland {new Date().getFullYear()}
                </XView>
            </XView>
        </XTrack>
    </>
);
