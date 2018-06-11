import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withOrganizationProfile } from '../../../api';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import { XAvatar } from 'openland-x/XAvatar';
import { XInput } from 'openland-x/XInput';
import { ContactPerson } from '../../../utils/OrganizationProfileFields';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withRouter } from 'openland-x-routing/withRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';

class ContactPersonComponent extends React.Component<{ contact: ContactPerson, index: number }> {
    render() {
        return (
            <XVertical>
                <XHorizontal>
                    <XAvatar src={this.props.contact.avatar || undefined} />
                    {this.props.contact.name}

                </XHorizontal>
                {this.props.contact.role}
                {this.props.contact.phone}
                {this.props.contact.email}
                {this.props.contact.link}
            </XVertical>

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

const Profile = withOrganizationProfile(withRouter((props) => {
    console.warn(props);
    return (
        <XVertical >
            {props.data.alphaOrganizationProfile && (
                <>
                    <XAvatar cloudImageUuid={props.data.alphaOrganizationProfile.photo!!} size="x-large" style="square" />
                    <XInput value={props.data.alphaOrganizationProfile.name} disabled={true} />
                    <XInput value={props.data.alphaOrganizationProfile.website || ''} disabled={true} />
                    <XTitle>Contacts</XTitle>
                    <ContactPersons contacts={props.data.alphaOrganizationProfile.contacts!!.filter(c => c !== null) as any} />
                    <XTitle>Tags</XTitle>
                    <XVertical>
                        {props.data.alphaOrganizationProfile.developmentModels && props.data.alphaOrganizationProfile.developmentModels!!.map((s, k) => <XTitle key={k + '_' + s}>{s}</XTitle>)}
                        {props.data.alphaOrganizationProfile.availability && props.data.alphaOrganizationProfile.availability!!.map((s, k) => <XTitle key={k + '_' + s}>{s}</XTitle>)}
                        {props.data.alphaOrganizationProfile.landUse && props.data.alphaOrganizationProfile.landUse!!.map((s, k) => <XTitle key={k + '_' + s}>{s}</XTitle>)}
                        {props.data.alphaOrganizationProfile.goodFor && props.data.alphaOrganizationProfile.goodFor!!.map((s, k) => <XTitle key={k + '_' + s}>{s}</XTitle>)}
                        {props.data.alphaOrganizationProfile.specialAttributes && props.data.alphaOrganizationProfile!!.specialAttributes!!.map((s, k) => <XTitle key={k + '_' + s}>{s}</XTitle>)}
                    </XVertical>
                </>
            )}

        </XVertical>
    );
}));

export default withApp('Organization profile edit', 'viewer', withRouter((props) => {
    return (
        <>
            <XDocumentHead title="Organization profile" />
            <Scaffold>
                <Scaffold.Content padding={false} >
                    <Profile variables={{ id: props.router.routeQuery.organizationId }} />
                    {props.children}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));
