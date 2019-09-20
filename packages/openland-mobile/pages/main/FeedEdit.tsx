import * as React from 'react';
import { withApp } from '../../components/withApp';
import { FeedManagePost } from 'openland-mobile/feed/create/FeedManagePost';

const FeedEditComponent = React.memo(props => <FeedManagePost />);

export const FeedEdit = withApp(FeedEditComponent, { navigationAppearance: 'small' });
