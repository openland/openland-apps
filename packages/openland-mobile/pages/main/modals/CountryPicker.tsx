import * as React from 'react';
import { View, TextInput, Image, SectionList, FlatList, Text, Platform } from 'react-native';
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

export const CountryPickerComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const [query, setQuery] = React.useState('');
    const [countriesData, setCountriesData] = React.useState<any>(null);
    let action = props.router.params.action as (country: { value: string, label: string, shortname: string }) => void;

    React.useEffect(() => {
        let index = 0;
        if (!countriesData) {
            const countriesObject = {};

            countriesMeta.forEach((i) => {
                let c = i.label[0];
                if (!countriesObject[c]) {
                    countriesObject[c] = {
                        title: c,
                        index: index,
                        data: [i],
                    };
                    index++;
                } else {
                    countriesObject[c].data.push(i);
                }
            });

            const data = [];

            for (let k of Object.keys(countriesObject)) {
                data.push(countriesObject[k]);
            }

            setCountriesData(data);
        }
    }, [countriesData]);

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
            <ASSafeAreaView marginBottom={20} flexDirection="column">
                <View alignItems="center" marginHorizontal={16} marginTop={8}>
                    <View position="relative" flexDirection="row" maxWidth={600}>
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            height={36}
                            borderRadius={100}
                            paddingLeft={36}
                            paddingRight={12}
                            paddingBottom={Platform.OS === 'ios' ? undefined : 0}
                            paddingTop={Platform.OS === 'ios' ? undefined : 0}
                            placeholder="Search"
                            allowFontScaling={false}
                            keyboardAppearance={theme.keyboardAppearance}
                            backgroundColor={theme.backgroundTertiaryTrans}
                            placeholderTextColor={theme.foregroundTertiary}
                            style={{ fontSize: 17, flexGrow: 1 }}
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
                <View flexGrow={1} flexShrink={1} alignItems="center">
                    <View maxWidth={600} width="100%">
                        {!sortCountries && (
                            <SectionList
                                keyboardDismissMode="on-drag"
                                sections={countriesData}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => (
                                    <ZListItem
                                        text={item.label}
                                        description={item.value}
                                        onPress={() => action(item)}
                                        small={true}
                                    />
                                )}
                                renderSectionHeader={({ section: { title, index } }) => (
                                    <View
                                        height={64}
                                        paddingHorizontal={16}
                                        paddingTop={16}
                                        alignItems="center"
                                        flexDirection="row"
                                        backgroundColor={theme.backgroundPrimary}
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
                                data={sortCountries}
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
                            <Text style={{ ...TextStyles.Body, textAlign: 'center', color: theme.foregroundTertiary, paddingHorizontal: 16 }}>
                                No country
                            </Text>
                        )}
                    </View>
                </View>
            </ASSafeAreaView>
        </>
    );
});

export const CountryPicker = withApp(CountryPickerComponent, { navigationAppearance: 'small' });
