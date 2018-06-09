import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { XForm } from 'openland-x-forms/XForm';
import { withEditCurrentOrganizationProfile, withCurrentOrganizationProfile } from '../../../api';
import { XVertical } from 'openland-x-layout/XVertical';
import glamorous from 'glamorous';
import { XTitle } from 'openland-x/XTitle';
import { XAvatar } from 'openland-x/XAvatar';
import {
    DevelopmentModelsMap,
    AvailabilityMap,
    LandUseMap,
    GoodForMap,
    SpecialAttributesMap,
    ContactPerson
} from '../../../utils/OrganizationProfileFields';
import { XSelect } from 'openland-x/XSelect';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { withRouter } from 'openland-x-routing/withRouter';

const Root = glamorous(XVertical)({
    alignItems: 'center',
    marginTop: 20
});

const MiddleContainer = glamorous(XVertical)({
    width: '70%'
});

const Title = glamorous(XTitle)({
    flex: '0 0 50%'
});

const Dumb = glamorous.div({
    flex: '30% 0 0'
});

const CenteredTitle = (props: { title: string }) => {
    return (<XHorizontal><Dumb /><Title>{props.title}</Title></XHorizontal>);
};

class ContactPersonComponent extends React.Component<{ contact: ContactPerson, index: number }> {
    render() {
        return (
            <XVertical>
                <XHorizontal>
                    <XAvatar src={this.props.contact.avatar} />
                    {this.props.contact.name}
                    <XButton text="edit" query={{ field: 'editContact', value: String(this.props.index) }} />
                    <XButton text="delete" query={{ field: 'deleteContact', value: String(this.props.index) }} />

                </XHorizontal>
                {this.props.contact.role}
                {this.props.contact.phone}
                {this.props.contact.email}
                {this.props.contact.link}
            </XVertical>

        );
    }
}

class ContactPersons extends React.Component<{ contacts: ContactPerson[] | null }> {
    render() {
        return (
            <>
                {!this.props.contacts && 'No contacts'}
                {this.props.contacts && this.props.contacts.map((person, index) => <ContactPersonComponent key={index + '_' + person.name} contact={person} index={index} />)}
            </>
        );
    }
}

function parseAvatar(avatar: any) {
    if (typeof avatar === 'string') {
        let parts = avatar.split('/');
        let wh = parts[parts.length - 1 - 2].split('x');
        let xy = parts[parts.length - 1 - 1].split(',');
        let uuid = parts[parts.length - 1 - 5];
        avatar = { uuid: uuid, crop: { x: xy[0], y: xy[1], w: wh[0], h: wh[1] } };
    }
    return avatar;
}

function prepareContacts(res: any) {
    return [...(res.contacts || []).map((c: any) => {
        let { __typename, avatar, ...clean } = c;
        clean.avatar = parseAvatar(avatar);
        return clean;
    })];
}

