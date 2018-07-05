import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withExploreOrganizations } from '../../../api/withExploreOrganizations';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';

const SearchInput = Glamorous.input({
    border: '1px solid #d4dae7',
});

const SearchResult = withExploreOrganizations(props => (
    <>
        {/* {console.log(props)} */}
        12312312
    </>
));

class RootComponent extends React.Component<{}, { searchText: string }> {

    searchRef: any | null = null;

    constructor(props: any) {
        super(props);

        this.state = {
            searchText: ''
        };
    }

    handleSearchRef = (ref: any | null) => {
        this.searchRef = ref;
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            searchText: (e.target as any).value as string
        });
    }

    render() {
        return (
            <>
                <SearchInput
                    value={this.state.searchText}
                    onChange={this.handleSearchChange}
                    innerRef={this.handleSearchRef}
                />
                <SearchResult variables={{ query: this.state.searchText }}/>
            </>
        );
    }
}

export default withApp('Directory', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title="directory" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <RootComponent/>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});