import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withOrganizationProfile } from '../../../api';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCard } from 'openland-x/XCard';
import { XAvatar } from 'openland-x/XAvatar';
// import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XLink } from 'openland-x/XLink';
import { withRouter } from 'openland-x-routing/withRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import {
    DevelopmentModelsMap,
    AvailabilityMap,
    LandUseMap,
    GoodForMap,
    SpecialAttributesMap,
    ContactPerson
} from '../../../utils/OrganizationProfileFields';

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
    // bottom: 90,
    bottom: 80,
    left: 157,
    whiteSpace: 'nowrap'
});

// const OrganizationPlace = Glamorous.div({
//     opacity: 0.7,
//     fontSize: 15,
//     fontWeight: 500,
//     color: '#fff',
//     position: 'absolute',
//     bottom: 66,
//     left: 157,
//     whiteSpace: 'nowrap'
// });

const Title = Glamorous.div<{ small?: boolean, marginBottom?: number, marginLeft?: number }>((props) => ({
    fontSize: props.small ? 15 : 18,
    fontWeight: 500,
    lineHeight: props.small ? 1.33 : 1.11,
    color: '#334562',
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
}));

const XCardStyled = Glamorous(XCard)<{ padding?: number, paddingTop?: number, paddingBottom?: number }>((props) => ({
    borderRadius: 5,
    padding: props.padding !== undefined ? props.padding : 24,
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom
}));

const ContactWrapper = Glamorous(XHorizontal)({
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18
});

const Text = Glamorous.div<{ opacity?: number, bold?: boolean, upperCase?: boolean }>((props) => ({
    fontSize: 15,
    lineHeight: 1.33,
    color: '#334562',
    opacity: props.opacity,
    fontWeight: props.bold ? 500 : undefined,
    textTransform: props.upperCase ? 'capitalize' : undefined
}));

const SocialLinksWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    borderTop: '1px solid rgba(220, 222, 228, 0.45)',
    paddingLeft: 18,
    paddingRight: 18
});

const SocialLink = Glamorous(XLink)({
    fontSize: 15,
    lineHeight: 1.33,
    color: '#334562',
    fontWeight: 500,
    marginRight: 22,
    '&:hover': {
        color: '#5640d6'
    }
});

const SocialLinkImg = Glamorous(XLink)({
    display: 'block',
    width: 24,
    height: 24,
    backgroundColor: '#d6dadf',
    borderRadius: 50,
    marginRight: 10,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 10,
    backgroundPosition: 'center',
    '&.fb': {
        backgroundSize: 7,
        backgroundImage: 'url(\'/static/img/icons/organization/ic-fb.svg\')',
    },
    '&.tw': {
        backgroundImage: 'url(\'/static/img/icons/organization/ic-twitter.svg\')',
    },
    '&:hover': {
        backgroundColor: '#5640d6'
    }
});

const ContactPersonComponent = (props: { contact: ContactPerson, index: number }) => (
    <ContactWrapper>
        <XAvatar src={props.contact.avatar || undefined} />
        <div>
            <Text bold={true}>{props.contact.name}</Text>
            <Text opacity={0.8}>{props.contact.role}</Text>
            <Text opacity={0.5}>{props.contact.phone}</Text>
            <Text opacity={0.5}>{props.contact.email}</Text>
            <Text opacity={0.5}>{props.contact.link}</Text>
        </div>
    </ContactWrapper>
);

const ContactPersons = (props: { contacts: ContactPerson[] }) => (
    <>
        {!props.contacts && 'No contacts'}
        {props.contacts && props.contacts.map((person, index) => <ContactPersonComponent key={index + '_' + person.name} contact={person} index={index} />)}
    </>
);

const TagItem = Glamorous.div({
    display: 'flex',
    alignItems: 'center'
});

