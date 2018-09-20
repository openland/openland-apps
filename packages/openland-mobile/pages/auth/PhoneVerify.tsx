import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { ZTextInput } from '../../components/ZTextInput';
import { View, Text, Keyboard, Animated } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ASSafeAreaProvider, ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { SScrollView } from 'react-native-s/SScrollView';
import countries from '../../../openland-shared/data/countries.json';
import { ZListItem } from '../../components/ZListItem';
import { SRouter } from 'react-native-s/SRouter';
import { SSearchControler } from 'react-native-s/SSearchController';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemBase } from '../../components/ZListItemBase';
import { Modals } from '../main/modals/Modals';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { delay } from 'openland-y-utils/timer';
import { ASListView } from 'react-native-async-view/ASListView';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DataSource } from 'openland-y-utils/DataSource';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { STrackedValue } from 'react-native-s/STrackedValue';
import { ZAsyncRoutedList } from '../../components/ZAsyncRoutedList';
import { ExploreOrganizationsQuery } from 'openland-api';
import { DirectoryItemComponent } from '../main/Directory';

class PhoneVerifyComponent extends React.Component<PageProps, { phone: string, code: string }> {
    constructor(props: PageProps) {
        super(props);
        this.state = { phone: '', code: '1' };
    }
    handleCodeChange = (code: string) => {
        this.setState({ code: code });
    }

    handlePhoneChange = (phone: string) => {
        this.setState({ phone: phone });
    }
    render() {
        let countryCodeText = '';
        let country = countries.filter(c => c.phone === this.state.code)[0];
        if (!country) {
            countryCodeText = 'Invalid country code';
        } else {
            countryCodeText = country.emoji + country.name;
        }
        return (
            <>
                <SHeader title="Verify phone" />
                <SHeaderButton title="Continue" onPress={() => this.props.router.push('ComposeModal')} />
                <SScrollView>
                    <View style={{ flexDirection: 'column', flexGrow: 1, flexBasis: 0, width: '100%' }}>
                        <Text style={{ fontSize: 22, textAlign: 'center', color: '#000' }}>Your Phone</Text>
                        <Text style={{ fontSize: 16, textAlign: 'center', color: '#000', padding: 50 }}>Please confirm your country code and enter your phone number</Text>
                        <ZListItem
                            text={countryCodeText}
                            path="PickCountry"
                            onPress={() => {
                                Modals.showCountryPicker(
                                    this.props.router,
                                    async (src) => {
                                        this.setState({ code: src });
                                    }
                                );
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ddd', height: 48, marginLeft: 15 }}>
                            <View style={{ width: 50, flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center', borderColor: '#ddd', borderRightWidth: 1, }}>
                                <Text style={{ textAlignVertical: 'center', color: '#000' }}>+</Text>
                                <ZTextInput style={{ alignSelf: 'stretch', minWidth: 20 }} value={this.state.code} onChangeText={this.handleCodeChange} />
                            </View>
                            <ZTextInput style={{ alignSelf: 'stretch', paddingLeft: 10 }} value={this.state.phone} onChangeText={this.handlePhoneChange} width="100%" />
                        </View>
                    </View>
                </SScrollView >

            </>
        );
    }
}

export const PhoneVerify = withApp(PhoneVerifyComponent, { navigationAppearance: 'small-hidden' });

class CountrySearch extends React.Component<{ query: string, router: SRouter }> {

    constructor(props: any) {
        super(props);
    }

    // private contentOffset = new STrackedValue();

    handlePicked = async (id: string) => {
        let action = this.props.router.params.action as (value: string) => any;
        Keyboard.dismiss();
        await action(id);
        this.props.router.back();
    }

    render() {
        let q = this.props.query;

        return (
            <>
                {/* <HeaderConfigRegistrator config={{ contentOffset: this.contentOffset }} /> */}
                {/* <ASListView
                    contentPaddingTop={0}
                    contentPaddingBottom={52}
                    dataView={this.props.data}
                    style={[{ flexGrow: 1 }, {
                        // Work-around for freezing navive animation driver
                        opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                    } as any]}
                    onScroll={this.contentOffset.event}
                    headerPadding={4}
                /> */}

                <SScrollView>
                    <ZListItemGroup>
                        {countries.filter(e => !this.props.query || ([...e.name.split(' '), e.name]).filter(s => q.length === 0 || s.toLowerCase().startsWith(q.toLowerCase())).length > 0).map((c) => (
                            // <ASView style={{ height: 38 }}>
                            //     <ASFlex key={c.code} height={56} onPress={() => this.handlePicked(c.phone)}>
                            //         <ASFlex flexDirection="row" flexGrow={1} >
                            //             <ASText color="#000" flexGrow={1}>{c.name}</ASText>
                            //             <ASText color="#000">+{c.phone}</ASText>
                            //         </ASFlex>
                            //     </ASFlex>
                            // </ASView>
                            <ZListItem text={c.name} description={c.phone} onPress={() => this.handlePicked(c.phone)} />
                        ))}
                    </ZListItemGroup>
                </SScrollView>
            </>

        );
    }
}

class CountryPickerComponent extends React.Component<PageProps> {
    constructor(props: any) {
        super(props);
        // let q = '';
        // let list = countries.filter(e => !q || ([...e.name.split(' '), e.name]).filter(s => q.length === 0 || s.toLowerCase().startsWith(q.toLowerCase())).length > 0);
        // let ds = new DataSource<{ key: string, name: string, phone: string, code: string }>(() => false);
        // ds.initialize(list.map(c => ({ ...c, key: c.code })), true);
        // let dataView = new ASDataView(ds, (c) => (
        //     <ASView style={{ height: 38 }}>
        //         <ASFlex key={c.key} height={56} onPress={() => this.handlePicked(c.phone)}>
        //             <ASFlex flexDirection="row" flexGrow={1} >
        //                 <ASText color="#000" flexGrow={1}>{c.name}</ASText>
        //                 <ASText color="#000">+{c.phone}</ASText>
        //             </ASFlex>
        //         </ASFlex>
        //     </ASView>
        // ));
    }

    render() {
        let searchRender = <CountrySearch query="" router={this.props.router} />;
        return (
            <>
                <SHeader title="Country" />
                <SSearchControler searchRender={searchRender} >
                    {searchRender}
                </SSearchControler>

            </>
        );
    }
}

export const CountryPicker = withApp(CountryPickerComponent, { navigationAppearance: 'large' });