import * as React from 'react';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { URickInput } from 'openland-web/components/unicorn/URickInput';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { detectOS } from 'openland-x-utils/detectOS';
import { css } from 'linaria';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MediaIcon from 'openland-icons/s/ic-gallery-24.svg';
import FileIcon from 'openland-icons/s/ic-document-24.svg';
import DonationIcon from 'openland-icons/s/ic-donation-24.svg';
import { fileListToArray } from 'openland-web/fragments/chat/components/DropZone';
import { showDonation } from 'openland-web/fragments/chat/components/showDonation';

const inputStyle = css`
    min-height: 88px;
`;

export const useMessageModal = (props: { id: string, name: string, onAttach: (files: File[]) => void }): [boolean, () => void] => {
    let os = detectOS();
    let isMobile = os === 'Android' || os === 'iOS';
    let [open, setOpen] = React.useState(false);
    let form = useForm();
    let messageField = useField('message', '', form);
    let fileInputRef = React.useRef<HTMLInputElement>(null);
    let onFileInputChange = React.useCallback(e => {
        if (props.onAttach) {
            props.onAttach(fileListToArray(e.target.files));
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);
    let onAttachPress = React.useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);
    let onDonationPress = React.useCallback(() => {
        // TODO pass different ids
        showDonation({ name: props.name, chatId: props.id, userId: props.id });
    }, []);

    const show = () => {
        setOpen(true);
        showModalBox({ width: 480, onCancel: () => setOpen(false) }, ctx => (
            <XView flexDirection="column">
                <XView
                    paddingVertical={20}
                    paddingHorizontal={24}
                    color="var(--foregroundPrimary)"
                    flexShrink={1}
                >
                    <XView
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        {...TextStyles.Title1}
                    >
                        Message to {props.name}
                    </XView>
                </XView>
                <XView>
                    <XView marginHorizontal={24} marginBottom={12}>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple={true}
                            style={{ display: 'none' }}
                            onChange={onFileInputChange}
                        />
                        <URickInput
                            className={inputStyle}
                            placeholder="Write a message..."
                            withShortcutsButton={!isMobile}
                            autofocus={true}
                            onFilesPaste={props.onAttach}
                            onTextChange={messageField.input.onChange}
                        />
                    </XView>
                    <XView flexDirection="row" paddingHorizontal={20} paddingBottom={20}>
                        <UIconButton icon={<MediaIcon />} size="large" onClick={onAttachPress} />
                        <UIconButton icon={<FileIcon />} size="large" onClick={onAttachPress} />
                        <UIconButton icon={<DonationIcon />} size="large" onClick={onDonationPress} />
                    </XView>
                </XView>
                <XModalFooter>
                    <UButton
                        text="Cancel"
                        style="tertiary"
                        size="large"
                        onClick={ctx.hide}
                    />
                    <UButton
                        text="Send"
                        style="primary"
                        size="large"
                        // onClick={() => { }}
                        loading={false}
                    />
                </XModalFooter>
            </XView>
        ));
    };
    return [open, show];
};
