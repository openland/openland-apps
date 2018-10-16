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
    padding: '28px 32px'
});

const HeaderLogo = Glamorous.div({
    width: 132,
    height: 24,
    background: 'url(/static/X/signup/logo.svg) no-repeat',
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

const Rectangle = Glamorous.div({
    width: '100%',
    height: 600,
    position: 'absolute',
    top: 'calc(50% - 300px)',
    left: 0,
    backgroundImage: 'url(\'/static/X/messenger/reactangle.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    zIndex: 0,
    pointerEvents: 'none'
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
    fontWeight: 500,
    lineHeight: '29px',
    letterSpacing: 0.8,
    color: '#1f3449',
    marginBottom: 12,
});

const Description = Glamorous.div({
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: -0.4,
    color: '#606f7e',
    marginBottom: 40,
});

const ButtonsWrapper = Glamorous(XHorizontal)({
    width: 360,
    margin: '0 auto'
});

const Button = Glamorous(XButton)({
    flex: 1
});

const Copyrights = Glamorous.div({
    padding: '14px 0',
    textAlign: 'center',
    opacity: 0.4,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: -0.2,
    color: '#1f3449'
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
                                <Rectangle />
                                <Image />
                                <Title>{this.props.statusCode === 404 ? 'Not found' : (this.props.message || 'Something went wrong')}</Title>
                                <Description>
                                    {this.props.statusCode === 404 && 'We can\'t seem to find the page you are looking for.'}
                                    {this.props.statusCode !== 404 && 'Message Openland team to get help or return to home screen'}
                                </Description>
                                <ButtonsWrapper separator={12}>
                                    <Button size="r-default" style="primary-sky-blue" path="/" text="Return home" />
                                    <Button size="r-default" path="/support/61gk9KRrl9ComJkvYnvdcddr4o" text="Message support" />
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