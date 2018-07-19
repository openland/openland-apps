import * as React from 'react';
import Glamorous from 'glamorous';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XButton } from 'openland-x/XButton';
import { XModal } from 'openland-x-modal/XModal';

const WelcomeModalWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    backgroundImage: 'url(\'/static/X/confetti.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'top -25px center',
    paddingBottom: 24,
    paddingTop: 145,
    paddingLeft: 80,
    paddingRight: 80,
    width: 620,
    margin: 'auto',
    borderRadius: 6
});

const WelcomePopupContent = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const WelcomePopupTitle = Glamorous.div({
    fontSize: 29,
    fontWeight: 600,
    letterSpacing: 0.9,
    color: '#1f3449',
    marginBottom: 45,
});

const WelcomeModalRowsWrapper = Glamorous.div({
    alignSelf: 'center',
    marginBottom: 32
});

const WelcomeModalRow = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    maxWidth: 465,
    marginBottom: 18,
    '& > img': {
        marginRight: 26,
        marginTop: 3
    }
});

const WelcomeModalText = Glamorous.div({
    fontSize: 15,
    lineHeight: 1.47,
    letterSpacing: -0.2,
    color: '#334562'
});

const WelcomeModalButton = Glamorous(XButton)({
    width: 190
});

export class WelcomePopup extends React.Component<{}, { isOpen: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    checkModal = () => {
        if (canUseDOM) {
            localStorage.removeItem('isnewuser');

            this.setState({
                isOpen: false
            });
        }
    }

    componentWillMount() {
        if (canUseDOM) {
            let needToShow = localStorage.getItem('isnewuser');

            if (needToShow === 'newuser') {
                this.setState({
                    isOpen: true
                });
            }
        }
    }

    render() {
        return (
            <XModal
                size="large"
                isOpen={this.state.isOpen}
                closeOnClick={false}
                customContent={true}
                transparent={true}
            >
                <WelcomeModalWrapper>
                    <WelcomePopupContent>
                        <WelcomePopupTitle>Welcome to Openland! </WelcomePopupTitle>
                        <WelcomeModalRowsWrapper>
                            <WelcomeModalRow>
                                <img src="/static/X/ic-home.svg" />
                                <WelcomeModalText>Fill out your profile to attract inbound opportunities</WelcomeModalText>
                            </WelcomeModalRow>
                            <WelcomeModalRow>
                                <img src="/static/X/ic-organization-big.svg" />
                                <WelcomeModalText>Explore organizations directory and start conversations</WelcomeModalText>
                            </WelcomeModalRow>
                            <WelcomeModalRow>
                                <img src="/static/X/ic-messenges.svg" />
                                <WelcomeModalText>Chat with Openland Support to get help for your research</WelcomeModalText>
                            </WelcomeModalRow>
                        </WelcomeModalRowsWrapper>
                        <WelcomeModalButton style="primary" size="large" text="Got it!" onClick={this.checkModal} />
                    </WelcomePopupContent>
                </WelcomeModalWrapper>
            </XModal>
        );
    }
}