const TagImg = Glamorous.div<{ img?: string }>((props) => ({
    width: 42,
    height: 42,
    backgroundColor: '#f3f3f5',
    borderRadius: 50,
    marginRight: 18,
    backgroundImage: props.img ? `url(\'/static/img/icons/organization/${props.img}.svg\')` : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 20,
    backgroundPosition: 'center',
    '&.request_for_proposals': {
        backgroundSize: 20,
    },
    '&.joint_venture': {
        backgroundSize: 19,
    },
    '&.ground_lease': {
        backgroundSize: 20,
    },
    '&.sale': {
        backgroundSize: 10,
    },
    '&.option_to_buy': {
        backgroundSize: 20,
    },
    '&.immediate': {
        backgroundSize: 20,
    },
    '&.long_term': {
        backgroundSize: 17,
    },
    '&.near_future': {
        backgroundSize: 20,
    },
}));

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
                                <OrganizationName>{props.data.alphaOrganizationProfile.name}</OrganizationName>
                                {/* <OrganizationPlace>San Francisco, CA</OrganizationPlace> */}
                            </OrganizationData>
                            <SwitcherWrapper flatStyle={true}>
                                <Switcher path="/marketplace/organization/MXxhY2NvdW50">Development opportunities</Switcher>
                                {/* <Switcher>Docs</Switcher>
                                <Switcher>News</Switcher>
                                <Switcher>Contacts</Switcher> */}
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
                                {/* <XInput value={props.data.alphaOrganizationProfile.name} disabled={true} />
                                <XInput value={props.data.alphaOrganizationProfile.website || ''} disabled={true} /> */}
                                <XCardStyled padding={0}>
                                    <XHorizontal>
                                        <XVerticalStyled flexGrow={1} borderRight={true} padding={24}>
                                            <Title>Development models</Title>
                                            {props.data.alphaOrganizationProfile.developmentModels && (
                                                props.data.alphaOrganizationProfile.developmentModels!!.map((s, k) => (
                                                    <TagItem key={k + '_' + s}>
                                                        <TagImg img={s!} className={s!!} />
                                                        <Text bold={true} upperCase={true}>
                                                            {DevelopmentModelsMap.map(i => (
                                                                i.value === s ? i.label : undefined
                                                            ))}
                                                        </Text>
                                                    </TagItem>
                                                )))
                                            }
                                        </XVerticalStyled>
                                        <XVerticalStyled flexGrow={1} padding={24}>
                                            <Title>Availability</Title>
                                            {props.data.alphaOrganizationProfile.availability && (
                                                props.data.alphaOrganizationProfile.availability!!.map((s, k) => (
                                                    <TagItem key={k + '_' + s}>
                                                        <TagImg img={s!} className={s!!} />
                                                        <Text bold={true} upperCase={true}>
                                                            {AvailabilityMap.map(i => (
                                                                i.value === s ? i.label : undefined
                                                            ))}
                                                        </Text>
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
                                                <OpportunitiesValueWrapper>
                                                    <XHorizontal>
                                                        {props.data.alphaOrganizationProfile.landUse!!.map((s, k) => (
                                                            <OpportunitiesValue key={k + '_' + s}>
                                                                {LandUseMap.map(i => (
                                                                    i.value === s ? i.label : undefined
                                                                ))}
                                                            </OpportunitiesValue>
                                                        ))}
                                                    </XHorizontal>
                                                </OpportunitiesValueWrapper>
                                            </OpportunitiesWrapper>
                                        )}

                                        {props.data.alphaOrganizationProfile.goodFor && (
                                            <OpportunitiesWrapper>
                                                <OpportunitiesTextWrapper>
                                                    <Text bold={true}>Good fit for</Text>
                                                </OpportunitiesTextWrapper>
                                                <OpportunitiesValueWrapper>
                                                    <XHorizontal>
                                                        {props.data.alphaOrganizationProfile.goodFor!!.map((s, k) => (
                                                            <OpportunitiesValue key={k + '_' + s}>
                                                                {GoodForMap.map(i => (
                                                                    i.value === s ? i.label : undefined
                                                                ))}
                                                            </OpportunitiesValue>
                                                        ))}
                                                    </XHorizontal>
                                                </OpportunitiesValueWrapper>
                                            </OpportunitiesWrapper>
                                        )}

                                        {props.data.alphaOrganizationProfile.specialAttributes && (
                                            <OpportunitiesWrapper>
                                                <OpportunitiesTextWrapper>
                                                    <Text bold={true}>Special attributes </Text>
                                                </OpportunitiesTextWrapper>
                                                <OpportunitiesValueWrapper>
                                                    <XHorizontal>
                                                        {props.data.alphaOrganizationProfile!!.specialAttributes!!.map((s, k) => (
                                                            <OpportunitiesValue key={k + '_' + s}>
                                                                {SpecialAttributesMap.map(i => (
                                                                    i.value === s ? i.label : undefined
                                                                ))}
                                                            </OpportunitiesValue>
                                                        ))}
                                                    </XHorizontal>
                                                </OpportunitiesValueWrapper>
                                            </OpportunitiesWrapper>
                                        )}
                                    </div>

                                </XCardStyled>
                            </XVertical>
                            <XVertical width={270}>
                                <XCardStyled padding={18}>
                                    <Title small={true} marginBottom={10}>
                                        About
                                    </Title>
                                    <Text>
                                        {props.data.alphaOrganizationProfile.about}
                                    </Text>
                                </XCardStyled>
                                <XCardStyled padding={0} paddingTop={18} paddingBottom={20}>
                                    <Title small={true} marginBottom={10} marginLeft={18}>Contacts</Title>
                                    <ContactPersons contacts={props.data.alphaOrganizationProfile.contacts!!.filter(c => c !== null) as any} />
                                    <SocialLinksWrapper>
                                        {props.data.alphaOrganizationProfile.website && <SocialLink href={props.data.alphaOrganizationProfile.website}>Website</SocialLink>}
                                        {props.data.alphaOrganizationProfile.facebook && <SocialLinkImg className="fb" href={props.data.alphaOrganizationProfile.facebook} />}
                                        {props.data.alphaOrganizationProfile.twitter && <SocialLinkImg className="tw" href={props.data.alphaOrganizationProfile.twitter} />}
                                    </SocialLinksWrapper>
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
