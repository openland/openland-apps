import * as React from 'react';
import { View, TextInput, Image, SectionList, FlatList, Text } from 'react-native';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { countriesCode } from 'openland-y-utils/countriesCodes';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const CountryPickerComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const [query, setQuery] = React.useState('');
    const [countriesData, setCountriesData] = React.useState<any>(null);
    let action = props.router.params.action;
    let pageTitle = props.router.params.title;

    React.useEffect(() => {
        if (!countriesData) {
            const countriesObject = {};

            countriesCode.forEach((i) => {
                let c = i.label[0];
                if (!countriesObject[c]) {
                    countriesObject[c] = {
                        title: c,
                        data: [i],
                    };
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
        sortCountries = countriesCode.filter((i) => {
            const searchValue = i.label.toLowerCase() + i.value.toLowerCase();
            return searchValue.indexOf(query.toLowerCase()) !== -1;
        });
    }

    if (!countriesData) {
        return <ZLoader />;
    }

    return (
        <>
            <SHeader title={pageTitle || 'Pick country'} />
            <ASSafeAreaView marginBottom={20}>
                <View position="relative" marginHorizontal={16}>
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        height={36}
                        borderRadius={100}
                        paddingLeft={36}
                        paddingRight={12}
                        placeholder="Country"
                        allowFontScaling={false}
                        keyboardAppearance={theme.keyboardAppearance}
                        backgroundColor={theme.backgroundTertiaryTrans}
                        placeholderTextColor={theme.foregroundTertiary}
                        inlineImageLeft={require('assets/ic-search-16.png')}
                        style={{ fontSize: 17, marginBottom: sortCountries ? 16 : 14 }}
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
                <View flexGrow={1} flexShrink={1}>
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
                            renderSectionHeader={({ section: { title } }) => (
                                <View
                                    height={48}
                                    paddingHorizontal={16}
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
                    {sortCountries && (
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
                </View>
            </ASSafeAreaView>
        </>
    );
});

export const CountryPicker = withApp(CountryPickerComponent, { navigationAppearance: 'small' });
