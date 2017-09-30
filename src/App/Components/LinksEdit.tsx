import * as React from 'react';
import * as API from '../../api/';

export class LinksEdit extends React.Component<{ links: API.Link[], onChange?: ((links: API.Link[]) => void) }, { links: API.Link[] }> {

    constructor(props: { links: API.Link[] }) {
        super(props);
        var links = this.props.links.slice(0);
        links.push({ url: '', title: ''});
        this.state = { links: links };
    }

    render() {
        return (
            <div>
                {this.state.links.map((p, i) =>
                    (<div key={i}>Link {p.title}: {p.url}</div>)
                )}
            </div>
        );
    }
}