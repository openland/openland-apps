import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XRadioItem } from 'openland-x/XRadio';
import { XButton } from 'openland-x/XButton';
import { XVertical } from 'openland-x-layout/XVertical';
import { SettingsNavigation } from './components/SettingsNavigation';
import { Content, Header, GroupTitle } from './components/SettingComponents';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { UserInfoContext } from 'openland-web/components/UserInfo';

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

class ImagesView extends React.PureComponent<
    { userId?: string },
    { images: boolean; confirm: boolean; beChange: boolean }
> {
    timer: any;
    constructor(props: any) {
        super(props);
        let value = false;

        if (canUseDOM) {
            let localValue = localStorage.getItem('image_view_alternative');

            if (localValue) {
                value = localValue === 'true';
            } else {
                if (this.props.userId === 'LOaDEWDj9zsVv999DDpJiEj05K') {
                    value = true;
                }
            }
        }

        this.state = {
            images: value,
            confirm: false,
            beChange: false,
        };
    }

    handleOn = () => {
        clearInterval(this.timer);
        this.setState({
            images: true,
            confirm: false,
            beChange: true,
        });
    };

    handleOff = () => {
        clearInterval(this.timer);
        this.setState({
            images: false,
            confirm: false,
            beChange: true,
        });
    };

    onSave = () => {
        this.setState({
            confirm: true,
        });
        localStorage.setItem('image_view_alternative', this.state.images ? 'true' : 'false');
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
        const { images, confirm, beChange } = this.state;
        return (
            <XVertical separator={12}>
                <XVertical separator={9}>
                    <GroupTitle>Image display in chat</GroupTitle>
                    <XRadioItem
                        label="Default: No radius and shadow."
                        checked={!images}
                        onChange={this.handleOff}
                    />
                    <XRadioItem
                        label={'"We made the buttons on the screen look so good you\'ll want to lick them." © Steve Jobs'}
                        checked={images}
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
                <XVertical separator={24}>
                    <HighlightSecretGroups />
                    <UserInfoContext.Consumer>
                        {(c) => <ImagesView userId={(c && c.user) ? c.user.id : undefined} />}
                    </UserInfoContext.Consumer>
                </XVertical>
            </XVertical>
        </Content>
    </SettingsNavigation>
));
