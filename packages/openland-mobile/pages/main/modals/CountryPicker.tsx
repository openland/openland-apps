import * as React from 'react';
import { View, TextInput } from 'react-native';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { countriesCode } from 'openland-y-utils/countriesCodes';
import { ZLoader } from 'openland-mobile/components/ZLoader';

const CountryPickerComponent = React.memo((props: PageProps) => {
    const [query, setQuery] = React.useState('');
    let action = props.router.params.action;
    let title = props.router.params.title;

    const sortCountries = countriesCode.filter((i) => {
        const searchValue = i.label.toLowerCase() + i.value.toLowerCase();
        return searchValue.indexOf(query.toLowerCase()) !== -1;
    });

    return (
        <>
            <SHeader title={title || 'Pick country'} />
            <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                <SScrollView>
                    <TextInput
                        onChangeText={setQuery}
                        backgroundColor="rgba(201, 204, 209, 0.24)"
                        height={36}
                        marginHorizontal={16}
                        borderRadius={100}
                        paddingHorizontal={12}
                        placeholder="Country"
                        allowFontScaling={false}
                    />
                    <React.Suspense fallback={<ZLoader />}>
                        <View style={{ paddingTop: 8 }}>
                            {sortCountries.map((i) => (
                                <ZListItem
                                    text={i.label}
                                    description={i.value}
                                    onPress={() => action(i)}
                                    small={true}
                                />
                            ))}
                        </View>
                    </React.Suspense>
                </SScrollView>
            </View>
        </>
    );
});

export const CountryPicker = withApp(CountryPickerComponent, { navigationAppearance: 'small' });
