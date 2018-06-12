import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withOrganizationProfile } from '../../../api';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCard } from 'openland-x/XCard';
import { XAvatar } from 'openland-x/XAvatar';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { XSwitcher } from 'openland-x/XSwitcher';
import { ContactPerson } from '../../../utils/OrganizationProfileFields';
import { withRouter } from 'openland-x-routing/withRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';

const Root = Glamorous(XVertical)({
    backgroundColor: '#f9fafb',
    paddingBottom: 80
});

const MainContent = Glamorous(XVertical)({
    backgroundColor: '#f9fafb',
    padding: '0 40px'
});

const Header = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.4)'
});

const HeaderPicture = Glamorous.div<{ img?: string }>((props) => ({
    height: 238,
    backgroundColor: '#3b345e',
    backgroundImage: 'radial-gradient(circle at 47% 85%, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0))'
}));

const HeaderContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#fff',
    height: 66,
    paddingRight: 40,
    paddingLeft: 192
});

const SwitcherWrapper = Glamorous(XSwitcher)({
    padding: 0,
    height: '100%',
    borderRadius: 0
});

const Switcher = Glamorous(XSwitcher.Item)({
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',

    fontSize: 15,
    fontSeight: 500,
    lineHeight: 1.33,
    color: '#334562 !important',
    opacity: 0.5,

    '&.is-active': {
        opacity: 1,
        borderBottom: '3px solid #654bfa !important'
    }
});

const OrganizationData = Glamorous.div({
    position: 'absolute',
    bottom: 16,
    left: 40
});

const Avatar = Glamorous(XAvatar)({
    width: 136,
    height: 136,
    borderRadius: 10,
    border: 'solid 1px rgba(0, 0, 0, 0.07)',
    boxShadow: 'none'
});

const OrganizationName = Glamorous.div({
    fontSize: 22,
    fontWeight: 500,
    color: '#fff',
    position: 'absolute',
    bottom: 90,
    left: 157,
    whiteSpace: 'nowrap'
});

const OrganizationPlace = Glamorous.div({
    opacity: 0.7,
    fontSize: 15,
    fontWeight: 500,
    color: '#fff',
    position: 'absolute',
    bottom: 66,
    left: 157,
    whiteSpace: 'nowrap'
});

const Title = Glamorous.div<{ small?: boolean, marginBottom?: number }>((props) => ({
    fontSize: props.small ? 15 : 18,
    fontWeight: 500,
    lineHeight: props.small ? 1.33 : 1.11,
    color: '#334562',
    marginBottom: props.marginBottom
}));

const XCardStyled = Glamorous(XCard)<{ padding?: number }>((props) => ({
    borderRadius: 5,
    padding: props.padding !== undefined ? props.padding : 24
}));

const ContactWrapper = Glamorous(XHorizontal)({
    paddingTop: 12,
    paddingBottom: 12
});

const Text = Glamorous.div<{ opacity?: number, bold?: boolean }>((props) => ({
    fontSize: 15,
    lineHeight: 1.33,
    color: '#334562',
    opacity: props.opacity,
    fontWeight: props.bold ? 500 : undefined
}));

class ContactPersonComponent extends React.Component<{ contact: ContactPerson, index: number }> {
    render() {
        return (
            <ContactWrapper>
                <XAvatar src={this.props.contact.avatar || undefined} />
                <div>
                    <Text bold={true}>{this.props.contact.name}</Text>
                    <Text opacity={0.8}>{this.props.contact.role}</Text>
                    <Text opacity={0.5}>{this.props.contact.phone}</Text>
                    <Text>{this.props.contact.email}</Text>
                    <Text>{this.props.contact.link}</Text>
                </div>
            </ContactWrapper>
        );
    }
}

class ContactPersons extends React.Component<{ contacts: ContactPerson[] }> {
    render() {
        return (
            <>
                {!this.props.contacts && 'No contacts'}
                {this.props.contacts && this.props.contacts.map((person, index) => <ContactPersonComponent key={index + '_' + person.name} contact={person} index={index} />)}
            </>
        );
    }
}

const TagItem = Glamorous.div({
    display: 'flex',
    alignItems: 'center'
});

const TagImg = Glamorous.div({
    width: 42,
    height: 42,
    backgroundColor: '#f3f3f5',
    borderRadius: 50,
    marginRight: 18
});

const XVerticalStyled = Glamorous(XVertical)<{ borderRight?: boolean, borderBottom?: boolean, padding?: number }>((props) => ({
    borderRight: props.borderRight ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    borderBottom: props.borderBottom ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    padding: props.padding
}));

const OpportunitiesWrapper = Glamorous.div({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:first-child': {
        '& > div': {
            height: 50,
            paddingTop: 18,
            paddingBottom: 5
        }
    },
    '&:last-child': {
        '& > div': {
            height: 50,
            paddingBottom: 18,
            paddingTop: 5
        }
    }
});

const OpportunitiesTextWrapper = Glamorous.div({
    width: 220,
    height: 42,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid rgba(220, 222, 228, 0.45)',
    paddingLeft: 24
});

const OpportunitiesValueWrapper = Glamorous.div({
    height: 42,
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    padding: '0 24px'
});

const OpportunitiesValue = Glamorous.div({
    height: 32,
    borderRadius: 4,
    backgroundColor: '#eeecfa',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.14,
    color: '#5640d6',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 9px'
});

