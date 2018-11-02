import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const Root = Glamorous.div({
    display: 'flex',
    height: '100vh',
    width: '100%',
    background: '#ffffff',
    position: 'relative',
    flexDirection: 'column'
});

const HeaderWrapper = Glamorous.div({
    padding: '19px 32px'
});

const HeaderLogo = Glamorous.div({
    width: 145,
    height: 42,
    background: 'url(/static/X/signup/logo-2.svg) no-repeat',
    backgroundSize: '100% 100%'
});

const Box = Glamorous.div({
    flex: 1,
    display: 'flex',
    alignItems: 'center'
});

const Inner = Glamorous.div({
    position: 'relative',
    flex: 1
});

const Image = Glamorous.div({
    margin: '-9px auto 53px',
    width: 346,
    height: 222,
    background: 'url(/static/X/illustration-error.png) no-repeat',
    backgroundImage: '-webkit-image-set(url(/static/X/illustration-error.png) 1x, url(/static/X/illustration-error@2x.png) 2x)',
    backgroundSize: '100% auto',
    backgroundPosition: 'center bottom',
});

const Title = Glamorous.div({
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '29px',
    letterSpacing: 0,
    color: '#000000',
    marginBottom: 10,
});

const Description = Glamorous.div({
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 28,

    '& a': {
        color: '#1790ff',

        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

const ButtonsWrapper = Glamorous(XHorizontal)({
    width: 150,
    margin: '0 auto'
});

const Button = Glamorous(XButton)({
    flex: 1
});

const Copyrights = Glamorous.div({
    padding: '14px 0',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)'
});

export class ErrorPage extends React.Component<{ statusCode: number | null | undefined, message?: string }> {
    render() {
        return (
            <>
                <XDocumentHead title={this.props.statusCode === 404 ? ['Error 404: Not found'] : ['Something went wrong']} />
                <XTrack event="View 404">
                    <Root>
                        <HeaderWrapper>
                            <HeaderLogo />
                        </HeaderWrapper>
                        <Box>
                            <Inner>
                                <Image />
                                <Title>{this.props.statusCode === 404 ? 'Not found' : (this.props.message || 'Something went wrong')}</Title>
                                <Description>
                                    {this.props.statusCode === 404 && 'We can\'t seem to find the page you are looking for.'}
                                    {this.props.statusCode !== 404 && (
                                        <>
                                            Return home or contact our team at <a href="mailto:hello@openland.com">hello@openland.com</a>
                                        </>
                                    )}
                                </Description>
                                <ButtonsWrapper separator={12}>
                                    <Button style="primary" path="/" text="Return home" size="large" />
                                </ButtonsWrapper>
                            </Inner>
                        </Box>
                        <Copyrights>© Openland {new Date().getFullYear()}</Copyrights>
                    </Root>
                </XTrack>
            </>
        );
        // return 'Error: ' + this.props.statusCode;
    }
}