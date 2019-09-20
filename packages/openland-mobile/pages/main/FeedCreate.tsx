import * as React from 'react';
import { withApp } from '../../components/withApp';
import { FeedManagePost } from 'openland-mobile/feed/create/FeedManagePost';

const FeedCreateComponent = React.memo(props => <FeedManagePost />);

export const FeedCreate = withApp(FeedCreateComponent, { navigationAppearance: 'small' });
