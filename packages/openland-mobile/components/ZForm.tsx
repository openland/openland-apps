import * as React from 'react';
import { AppStyles } from '../styles/AppStyles';
import { ScrollView } from 'react-native';

export class ZForm extends React.PureComponent {
    render() {
        return (
            <ScrollView backgroundColor={AppStyles.backyardColor}>
                {this.props.children}
            </ScrollView>
        );
    }
}