import * as React from 'react';
import { XView } from 'react-mental';
import { XModal, XModalBody, XModalFooter } from 'openland-x-modal/XModal';
import { XButton } from 'openland-x/XButton';

export const LeaveAndDeleteModal = ({
    chatTypeStr,
    redirectPath,
    target
}: {
    chatTypeStr: string;
    redirectPath: string;
    target: any;
}) => {
    return (
        <XModal
            title={`Leave and delete ${chatTypeStr}`}
            width={380}
            body={
                <XModalBody>
                    <XView paddingBottom={30}>
                        {`If you leave now, this ${chatTypeStr} will be deleted.`}
                    </XView>
                </XModalBody>
            }
            footer={
                <XModalFooter>
                    <XButton text="Cancel" style="primary" autoClose={true} />
                    <XView width={12} flexShrink={0} />
                    <XButton text="Leave and delete" style="ghost" path={redirectPath} />
                </XModalFooter>
            }
            target={target}
        />
    );
};
