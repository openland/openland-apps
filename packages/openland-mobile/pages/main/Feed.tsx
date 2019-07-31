import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { withApp } from 'openland-mobile/components/withApp';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { Post } from './components/feed/Post';

const FeedPage = (props: PageProps) => {
    return (
        <>
            <SHeader title="Feed" />
            <SHeaderButton title="New" icon={require('assets/ic-add-24.png')} />
            <SScrollView>
                <Post 
                    user={{ 
                        avatar: 'https://ucarecdn.com/f08d7228-d243-44ec-baa5-8ffd4dd6b65a/-/crop/300x300/0,0/-/format/jpeg/-/scale_crop/72x72/center/-/quality/lighter/-/progressive/yes/',
                        name: 'Yury Lifshits', 
                        organization: 'Openland' 
                    }} 
                    text={'How does one, just in the middle of doing all the things you do, create cars, rockets'}
                />
                <Post 
                    user={{ 
                        avatar: 'https://ucarecdn.com/f08d7228-d243-44ec-baa5-8ffd4dd6b65a/-/crop/300x300/0,0/-/format/jpeg/-/scale_crop/72x72/center/-/quality/lighter/-/progressive/yes/',
                        name: 'Yury Lifshits', 
                        organization: 'Openland Openland Openland Openland' 
                    }} 
                    text={'Rulers and guides are now available with the latest version of Framer X. Press Ctrl + R to show rulers on the canvas, then either click a ruler to set a guide at that interval or...'}
                />
            </SScrollView>
        </>
    );
};

export const Feed = withApp(FeedPage, { navigationAppearance: 'large' });
