import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XSelect } from 'openland-x/XSelect';
import IcFile from '../../icons/ic-file.svg';
import { XSelectCustomInputRender } from 'openland-x/basics/XSelectCustom';
import { withUserChannels } from '../../../../../api/withUserChannels';
import { withExplorePeople } from '../../../../../api/withExplorePeople';
import { ComposeSelect } from '../../../../../api/ChatComposeSelect';
import { withCreateIntro } from '../../../../../api/withCreateIntro';

interface ImgButtonStylesProps {
    marginRight?: number;
    marginLeft?: number;
    icon?: any;
    title: string;
}

const ImgButtonStyles = Glamorous(XLink)<ImgButtonStylesProps>(props => ({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.4,
    color: '#99a2b0',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    '&:hover': {
        color: '#5c6a81',
    },
    '& > svg': {
        marginRight: props.marginRight,
        marginLeft: props.marginLeft
    }
}));

const ImgButton = (props: XLinkProps & ImgButtonStylesProps) => (
    <ImgButtonStyles {...props}>
        {props.icon}
        <span>{props.title}</span>
    </ImgButtonStyles>
);

const SearchPeopleModule = withExplorePeople(props => {
    if (!(props.data && props.data.items)) {
        return null;
    }
    return (
        <>
            <XSelect
                creatable={true}
                multi={false}
                field="input.userId"
                options={props.data.items.edges.map(i => ({ label: i.node.name, value: i.node.id })) || []}
                render={
                    <XSelectCustomInputRender
                        multi={false}
                        popper={true}
                        placeholder="Whom do you want to introduce?"
                        rounded={true}
                        onInputChange={(data) => (props as any).onChangeInput(data)}
                        helpText="Wait..."
                    />
                }
            />
        </>
    );
}) as React.ComponentType<{ variables: { query?: string, sort?: string }, onChangeInput: (data: string) => void }>;

class SearchPeople extends React.PureComponent {
    state = {
        query: ''
    };

    handleSearchText = (query: string) => {
        this.setState({
            query: query
        });
    }

    render() {
        return (
            <SearchPeopleModule
                onChangeInput={this.handleSearchText}
                variables={{
                    query: this.state.query
                }}
            />
        );
    }
}

const FooterWrap = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTop: '1px solid rgba(220, 222, 228, 0.6)'
});

class PostIntroModalRaw extends React.Component<Partial<XModalFormProps>> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        let footer = (
            <FooterWrap>
                <XHorizontal flexGrow={1} separator={15}>
                    <ImgButton
                        // onClick={this.handleAttach}
                        title="Document"
                        icon={<IcFile />}
                        marginRight={8}
                    />
                </XHorizontal>
                <XFormSubmit
                    key="intro"
                    succesText="Intro posted!"
                    style="primary-sky-blue"
                    size="r-default"
                    text="Send"
                    keyDownSubmit={true}
                />
            </FooterWrap>
        );
        return (
            <XModalForm
                {...this.props}
                defaultAction={this.props.defaultAction!!}
                title="Introduce a person"
                useTopCloser={true}
                customFooter={footer}
                defaultData={{
                    input: {
                        userId: '',
                        about: ''
                    },
                }}
            >
                <XVertical separator={16}>

                    <SearchPeople />

                    <XTextArea
                        placeholder="Description"
                        resize={false}
                        size="small"
                        valueStoreKey="fields.input.about"
                    />
                </XVertical>
            </XModalForm >
        );
    }
}

const MutationProvider = withCreateIntro((props) => (
    <PostIntroModalRaw
        {...props}
        defaultAction={async (data) => {
            let input = data.input || {};
            await props.createIntro({
                variables: {
                    conversationId: (props as any).conversationId,
                    userId: input.userId[0],
                    about: input.about
                }
            });
        }}
    />
)) as React.ComponentType<{ conversationId: string } & Partial<XModalFormProps>>;

export const PostIntroModal = withCreateIntro((props: Partial<XModalFormProps>) => (
    <MutationProvider {...props} conversationId={(props as any).conversationId} />
)) as React.ComponentType<{ conversationId: string } & Partial<XModalFormProps>>;