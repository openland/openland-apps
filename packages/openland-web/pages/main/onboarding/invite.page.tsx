import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { Scaffold } from '../../../components/Scaffold';
import { XSContainer } from 'openland-xs/XSContainer';
import { XSDialog } from 'openland-xs/XSDialog';
import { XSDialogTitle } from 'openland-xs/XSDialogTitle';
import { XButton } from 'openland-x/XButton';
import { XSAnimatedShadowView } from 'openland-xs/XSAnimatedShadowView';
import { XSAnimatedView } from 'openland-xs/XSAnimatedView';
import { XSAnimated } from 'openland-xs/XSAnimated';
import { XSGroup } from 'openland-xs/XSGroup';

const Container = Glamorous.div({
    position: 'relative',
    display: 'flex',
    width: 600,
    height: 300
});

const Page = Glamorous(XSAnimatedView)({
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'stretch',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
});

const Separator = Glamorous.div({
    height: '1px',
    width: '100%',
    backgroundColor: '#eee',
    marginTop: 8,
    marginBottom: 8
});

class InviteComponent extends React.PureComponent<{}, { activePage: number, visible1: boolean, visible2: boolean }> {

    private initialPage = new XSAnimatedShadowView({ opacity: 1 });
    private secondPage = new XSAnimatedShadowView({ opacity: 0 });

    constructor(props: {}) {
        super(props);
        this.state = {
            activePage: 0,
            visible1: true,
            visible2: false
        };
    }

    private handleInviteMyOrganization = () => {
        XSAnimated.animate(
            () => {
                this.initialPage.opacity = 0;
                this.secondPage.opacity = 1;
            },
            () => {
                this.setState({ visible1: false, visible2: true });
            }
        );
        this.setState({ activePage: 1, visible1: true, visible2: true });
    }

    private handleInviteOrganization = () => {
        XSAnimated.animate(
            () => {
                this.initialPage.opacity = 0;
                this.secondPage.opacity = 1;
            },
            () => {
                this.setState({ visible1: false, visible2: true });
            });
        this.setState({ activePage: 1, visible1: true, visible2: true });
    }

    private handleBack = () => {
        XSAnimated.animate(
            () => {
                this.initialPage.opacity = 1;
                this.secondPage.opacity = 0;
            },
            () => {
                this.setState({ visible1: true, visible2: false });
            });
        this.setState({ activePage: 0, visible1: true, visible2: true });
    }

    render() {
        return (
            <XSDialog>
                <XSDialogTitle>Invite people</XSDialogTitle>
                <Container>
                    <Page shadow={this.initialPage} css={{ visibility: this.state.visible1 ? 'visible' : 'hidden' }}>
                        <XSGroup>
                            <XButton text="Invite to my organization" onClick={this.handleInviteMyOrganization} />
                            <Separator />
                            <XButton text="Invite other organization" onClick={this.handleInviteOrganization} />
                            <Separator />
                        </XSGroup>
                    </Page>
                    <Page shadow={this.secondPage} css={{ visibility: this.state.visible2 ? 'visible' : 'hidden' }}>
                        <XButton text="back" onClick={this.handleBack} />
                    </Page>
                </Container>
            </XSDialog>
        );
    }
}

export default withApp('Invite', 'viewer', () => {
    return (
        <Scaffold>
            <Scaffold.Content>
                <XSContainer>
                    <InviteComponent />
                </XSContainer>
            </Scaffold.Content>
        </Scaffold>
    );
});