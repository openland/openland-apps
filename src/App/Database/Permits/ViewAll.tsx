import * as React from 'react';
import { Section, PageTitle } from '../../Components/Page';
// import { withPermitsQuery } from '../../../api/Permits';
// import { Link } from '../../Components/Link';

// let PermitsList = withPermitsQuery((props) => {
//     if (!props.data!!.items) {
//         return (<div />);
//     }
//     return (
//         <div>
//             <table>
//                 <tr>
//                     <th>Permit Id</th>
//                     <th>Created</th>
//                     <th>Status</th>
//                     <th>Type</th>
//                 </tr>
//                 {props.data!!.items.edges.map((p) => {
//                     return (<tr key={p.node.id}>
//                         <td style={{padding: 8}}> <Link path={'/db/permits/' + p.node.id}> {p.node.id}</Link></td>
//                         <td style={{padding: 8}}>{p.node.createdAt}</td>
//                         <td style={{padding: 8}}>{p.node.status}</td>
//                         <td style={{padding: 8}}>{p.node.type}</td>
//                     </tr>);
//                 })}
//             </table>
//             {props.data!!.items.pageInfo.hasNextPage &&
//                 (<a onClick={(e) => { e.preventDefault(); props.data!!.loadMoreEntries(); }}>Load More...</a>)}
//         </div>
//     );
// });

class PermitsListComponent extends React.Component<{}, { filter: string }> {
    constructor() {
        super();
        this.state = { filter: '' };
    }
    render() {
        return (
            <div>
                <input value={this.state.filter} onChange={(v) => this.setState({ filter: v.target.value })} />
                {/* <PermitsList filter={this.state.filter + '%'} /> */}
            </div>
        );
    }
}

export default function () {
    return (
        <Section>
            <PageTitle title="All Permits" />
            <PermitsListComponent />
        </Section>
    );
}