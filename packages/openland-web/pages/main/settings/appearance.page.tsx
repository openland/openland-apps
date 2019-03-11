import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XRadioItem } from 'openland-x/XRadio';
import { XButton } from 'openland-x/XButton';
import { XVertical } from 'openland-x-layout/XVertical';
import { SettingsNavigation } from './components/SettingsNavigation';
import { Content, Header, GroupTitle } from './components/SettingComponents';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

class HighlightSecretGroups extends React.PureComponent<
    {},
    { highlight: boolean; confirm: boolean; beChange: boolean }
> {
    timer: any;
    constructor(props: any) {
        super(props);
        this.state = {
            highlight: canUseDOM && localStorage.getItem('highlight_secret_chat') === 'true',
            confirm: false,
            beChange: false,
        };
    }

    handleOn = () => {
        clearInterval(this.timer);
        this.setState({
            highlight: true,
            confirm: false,
            beChange: true,
        });
    };

    handleOff = () => {
        clearInterval(this.timer);
        this.setState({
            highlight: false,
            confirm: false,
            beChange: true,
        });
    };

    onSave = () => {
        this.setState({
            confirm: true,
        });
        localStorage.setItem('highlight_secret_chat', this.state.highlight ? 'true' : 'false');
        this.timer = setTimeout(() => {
            this.setState({
                beChange: false,
            });
        }, 1000);
    };

    resetButtonStyle = () => {
        clearInterval(this.timer);
        this.setState({
            confirm: false,
        });
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { highlight, confirm, beChange } = this.state;
        return (
            <XVertical separator={12}>
                <XVertical separator={9}>
                    <GroupTitle>Secret group display</GroupTitle>
                    <XRadioItem
                        label="Default: Secret groups have the same look as other group types."
                        checked={!highlight}
                        onChange={this.handleOff}
                    />
                    <XRadioItem
                        label="Highlighted: Make secret groups noticeable in your dialogues list."
                        checked={highlight}
                        onChange={this.handleOn}
                    />
                </XVertical>
                {beChange && (
                    <XButton
                        text={confirm ? 'Saved!' : 'Save changes'}
                        style={confirm ? 'success' : 'primary'}
                        alignSelf="flex-start"
                        onClick={this.onSave}
                        onSuccess={this.resetButtonStyle}
                    />
                )}
            </XVertical>
        );
    }
}

export default withApp('Appearance', 'viewer', () => (
    <SettingsNavigation title="Appearance">
        <Content>
            <XVertical separator={12} maxWidth={660}>
                <Header>Appearance</Header>
                <HighlightSecretGroups />
            </XVertical>
        </Content>
    </SettingsNavigation>
));
