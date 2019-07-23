import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { URickInput, URickInputInstance } from 'openland-web/components/unicorn/URickInput';
import { showShortcutsHelp } from '../showShortcutsHelp';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import ShortcutsIcon from 'openland-icons/ic-attach-shortcuts-3.svg';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

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

const mentionsContainer = css`
    position: absolute;
    bottom: 100%;
    left: 0px;
    right: 0px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
    background-color: white;
    border-radius: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

const AutoCompleteComponent = React.memo((props: { activeWord: string | null }) => {
    if (!props.activeWord) {
        return null;
    }

    return (
        <div className={mentionsContainer}>
            <UListItem title={props.activeWord} onClick={() => console.log(props.activeWord)} />
        </div>
    );
});

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

    const [activeWord, setActiveWord] = React.useState<string | null>(null);
    const onAutocompleteWordChange = React.useCallback((word: string) => {
        setActiveWord(word);
    }, []);

    return (
        <XView flexGrow={1} flexShrink={1} maxHeight={250} paddingVertical={16} position="relative">
            <AutoCompleteComponent activeWord={activeWord} />
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
                    leftContent={<AttachButton text="Shortcuts" icon={<ShortcutsIcon />} onClick={showShortcutsHelp} />}
                    rightContent={<UButton text="Send" onClick={onEnterPress} />}
                />
            </XView>
        </XView>
    );
});
