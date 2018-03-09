import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../components/X/XHead';
import { withData } from '../utils/withData';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withAccountQuery } from '../api';

const TypeformDiv = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
});

let RootDiv = Glamorous.div({
    position: 'relative',
    width: '100vw',
    height: '100vh'
});

class TypeformEmbedded extends React.Component<{ url: string }> {

    private destDiv: any | null = null;

    handleRef = (src: any | null) => {
        if (src !== null) {
            this.destDiv = src;
        }
    }

    componentDidMount() {
        import('@typeform/embed')
            .then((Typeform: any) => {
                Typeform.makeWidget(this.destDiv!!, this.props.url, {})
            });
    }

    render() {
        return <TypeformDiv innerRef={this.handleRef} />;
    }
}

export default withData(withAccountQuery((props) => {
    if (props.data.me !== null) {
        if (props.data.myAccount !== null) {
            return <RedirectComponent path="/" />;
        } else {
            return <RedirectComponent path="/activation" />;
        }
    } else {
        return (
            <RootDiv>
                <XHead title="Sign Up" />
                <TypeformEmbedded url="https://openlandapp.typeform.com/to/RoMP5U" />
            </RootDiv>
        );
    }
}));