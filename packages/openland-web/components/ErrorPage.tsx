import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { MessagePage } from './MessagePage';
import { MessagePageContent } from './MessagePageContent';

export class ErrorPage extends React.Component<{ statusCode: number | null | undefined }> {
    render() {
        return (
            <>
                <XDocumentHead title={this.props.statusCode === 404 ? ['Error 404: Not found!'] : ['Ooops!']} />
                <XTrack event="View 404">
                    <MessagePage>
                        <MessagePageContent
                            title={this.props.statusCode === 404 ? 'Not found!' : 'Ooops!'}
                        >
                            {this.props.statusCode === 404 && 'We can\'t seem to find the page you are looking for.'}
                            {this.props.statusCode !== 404 && 'Something went wrong. Try again, and if it still doesn\'t work, let us know'}
                        </MessagePageContent>
                    </MessagePage>
                </XTrack>
            </>
        );
        // return 'Error: ' + this.props.statusCode;
    }
}