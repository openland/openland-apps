export interface TextRenderProccessorApi {
    process(text: string, isBig?: boolean): string | Element[] | JSX.Element[] | Element | JSX.Element;
}