const ProfileForm = withEditCurrentOrganizationProfile(withRouter((props) => {
    console.warn(props);
    return (
        <Root>
            <MiddleContainer separator="none">
                <CenteredTitle title="Main Info" />
                <XForm defaultValues={(props as any).mainVals} mutationDirect={true} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                    <XForm.Field title="title">
                        <XForm.Text field="title" />
                    </XForm.Field>
                    <XForm.Field title="website">
                        <XForm.Text field="website" />
                    </XForm.Field>
                    <XForm.Field title="logo">
                        <XForm.Avatar field="logo" placeholder={{ add: (<><p>Add</p> <p>organization logo</p></>), change: <><p>Change</p> <p>organization logo</p></> }} />
                    </XForm.Field>
                    <XForm.Footer>
                        <XForm.Submit text="Save" />
                    </XForm.Footer>
                </XForm>

                <CenteredTitle title="String extras" />
                <XForm defaultValues={(props as any).simpleExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                    <XForm.Field title="description">
                        <XForm.Text field="description" />
                    </XForm.Field>
                    <XForm.Field title="twitter">
                        <XForm.Text field="twitter" />
                    </XForm.Field>
                    <XForm.Field title="facebook">
                        <XForm.Text field="facebook" />
                    </XForm.Field>
                    <XForm.Footer>
                        <XForm.Submit text="Save" />
                    </XForm.Footer>
                </XForm>
                <CenteredTitle title="Tags" />
                <XForm defaultValues={(props as any).developmentModelsExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                    <XForm.Field title="Development Models">
                        <XForm.Select
                            field="developmentModels"
                            options={DevelopmentModelsMap.map(o => {
                                return { ...o, title: o.label };
                            })}
                            component={XSelect}
                            multi={true}
                        />
                    </XForm.Field>
                    <XForm.Footer>
                        <XForm.Submit text="Save" />
                    </XForm.Footer>
                </XForm>

                <XForm defaultValues={(props as any).availabilityExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                    <XForm.Field title="availability">
                        <XForm.Select
                            field="availability"
                            options={AvailabilityMap.map(o => {
                                return { ...o, title: o.label };
                            })}
                            component={XSelect}
                            multi={true}
                        />
                    </XForm.Field>
                    <XForm.Footer>
                        <XForm.Submit text="Save" />
                    </XForm.Footer>
                </XForm>

                <XForm defaultValues={(props as any).landUseExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                    <XForm.Field title="LandUse">
                        <XForm.Select
                            field="landUse"
                            options={LandUseMap.map(o => {
                                return { ...o, title: o.label };
                            })}
                            component={XSelect}
                            multi={true}
                        />
                    </XForm.Field>
                    <XForm.Footer>
                        <XForm.Submit text="Save" />
                    </XForm.Footer>
                </XForm>

                <XForm defaultValues={(props as any).goodForExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                    <XForm.Field title="Good For">
                        <XForm.Select
                            field="goodFor"
                            options={GoodForMap.map(o => {
                                return { ...o, title: o.label };
                            })}
                            component={XSelect}
                            multi={true}
                        />
                    </XForm.Field>
                    <XForm.Footer>
                        <XForm.Submit text="Save" />
                    </XForm.Footer>
                </XForm>

                <XForm defaultValues={(props as any).specialAttributesExtras} submitMutation={props.editOrganizationProfile} keepLoading={false}>
                    <XForm.Field title="Special Attributes">
                        <XForm.Select
                            field="specialAttributes"
                            options={SpecialAttributesMap.map(o => {
                                return { ...o, title: o.label };
                            })}
                            component={XSelect}
                            multi={true}
                        />
                    </XForm.Field>
                    <XForm.Footer>
                        <XForm.Submit text="Save" />
                    </XForm.Footer>
                </XForm>

                <CenteredTitle title="Contacts" />
                <ContactPersons contacts={(props as any).contactsExtras.contacts} />
                <XButton text="Add contact" query={{ field: 'addContact', value: 'true' }} />

                <XModalForm
                    submitMutation={props.editOrganizationProfile}
                    defaultValues={(props as any).contactsExtras}
                    fillValues={(props as any).contactsExtras.contacts[Number(props.router.query.editContact)]}
                    targetQuery="addContact"
                    prepare={(vars, prepareValues) => {
                        let res = { ...vars };
                        let contacts = [...(res.contacts || []).map((c: any) => {
                            let { __typename, avatar, ...clean } = c;
                            clean.avatar = avatar = parseAvatar(avatar);
                            return clean;
                        })];
                        contacts.push({
                            name: prepareValues.name,
                            phone: prepareValues.phone,
                            avatar: parseAvatar(prepareValues.avatar),
                        });

                        res.contacts = contacts;
                        return res;
                    }}
                >
                    <XForm.Text field="name" required={true} />
                    <XForm.Text field="phone" />
                    <XForm.Avatar field="avatar" />
                </XModalForm>

                <XModalForm
                    submitMutation={props.editOrganizationProfile}
                    defaultValues={(props as any).contactsExtras}
                    fillValues={(props as any).contactsExtras.contacts[Number(props.router.query.editContact)]}
                    targetQuery="editContact"
                    prepare={(vars, prepareValues) => {
                        let res = { ...vars };
                        let contacts = prepareContacts(res);

                        contacts[Number(props.router.query.editContact)] = {
                            name: prepareValues.name,
                            phone: prepareValues.phone,
                            avatar: parseAvatar(prepareValues.avatar),
                        };
                        res.contacts = contacts;
                        return res;
                    }}
                >
                    <XForm.Text field="name" required={true} />
                    <XForm.Text field="phone" />
                    <XForm.Avatar field="avatar" />
                </XModalForm>

                <XModalForm
                    submitMutation={props.editOrganizationProfile}
                    defaultValues={(props as any).contactsExtras}
                    targetQuery="deleteContact"
                    actionName="Delete!"
                    prepare={(vars, prepareValues) => {
                        let res = { ...vars };
                        let contacts = prepareContacts(res);

                        contacts.splice(Number(props.router.query.deleteContact), 1);
                        res.contacts = contacts;
                        return res;
                    }}
                >
                    Delete?
                </XModalForm>
                <CenteredTitle title="Ranges" />
            </MiddleContainer>

        </Root>

    );
})) as React.ComponentClass<{
    mainVals: any,
    extrasVals: any,
    simpleExtras: any,
    developmentModelsExtras: any
    availabilityExtras: any
    landUseExtras: any
    goodForExtras: any
    specialAttributesExtras: any,
    contactsExtras: any
}>;

export default withApp('Organization profile edit', 'viewer', withCurrentOrganizationProfile((props) => {
    return (
        <>
            <XDocumentHead title={'Edit Organization Profile'} />
            <Scaffold>
                <Scaffold.Content>
                    <ProfileForm
                        mainVals={{
                            title: props.data.alphaCurrentOrganizationProfile.title,
                            website: props.data.alphaCurrentOrganizationProfile.website,
                            logo: props.data.alphaCurrentOrganizationProfile.logo,

                        }}

                        simpleExtras={{
                            description: props.data.alphaCurrentOrganizationProfile.description,
                            twitter: props.data.alphaCurrentOrganizationProfile.twitter,
                            facebook: props.data.alphaCurrentOrganizationProfile.facebook,
                        }}

                        developmentModelsExtras={{
                            developmentModels: props.data.alphaCurrentOrganizationProfile.developmentModels,
                        }}

                        availabilityExtras={{
                            availability: props.data.alphaCurrentOrganizationProfile.availability,
                        }}

                        landUseExtras={{
                            landUse: props.data.alphaCurrentOrganizationProfile.landUse,
                        }}

                        goodForExtras={{
                            goodFor: props.data.alphaCurrentOrganizationProfile.goodFor,
                        }}

                        specialAttributesExtras={{
                            specialAttributes: props.data.alphaCurrentOrganizationProfile.specialAttributes,
                        }}

                        extrasVals={{
                            siteSizes: props.data.alphaCurrentOrganizationProfile.siteSizes,
                            potentialSites: props.data.alphaCurrentOrganizationProfile.potentialSites,
                        }}

                        contactsExtras={{
                            contacts: props.data.alphaCurrentOrganizationProfile.contacts,
                        }}
                    />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));
