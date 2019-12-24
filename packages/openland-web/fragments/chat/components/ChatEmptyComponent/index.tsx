import React from 'react';
import { SharedRoomKind } from 'openland-api/Types';
import PublicPlaceholder from './public';
import PrivatePlaceholder from './private';

interface EmptyBlockProps {
    conversationType?: SharedRoomKind | 'PRIVATE';
}

export default (props: EmptyBlockProps) =>
    props.conversationType === 'PUBLIC' ? <PublicPlaceholder /> : <PrivatePlaceholder />;
