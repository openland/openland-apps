import * as React from 'react';
import { View, TextInput, Image, SectionList, FlatList, Text, Platform, Keyboard } from 'react-native';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { countriesMeta } from 'openland-y-utils/auth/countriesMeta';
import { filterCountries } from 'openland-y-utils/auth/filterCountries';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { CountryItem } from 'openland-y-utils/auth/constants';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

type GroupItem = {
    title: string;
    index: number;
    data: (CountryItem & { isLast: boolean })[];
};

export const CountryPickerComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const safeArea = React.useContext(ASSafeAreaContext);
    const [query, setQuery] = React.useState('');
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const [countriesData, setCountriesData] = React.useState<GroupItem[] | null>(null);
    let action = props.router.params.action as (country: CountryItem) => void;

    React.useEffect(() => {
        let index = 0;
        if (!countriesData) {
            const countriesObject: { [label: string]: GroupItem } = {};

            countriesMeta.forEach((item, i, arr) => {
                let nextItem = arr[i + 1];
                let c = item.label[0];
                if (!countriesObject[c]) {
                    countriesObject[c] = {
                        title: c,
                        index: index,
                        data: [{ ...item, isLast: false }],
                    };
                    index++;
                } else {
                    countriesObject[c].data.push({ ...item, isLast: nextItem ? nextItem.label[0] !== c : true });
                }
            });

            setCountriesData(Object.values(countriesObject));
        }
    }, [countriesData]);

    React.useEffect(() => {
        const handleShow = (e: any) => {
            setKeyboardHeight(e?.endCoordinates?.height);
        };
        const handleHide = (e: any) => {
            setKeyboardHeight(0);
        };
        Keyboard.addListener('keyboardWillShow', handleShow);
        Keyboard.addListener('keyboardWillHide', handleHide);
        return () => {
            Keyboard.removeListener('keyboardWillShow', handleShow);
            Keyboard.removeListener('keyboardWillHide', handleHide);
        };
    }, []);

    let sortCountries;

    if (query) {
        sortCountries = filterCountries(query, countriesMeta);
    }

    if (!countriesData) {
        return <ZLoader />;
    }

    return (
        <>
            <SHeader title="Country" />
            <ASSafeAreaView style={{ marginBottom: sortCountries && sortCountries.length === 0 ? 0 : 20, flexGrow: 1, flexDirection: 'column' }}>
                <View style={{ alignItems: 'center', marginHorizontal: 16, marginTop: 8, marginBottom: 16 }}>
                    <View
                        style={{
                            position: 'relative',
                            flexDirection: 'row',
                            maxWidth: 600,
                            backgroundColor: theme.backgroundTertiaryTrans,
                            borderRadius: 100,
                            height: 36
                        }}
                    >
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search"
                            allowFontScaling={false}
                            autoFocus={true}
                            keyboardAppearance={theme.keyboardAppearance}
                            placeholderTextColor={theme.foregroundTertiary}
                            style={{
                                height: 36,
                                borderRadius: 100,
                                paddingLeft: 36,
                                paddingRight: 12,
                                paddingBottom: Platform.OS === 'ios' ? undefined : 0,
                                paddingTop: Platform.OS === 'ios' ? undefined : 0,
                                fontSize: 17,
                                flexGrow: 1
                            }}
                        />
                        <Image
                            source={require('assets/ic-search-16.png')}
                            style={{
                                position: 'absolute',
                                top: 10,
                                left: 12,
                                tintColor: theme.foregroundTertiary,
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexGrow: 1, flexShrink: 1, alignItems: 'center' }}>
                    <View style={{ maxWidth: 600, width: '100%', justifyContent: 'center', flexGrow: 1 }}>
                        {!sortCountries && (
                            <SectionList
                                keyboardDismissMode="on-drag"
                                keyboardShouldPersistTaps="always"
                                sections={countriesData!}
                                keyExtractor={(item, index) => item.label + index}
                                renderItem={({ item }) => (
                                    item.isLast ? (
                                        <>
                                            <ZListItem
                                                text={item.label}
                                                description={item.value}
                                                onPress={() => action(item)}
                                                small={true}
                                            />
                                            <View style={{ height: 16 }} />
                                        </>
                                    ) : (
                                            <ZListItem
                                                text={item.label}
                                                description={item.value}
                                                onPress={() => action(item)}
                                                small={true}
                                            />
                                        )
                                )}
                                renderSectionHeader={({ section: { title } }) => (
                                    <View
                                        style={{
                                            height: 48,
                                            paddingHorizontal: 16,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            backgroundColor: theme.backgroundPrimary
                                        }}
                                    >
                                        <Text
                                            style={[
                                                {
                                                    color: theme.foregroundPrimary,
                                                },
                                                TextStyles.Title2,
                                            ]}
                                            allowFontScaling={false}
                                        >
                                            {title}
                                        </Text>
                                    </View>
                                )}
                            />
                        )}
                        {sortCountries && sortCountries.length > 0 && (
                            <FlatList
                                style={{
                                    flexGrow: 1,
                                }}
                                keyboardDismissMode="on-drag"
                                keyboardShouldPersistTaps="always"
                                data={sortCountries}
                                keyExtractor={(item, index) => item.label + index}
                                renderItem={({ item }) => (
                                    <ZListItem
                                        text={item.label}
                                        description={item.value}
                                        onPress={() => action(item)}
                                        small={true}
                                    />
                                )}
                            />
                        )}
                        {sortCountries && sortCountries.length === 0 && (
                            <View
                                style={{
                                    flexGrow: 1,
                                    marginTop: 1,
                                    position: 'relative',
                                    marginBottom: keyboardHeight - (Platform.OS === 'ios' ? safeArea.bottom : 0)
                                }}
                            >
                                <View
                                    style={{
                                        flexGrow: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...TextStyles.Body,
                                            paddingVertical: 16,
                                            paddingHorizontal: 32,
                                            textAlign: 'center',
                                            color: theme.foregroundTertiary,
                                        }}
                                    >
                                        Nothing found
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ASSafeAreaView>
        </>
    );
});

export const CountryPicker = withApp(CountryPickerComponent, { navigationAppearance: 'small' });
