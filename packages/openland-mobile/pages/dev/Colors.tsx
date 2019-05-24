import * as React from 'react';
import { View, Text } from 'react-native';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { DefaultTheme, DarkTheme } from 'openland-mobile/themes/themes';
import { isArray } from 'util';

interface ColorRow {
    key: string;
    light?: string[];
    dark?: string[];
}

const ignoreParams = ['blurType', 'keyboardAppearance', 'statusBar', 'paddedText', 'transparent'];

const getColorRowFromObject = (key: string, lightObject: any, darkObject: any): ColorRow => {
    let row: ColorRow = { key };

    if (typeof lightObject === 'string') {
        row.light = [lightObject];
        row.dark = [darkObject];
    }

    if (isArray(lightObject)) {
        row.light = lightObject;
        row.dark = darkObject;
    }
            
    return row;
}

const ColorsComponent = (props: PageProps) => {
    const light = DefaultTheme;
    const dark = DarkTheme;
    const rows: ColorRow[] = [];

    Object.keys(light).map(key => {
        if (!ignoreParams.includes(key)) {
            if (typeof light[key] === 'string' || isArray(light[key])) {
                rows.push(getColorRowFromObject(key, light[key], dark[key]));
            } else if (typeof light[key] === 'object') {
                Object.keys(light[key]).map(subkey => {
                    if (!ignoreParams.includes(subkey)) {
                        rows.push(getColorRowFromObject(key + ' - ' + subkey, light[key][subkey], dark[key][subkey]));
                    }
                })
            }
        }
    });

    return (
        <>
            <SHeader title="Colors" />
            <SScrollView>
                {rows.map(row => (
                    <View marginTop={15}>
                        <Text style={{ paddingHorizontal: 10 }}>{row.key}</Text>
                        <View flexDirection="row">
                            <View flexDirection="row" flex={1} backgroundColor={light.backgroundColor} height={50} padding={10}>
                                {(row.light || []).map(color => (
                                    <View flex={1} backgroundColor={color} />
                                ))}
                            </View>
                            <View flexDirection="row" flex={1} backgroundColor={dark.backgroundColor} height={50} padding={10}>
                                {(row.dark || []).map(color => (
                                    <View flex={1} backgroundColor={color} />
                                ))}
                            </View>
                        </View>
                    </View>
                ))}
            </SScrollView>
        </>
    );
}

export const Colors = withApp(ColorsComponent, { navigationAppearance: 'small' });