import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css, cx } from 'linaria';
import Glamorous from 'glamorous';
import { extractFlexProps, XFlexStyles, applyFlex } from '../basics/Flex';

const Container = Glamorous.div<XFlexStyles>([
    {
        position: 'relative',
        '& .public-DraftEditorPlaceholder-root:not(.public-DraftEditorPlaceholder-hasFocus)': {
            color: 'rgba(0, 0, 0, 0.5)',
        },
    },
    applyFlex,
]);

class ContainerWrapper extends React.PureComponent {
    render() {
        return <Container {...this.props} />;
    }
}

const mentionSuggestionsWrapperShow = css`
    transform: scale(1);
`;

const mentionSuggestionsWrapperHide = css`
    transform: scale(0);
`;

const mentionSuggestionsWrapperClassName = css`
    left: 0px;
    bottom: 0px;
    transform-origin: 1em 0%;
    transition: all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1);
    position: absolute;
    border: 1px solid #eee;
    border-radius: 10px;
    background: #fff;
    box-shadow: none;
    z-index: 100;
    bottom: 50px;
    left: 0;
    cursor: pointer;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

export const MentionSuggestionsContainer = (props: any) => {
    const containerRef = React.useRef<ContainerWrapper>(null);

    const [sizeOfContainer, setSizeOfContainer] = React.useState<{
        width: number;
        height: number;
    }>({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
        const containerEl =
            containerRef &&
            containerRef.current &&
            (ReactDOM.findDOMNode(containerRef.current) as Element);

        const newWidthOfContainer = containerEl ? containerEl.getBoundingClientRect().width : 0;
        const newHeightOfContainer = containerEl ? containerEl.getBoundingClientRect().height : 0;

        if (
            sizeOfContainer.width !== newWidthOfContainer ||
            sizeOfContainer.height !== newHeightOfContainer
        ) {
            setSizeOfContainer({
                width: newWidthOfContainer,
                height: newHeightOfContainer,
            });
        }
    }, []);

    const { children, suggestions, showSuggestions } = props;

    return (
        <ContainerWrapper {...extractFlexProps(props)} ref={containerRef}>
            <div
                className={cx(
                    mentionSuggestionsWrapperClassName,
                    showSuggestions ? mentionSuggestionsWrapperShow : mentionSuggestionsWrapperHide,
                )}
                style={{
                    width: sizeOfContainer.width,
                    left: showSuggestions ? 0 : sizeOfContainer.width / 2,
                    bottom: showSuggestions ? 50 : sizeOfContainer.height / 2,
                }}
            >
                {suggestions}
            </div>
            {children}
        </ContainerWrapper>
    );
};
