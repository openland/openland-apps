import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, LayoutChangeEvent } from 'react-native';
// import { ZSafeAreaView } from '../../components/layout/ZSafeAreaView';
// import { ASView } from 'react-native-async-view/ASView';
// import { ASText } from 'react-native-async-view/ASText';
// import { ASFlex } from 'react-native-async-view/ASFlex';
import { PageProps } from '../../components/PageProps';
// import { FastHeader } from 'react-native-fast-navigation/FastHeader';
// import { DeviceConfig } from 'react-native-fast-navigation/DeviceConfig';

const TestContext = React.createContext<number[]>([0]);
const TestContextSetter = React.createContext<((v: number) => void) | undefined>(undefined);

class TestSetter extends React.PureComponent {
    private val = [0];

    setValue = (v: number) => {
        this.val[0] = v;
    }
    render() {
        return (
            <TestContext.Provider value={this.val}>
                <TestContextSetter.Provider value={this.setValue}>
                    {this.props.children}
                </TestContextSetter.Provider>
            </TestContext.Provider>
        );
    }
}

export class NavigationComponent extends React.PureComponent<PageProps, { layout?: { width: number, height: number } }> {

    static navigationOptions = {
        title: 'Navigation'
    };

    constructor(props: PageProps) {
        super(props);
        this.state = {

        };
    }

    handleLayout = (event: LayoutChangeEvent) => {
        this.setState({ layout: { width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height } });
    }

    render() {
        return (
            <>
                {/* <FastHeader title="Some title" /> */}
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: '#fff' }} onLayout={this.handleLayout}>
                    <TestSetter>
                        <TestContextSetter.Consumer>
                            {v => {
                                v!(10);
                                return null;
                            }}
                        </TestContextSetter.Consumer>
                        <TestContext.Consumer>
                            {v => {
                                console.log(v[0]);
                                return null;
                            }}
                        </TestContext.Consumer>
                    </TestSetter>
                </View>
            </>
        );
    }
}

export const Navigation = withApp(NavigationComponent);