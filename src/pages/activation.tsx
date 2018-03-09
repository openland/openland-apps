import '../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../components/X/XHead';
import { MessagePage } from '../components/MessagePage';
import { XCard } from '../components/X/XCard';
import { withData } from '../utils/withData';
import { RedirectComponent } from '../components/routing/RedirectComponent';
import { withAccountQuery } from '../api';

let Title = Glamorous.div({
    fontSize: 20,
    lineHeight: 1.6,
    fontWeight: 600,
    color: '#182642',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16
});

let Message = Glamorous(XCard.Content)({
    alignContent: 'center'
});

export default withData(withAccountQuery((props) => {
    if (props.data.me === null) {
        return <RedirectComponent path="/signin" />
    } else if (props.data.me !== null && props.data.myAccount !== null) {
        return <RedirectComponent path="/" />
    } else {
        return (
            <>
                <XHead title="Activation needed" titleSocial="Openland - land acquisition platfom" />
                <MessagePage>
                    <Title>Activation needed</Title>
                    <Message>We are working on your account and will notify when it became active</Message>
                </MessagePage>
            </>
        );
    }
}));