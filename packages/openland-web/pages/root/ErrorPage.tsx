import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import { css } from 'linaria';

const Description = css`
    text-align: center;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 28px;

    a {
        color: #1790ff;

        &:hover {
            text-decoration: underline;
        }
    }
`;

interface ErrorPageProps {
    statusCode: number | null | undefined;
    message?: string;
}

export const ErrorPage = (props: ErrorPageProps) => (
    <>
        <XDocumentHead title={props.statusCode === 404 ? 'Not found' : 'Something went wrong'} />
        <XTrack event="View 404">
            <XView minHeight="100vh" width="100%" backgroundColor="#ffffff" alignItems="center">
                <XView
                    paddingTop={19}
                    paddingLeft={32}
                    paddingBottom={19}
                    paddingRight={32}
                    alignSelf="flex-start"
                >
                    <XView as="img" width={145} height={42} src="/static/X/signup/logo-2.svg" />
                </XView>
                <XView flexGrow={1} alignItems="center">
                    <XView flexGrow={1} justifyContent="center" alignItems="center">
                        <XView
                            as="img"
                            marginTop={-9}
                            marginBottom={53}
                            width={346}
                            height={222}
                            src="/static/X/illustration-error.png"
                            srcSet="/static/X/illustration-error@2x.png 2x"
                        />
                        <XView fontSize={24} lineHeight="29px" color="#000000" marginBottom={10}>
                            {props.statusCode === 404
                                ? 'Not found'
                                : props.message || 'Something went wrong'}
                        </XView>
                        <div className={Description}>
                            Return home or contact our team at{' '}
                            <a href="mailto:hello@openland.com">hello@openland.com</a>
                        </div>
                        <XView width={150}>
                            <XButton
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
                    color="rgba(0, 0, 0, 0.4)"
                >
                    © Openland {new Date().getFullYear()}
                </XView>
            </XView>
        </XTrack>
    </>
);
