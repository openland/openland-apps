import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ThemeContext } from '../../AsyncServiceMessageView';

export const Container = (props: { children?: any }) => {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <ASFlex alignItems="center" justifyContent="center" flexDirection="column" backgroundColor="white">
                    <ASFlex
                        marginTop={16}
                        // backgroundColor="rgba(153,162,176,0.6)"
                        // borderRadius={10}
                        marginLeft={10}
                        marginRight={10}
                        flexDirection="column"
                    >
                        <ASText
                            key={'service_text' + theme.theme.serviceTextColor + theme.theme.linkColorIn}
                            color={theme.theme.serviceTextColor}
                            fontSize={12}
                            lineHeight={17}
                            marginLeft={6}
                            marginRight={6}
                            marginBottom={3}
                            textAlign="center"
                        >
                            {props.children}
                        </ASText>
                    </ASFlex>
                </ASFlex>
            )}
        </ThemeContext.Consumer>
    )
};
