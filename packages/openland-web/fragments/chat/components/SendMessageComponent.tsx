import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { URickInput, URickInputInstance } from 'openland-web/components/unicorn/URickInput';
import { showShortcutsHelp } from '../showShortcutsHelp';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import ShortcutsIcon from 'openland-icons/ic-attach-shortcuts-3.svg';

const attachButtonWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 32px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    line-height: 5px;
    color: #676d7a;
    cursor: pointer;
    padding-left: 12px;
    padding-right: 12px;

    &:hover {
        background-color: #f0f2f5;
    }

    & svg {
        margin-right: 10px;

        & * {
            fill: #969aa3;
        }
    }

    @media (max-width: 1230px) {
        & svg {
            margin-right: 0;
        }
        & span {
            display: none;
        }
    }
`;

interface AttachButtonProps {
    text: string;
    icon: JSX.Element;
    onClick?: () => void;
}

const AttachButton = (props: AttachButtonProps) => (
    <XView onClick={props.onClick}>
        <div className={attachButtonWrapper}>
            {props.icon}
            <span>{props.text}</span>
        </div>
    </XView>
);

const ButtonPartWrapper = (props: { leftContent: JSX.Element; rightContent: JSX.Element }) => (
    <XView flexDirection="row" alignItems="center">
        <XView flexDirection="row" alignItems="center" marginRight={6}>
            {props.leftContent}
        </XView>
        {props.rightContent}
    </XView>
);

export const SendMessageComponent = React.memo((props: { onTextSent?: (text: string) => void }) => {
    const ref = React.useRef<URickInputInstance>(null);
    const onEnterPress = React.useCallback(
        () => {
            let ed = ref.current;
            if (ed) {
                let text = ed.getText();
                if (props.onTextSent) {
                    props.onTextSent(text);
                }
                ed.clear();
                ed.focus();
            }
        },
        [props.onTextSent],
    );

    const onAutocompleteWordChange = React.useCallback((word: string) => {
        console.log(word);
    }, []);

    return (
        <XView flexGrow={1} flexShrink={1} maxHeight={250} paddingVertical={16}>
            <XView flexGrow={1} flexShrink={1}>
                <URickInput
                    ref={ref}
                    autocompletePrefixes={['@']}
                    onAutocompleteWordChange={onAutocompleteWordChange}
                    onEnterPress={onEnterPress}
                    autofocus={true}
                    placeholder="Write a message..."
                />
            </XView>
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginTop={16}
            >
                <ButtonPartWrapper
                    leftContent={<AttachButton text="Photo" icon={<PhotoIcon />} />}
                    rightContent={<AttachButton text="Document" icon={<FileIcon />} />}
                />
                <ButtonPartWrapper
                    leftContent={
                        <AttachButton
                            text="Shortcuts"
                            icon={<ShortcutsIcon />}
                            onClick={showShortcutsHelp}
                        />
                    }
                    rightContent={<UButton text="Send" onClick={onEnterPress} />}
                />
            </XView>
        </XView>
    );
});
