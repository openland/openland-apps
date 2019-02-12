import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, Text } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZForm } from '../../components/ZForm';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZListItemBase } from '../../components/ZListItemBase';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';

export class ListItemEdit extends React.PureComponent<{
    autoFocus?: boolean;
    title: string;
    value?: string;
    valueStoreKey?: string;
    field?: string;
    onChange?: (val: string) => void;
    placehodler?: string;
}> {
    render() {
        return (
            <ZListItemBase separator={false}>
                <View flexDirection="row" alignItems="stretch" flexGrow={1}>
                    <Text
                        style={{
                            width: 104,
                            color: '#8a8a8f',
                            fontSize: 13,
                            lineHeight: 22,
                            marginLeft: 16,
                            alignSelf: 'center',
                        }}
                    >
                        {this.props.title}
                    </Text>
                    <ZTextInput
                        placeholder={this.props.placehodler}
                        flexGrow={1}
                        value={this.props.value}
                        onChangeText={this.props.onChange}
                        style={{ paddingRight: 15 }}
                        field={this.props.field}
                        valueStoreKey={this.props.valueStoreKey}
                        autoFocus={this.props.autoFocus}
                    />
                </View>
            </ZListItemBase>
        );
    }
}

const SettingsProfileContent = React.memo<PageProps>((props) => {
    let profile = getClient().useProfile().profile;
    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            ref.current.submitForm();
        }
    }, []);

    console.log(profile);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async args => {
                    let res = await getClient().mutateProfileUpdate(args);
                    console.log(res);
                    await getClient().refetchAccount();
                }}
                onSuccess={() => props.router.back()}
                ref={ref}
                defaultData={{
                    input: {
                        firstName: profile!.firstName,
                        lastName: profile!.lastName,
                        photoRef: sanitizeImageRef(
                            profile!.photoRef,
                        ),
                        phone: profile!.phone,
                        email: profile!.email,
                        website: profile!.website,
                        alphaLinkedin: profile!.linkedin,
                    },
                }}
            >
                <ZListItemBase height={96} separator={false}>
                    <View paddingHorizontal={16} marginTop={15}>
                        <ZAvatarPicker field="input.photoRef" />
                    </View>
                    <View
                        flexDirection="column"
                        flexGrow={1}
                        flexBasis={0}
                        marginTop={15}
                    >
                        <ZTextInput
                            placeholder="First name"
                            field="input.firstName"
                            height={44}
                            style={{ fontSize: 16 }}
                        />
                        <View
                            height={1}
                            alignSelf="stretch"
                            backgroundColor={AppStyles.separatorColor}
                        />
                        <ZTextInput
                            placeholder="Last name"
                            field="input.lastName"
                            height={44}
                            style={{ fontSize: 16 }}
                        />
                        <View
                            height={1}
                            alignSelf="stretch"
                            backgroundColor={AppStyles.separatorColor}
                        />
                    </View>
                </ZListItemBase>
                <View marginTop={31} />
                <ZListItemGroup>
                    <ListItemEdit
                        title="Phone"
                        field="input.phone"
                        placehodler="123-456-7890"
                    />
                    <ListItemEdit
                        title="Email"
                        field="input.email"
                        placehodler="your@email.com"
                    />
                    <ListItemEdit
                        title="Website"
                        field="input.website"
                        placehodler="yoursite.com"
                    />
                    <ListItemEdit
                        title="Linkedin"
                        field="input.alphaLinkedin"
                        placehodler="linkedin.com/in/you"
                    />
                </ZListItemGroup>
            </ZForm>
        </>
    )
});

class SettingsProfileComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Edit profile" />
                <SettingsProfileContent {...this.props} />
            </>
        );
    }
}

export const SettingsProfile = withApp(SettingsProfileComponent);
