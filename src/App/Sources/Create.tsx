import * as React from 'react';
import { MutationFunc } from 'react-apollo';

import * as C from '../Components';
import { withDatasetsCreate } from '../../api/';

export class Create extends React.Component<{ createMutation: MutationFunc<{}> }, { link: string, title: string, error?: string }> {

    constructor() {
        super();
        this.state = { link: '', title: '' };
    }

    handleCreate = () => {
        if (this.state.link === '') {
            this.setState({ error: 'link is empty!' });
        } else if (this.state.title === '') {
            this.setState({ error: 'title is empty!' });
        } else {
            this.setState({ error: 'Adding...' });
            this.props.createMutation({
                variables: {
                    name: this.state.title,
                    url: this.state.link,
                    kind: 'document'
                }
            }).then(() => {
                this.setState({ error: 'OK!' });
            }).catch((e) => {
                this.setState({ error: 'Error: ' + e });
            });
        }
    }

    render() {
        console.warn(this.state);
        return (
            <C.Page>
                <C.Header title="Data Source" />
                <C.Background />
                <C.Content>
                    <C.Section>
                        <C.PageTitle title="Adding new Data Source" />
                        {this.state.error && (
                            <C.PageIntro intro={this.state.error} />
                        )}
                    </C.Section>
                    <C.Section>
                        <div className="st-page--fields">
                            <div className="st-page--field">
                                <div className="st-page--field-l">Link:</div>
                                <div className="st-page--field-r">
                                    <input value={this.state.link} onChange={(event) => this.setState({ link: event.target.value.trim() })} />
                                </div>
                            </div>
                            <div className="st-page--field">
                                <div className="st-page--field-l">Title:</div>
                                <div className="st-page--field-r">
                                    <input value={this.state.title} onChange={(event) => this.setState({ title: event.target.value.trim() })} />
                                </div>
                            </div>
                        </div>
                    </C.Section>
                    <C.Section>
                        <button onClick={this.handleCreate}>Create</button>
                    </C.Section>
                </C.Content>
            </C.Page>
        );
    }
}

export default withDatasetsCreate((props) => {
    return (
        <Create createMutation={props.mutate!!} />
    );
});