const Profile = withOrganizationProfile(withRouter((props) => {
    console.warn(props);
    return (
        <Root>
            {props.data.alphaOrganizationProfile && (
                <>
                    <Header>
                        <HeaderPicture />

                        <HeaderContent>
                            <OrganizationData>
                                <Avatar cloudImageUuid={props.data.alphaOrganizationProfile.photo!!} size="x-large" style="square" />
                                <OrganizationName>Port of San Francisco</OrganizationName>
                                <OrganizationPlace>San Francisco, CA</OrganizationPlace>
                            </OrganizationData>
                            <SwitcherWrapper flatStyle={true}>
                                <Switcher path="/marketplace/organization/MXxhY2NvdW50">Development opportunities</Switcher>
                                <Switcher>Docs</Switcher>
                                <Switcher>News</Switcher>
                                <Switcher>Contacts</Switcher>
                            </SwitcherWrapper>
                            <XHorizontal>
                                <XButton style="primary" size="medium" text="Follow" />
                                <XButton style="primary" size="medium" text="Apply to connect" />
                            </XHorizontal>
                        </HeaderContent>
                    </Header>

                    <MainContent>
                        <XHorizontal>
                            <XVertical flexGrow={1}>
                                <XInput value={props.data.alphaOrganizationProfile.name} disabled={true} />
                                <XInput value={props.data.alphaOrganizationProfile.website || ''} disabled={true} />
                                <XCardStyled padding={0}>
                                    <XHorizontal>
                                        <XVerticalStyled flexGrow={1} borderRight={true} padding={24}>
                                            <Title>Development models</Title>
                                            {props.data.alphaOrganizationProfile.developmentModels && (
                                                props.data.alphaOrganizationProfile.developmentModels!!.map((s, k) => (
                                                    <TagItem>
                                                        <TagImg />
                                                        <Text bold={true} key={k + '_' + s}>{s}</Text>
                                                    </TagItem>
                                                )))
                                            }
                                        </XVerticalStyled>
                                        <XVerticalStyled flexGrow={1} padding={24}>
                                            <Title>Availability</Title>
                                            {props.data.alphaOrganizationProfile.availability && (
                                                props.data.alphaOrganizationProfile.availability!!.map((s, k) => (
                                                    <TagItem>
                                                        <TagImg />
                                                        <Text bold={true} key={k + '_' + s}>{s}</Text>
                                                    </TagItem>
                                                )))
                                            }
                                        </XVerticalStyled>
                                    </XHorizontal>
                                </XCardStyled>
                                <XCardStyled padding={0}>
                                    <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                        <Title marginBottom={24}>Tags</Title>
                                    </XVerticalStyled>

                                    <div>
                                        {props.data.alphaOrganizationProfile.landUse && (
                                            <OpportunitiesWrapper>
                                                <OpportunitiesTextWrapper>
                                                    <Text bold={true}>Land use</Text>
                                                </OpportunitiesTextWrapper>
                                                {props.data.alphaOrganizationProfile.landUse!!.map((s, k) => (
                                                    <OpportunitiesValueWrapper>
                                                        <XHorizontal>
                                                            <OpportunitiesValue key={k + '_' + s}>{s}</OpportunitiesValue>
                                                        </XHorizontal>
                                                    </OpportunitiesValueWrapper>
                                                ))}
                                            </OpportunitiesWrapper>
                                        )}

                                        {props.data.alphaOrganizationProfile.goodFor && (
                                            <OpportunitiesWrapper>
                                                <OpportunitiesTextWrapper>
                                                    <Text bold={true}>Good fit for</Text>
                                                </OpportunitiesTextWrapper>
                                                {props.data.alphaOrganizationProfile.goodFor!!.map((s, k) => (
                                                    <OpportunitiesValueWrapper>
                                                        <XHorizontal>
                                                            <OpportunitiesValue key={k + '_' + s}>{s}</OpportunitiesValue>
                                                        </XHorizontal>
                                                    </OpportunitiesValueWrapper>
                                                ))}
                                            </OpportunitiesWrapper>
                                        )}

                                        {props.data.alphaOrganizationProfile.specialAttributes && (
                                            <OpportunitiesWrapper>
                                                <OpportunitiesTextWrapper>
                                                    <Text bold={true}>Special attributes </Text>
                                                </OpportunitiesTextWrapper>
                                                {props.data.alphaOrganizationProfile!!.specialAttributes!!.map((s, k) => (
                                                    <OpportunitiesValueWrapper>
                                                        <XHorizontal>
                                                            <OpportunitiesValue key={k + '_' + s}>{s}</OpportunitiesValue>
                                                        </XHorizontal>
                                                    </OpportunitiesValueWrapper>
                                                ))}
                                            </OpportunitiesWrapper>
                                        )}
                                    </div>

                                </XCardStyled>
                            </XVertical>
                            <XVertical width={270}>
                                {/*-About block example-*/}
                                <XCardStyled padding={18}>
                                    <Title small={true} marginBottom={10}>
                                        About
                                    </Title>
                                    <Text>
                                        San Francisco Port Authority is continuously looking for qualified real estate developers to apply for its upcoming requests for proposals. Several piers are expected to become available for development in the next 5-10 years.
                                    </Text>
                                </XCardStyled>
                                {/*-About block example-*/}
                                <XCardStyled padding={18}>
                                    <Title small={true} marginBottom={10}>Contacts</Title>
                                    <ContactPersons contacts={props.data.alphaOrganizationProfile.contacts!!.filter(c => c !== null) as any} />
                                </XCardStyled>
                            </XVertical>
                        </XHorizontal>
                    </MainContent>
                </>
            )}
        </Root>
    );
}));

export default withApp('Organization profile edit', 'viewer', withRouter((props) => {
    return (
        <>
            <XDocumentHead title="Organization profile" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false} >
                    <Profile variables={{ id: props.router.routeQuery.organizationId }} />
                    {props.children}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));
