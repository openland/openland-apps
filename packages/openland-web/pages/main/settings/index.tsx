import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { withUserInfo } from '../../../components/UserInfo';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { XForm } from '../../../components/X/XForm';
import { AppContent } from '../../../components/App/AppContent';

export default withApp('Settings', 'viewer', withUserInfo((props) => {
    return (
        <>
            <XHead title="Settings" />
            <AppContent>
                <XCard>
                    <XCard.Header text={props.user!!.name} description="settings panel" />
                    <XForm>
                        <XForm.Header title="base settings" />
                        <XForm.Field title="Interests">
                            <XForm.RawTextarea placeholder="about me" />
                        </XForm.Field>
                        <XForm.Field title="notify settings">
                            <XForm.RawSelect options={[{ title: 'email', value: 'qwe1' }, { title: 'phone', value: 'qwe2' }, { title: 'fax', value: 'qwe3' }]} />
                        </XForm.Field>
                        <XForm.Field title="your nickname" description="test features">
                            <XForm.RawInput placeholder="nickname" />
                        </XForm.Field>
                        <XForm.Footer>
                            <XButton>Cancel</XButton>
                            <XForm.Submit style="dark">Save</XForm.Submit>
                        </XForm.Footer>
                    </XForm>
                </XCard>
            </AppContent>
        </>
    );
}));