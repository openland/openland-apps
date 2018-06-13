import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { withUserInfo } from '../../../components/UserInfo';
import { XVertical } from 'openland-x-layout/XVertical';
import { XLink } from 'openland-x/XLink';

const HeaderImage = Glamorous.div({
    backgroundColor: '#5938e8',
    height: '164px',
    marginBottom: '-64px'
});

const Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center'
});

const ContainerInner = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
});

const ContainerTitle = Glamorous.div({
    fontSize: '28px',
    color: '#ffffff',
    opacity: 0.9,
    lineHeight: '64px',
    paddingLeft: 16,
    paddingRight: 16
});

const HyperButton = Glamorous(XLink)({
    display: 'flex',
    flexDirection: 'row',
    height: 128,
    boxShadow: '0 2px 4px 1px rgba(0,0,0,.05), 0 4px 24px 2px rgba(0,0,0,.05)',
    marginTop: 48,
    alignItems: 'center',
    padding: 64,
    fontSize: '24px',
    color: '#000000',
    opacity: 0.7,
});

export default withApp('Home', 'viewer', withUserInfo((props) => {
    return (
        <>
            <XDocumentHead title={props.organization!!.name} />
            <Scaffold>
                <Scaffold.Content padding={false}>
                    <HeaderImage />
                    <Container>
                        <ContainerInner>
                            <XVertical>
                                <ContainerTitle>Welcome to  Openland!</ContainerTitle>
                                <HyperButton path="/settings/profile">Complete Your Profile</HyperButton>
                                <HyperButton path="/settings/invites">Invite partners</HyperButton>
                                <HyperButton>Publish Opportunity</HyperButton>
                                <HyperButton>Find Opportunities</HyperButton>
                            </XVertical>
                        </ContainerInner>
                    </Container>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));