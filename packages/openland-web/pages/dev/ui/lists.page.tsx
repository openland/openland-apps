import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XList, XListInfinite } from 'openland-x/XList';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTitle } from 'openland-x/XTitle';

const SampleData = [ 'Kimberlie Hammond', 'Cassi Spurrier', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'Salley Bartman', 'Thora Thompkins', 'Cherlyn Jolley', 'Mckinley Mayle', 'Simona Gomer', 'Georgine Lama', 'Shamika Callison', 'Mahalia Sanmiguel', 'Phoebe Mink', 'Celinda Ealy', 'Myles Koth', 'Lavonna Owings', 'Serafina Mount', 'Melonie Stokley', 'Tara Ballas', 'Van Mccolley', 'Karie Kennelly', 'Jordon Valenti', 'Theresia Ronan', 'Allan Frerichs', 'Helena Ratcliffe', 'Ivelisse Sponaugle', 'Colette Dejonge', 'Nancey Black', 'Mariana Hanford', 'Alesha Frei', 'Dorinda Wolfe', 'Erline Logue', 'Nancee Horta', 'Alane Odle', 'Dustin Tunnell', 'Kera Sidle', 'Samara Utsey', 'Jina Mewborn', 'Pasquale Arzola', 'Tressie Raffield', 'Margarito Otwell', 'Carly Howze', 'Valentine Reineke', 'Michael Oaks', 'Gala Eye', 'Rosie Prange', 'Columbus Nicolas', 'Gilberte Finchum', 'Diego Merida', 'Lanie Manalo', 'Windy Dieckman' ];
const SampleInfiniteData = [ 'Kimberlie Hammond', 'Cassi Spurrier', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'Salley Bartman', 'Thora Thompkins', 'Cherlyn Jolley', 'Mckinley Mayle', 'Simona Gomer', 'Georgine Lama', 'Shamika Callison', 'Mahalia Sanmiguel', 'Phoebe Mink', 'Celinda Ealy', 'Myles Koth', 'Lavonna Owings', 'Serafina Mount', 'Melonie Stokley', 'Tara Ballas', 'Van Mccolley', 'Karie Kennelly', 'Jordon Valenti', 'Theresia Ronan', 'Allan Frerichs', 'Helena Ratcliffe', 'Ivelisse Sponaugle', 'Colette Dejonge', 'Nancey Black', 'Mariana Hanford', 'Alesha Frei', 'Dorinda Wolfe', 'Erline Logue', 'Nancee Horta', 'Alane Odle', 'Dustin Tunnell', 'Kera Sidle', 'Samara Utsey', 'Jina Mewborn', 'Pasquale Arzola', 'Tressie Raffield', 'Margarito Otwell', 'Carly Howze', 'Valentine Reineke', 'Michael Oaks', 'Gala Eye', 'Rosie Prange', 'Columbus Nicolas', 'Gilberte Finchum', 'Diego Merida', 'Lanie Manalo', 'Windy Dieckman' ];

function itemRenderer (index: number) {
    return (
        <div style={{ borderBottom: '1px solid black' }}>
            {SampleData[index]}
        </div>
    );
}

function itemInfiniteRenderer (index: number) {
    return (
        <div style={{ borderBottom: '1px solid black' }}>
            {SampleInfiniteData[index]}
        </div>
    );
}

function loadNextPage (info: { startIndex: number, stopIndex: number }, onLoad: any) {
    for (let i = info.startIndex; i <= info.startIndex + 50; i++) {
        SampleInfiniteData.push('Loaded row #' + i);
    }

    onLoad();
}

export default withApp('UI Framework - Lists', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Lists">
            <XContent>
                <XVertical>
                    <XTitle>Simple</XTitle>
                    <XHorizontal height={300}>
                        <XList
                            rowCount={SampleData.length}
                            itemRenderer={itemRenderer}
                        />
                    </XHorizontal>
                    <XTitle>Infinite scroll</XTitle>
                    <XHorizontal height={300}>
                        <XListInfinite
                            itemRenderer={itemInfiniteRenderer}
                            hasNextPage={true}
                            isNextPageLoading={false}
                            list={SampleInfiniteData}
                            loadNextPage={loadNextPage}
                        />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});