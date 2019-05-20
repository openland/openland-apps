import * as React from 'react';
import { XView } from 'react-mental';
import { XModal, XModalBody, XModalFooter } from 'openland-x-modal/XModal';
import { XButton } from 'openland-x/XButton';
import CloseIcon from 'openland-icons/ic-close-post.svg';

export const LeaveAndDeleteModal = ({ chatTypeStr }: { chatTypeStr: string }) => {
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
                    <XButton text="Leave and delete" style="ghost" path="/mail" />
                </XModalFooter>
            }
            target={
                <XView
                    cursor="pointer"
                    alignItems="center"
                    justifyContent="center"
                    padding={8}
                    width={32}
                    height={32}
                    borderRadius={50}
                    hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                >
                    <CloseIcon />
                </XView>
            }
        />
    );
};
