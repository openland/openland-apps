import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XInput } from 'openland-x/XInput';
import { XIcon } from 'openland-x/XIcon';

const RootContainer = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    backgroundColor: '#fff'
});

const Logo = Glamorous.div<{ width?: number, height?: number }>((props) => ({
    width: props.width ? props.width : 45,
    height: props.height ? props.height : 45,
    backgroundImage: 'url(\'/static/logo-purple.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    top: 15,
    left: 23
}));

const Title = Glamorous.div({
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: 0.9,
    color: '#1f3449',
    marginBottom: 15
});

const Description = Glamorous.div({
    opacity: 0.7,
    fontSize: 17,
    lineHeight: 1.41,
    letterSpacing: -0.1,
    color: '#1f3449'
});

const TextWrapper = Glamorous.div({
    marginBottom: 46
});

const Label = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.27,
    letterSpacing: -0.1,
    color: '#334562',
    marginBottom: 12
});

const InputGroup = Glamorous.div({
    marginBottom: 26,
    width: 380,
    '&:last-child': {
        marginBottom: 0
    }
});

const ContentWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
});

const FormWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
});

const DropAreaWrapper = Glamorous.div<{ img?: string, dragOn: boolean, dragUnder: boolean }>((props) => ({
    width: 152,
    height: 152,
    borderRadius: 5,
    backgroundColor: props.dragUnder ? '#d0d0d0' : '#ffffff',
    border: props.dragOn ? '1px solid #986AFE' : 'solid 1px #dcdee4',
    overflow: 'hidden',
    boxShadow: props.dragOn ? '0 0 0 2px rgba(143, 124, 246, 0.2)' : undefined,
    backgroundImage: `url('${props.img}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&:hover': {
        border: '1px solid #986AFE'
    },
    '& label': {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        '&::after': {
            content: `''`,
            display: props.img ? 'block' : 'none',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.47)'
        }
    },
    '& .material-icons': {
        color: props.img || props.dragUnder ? '#fff' : '#dcdee4',
        fontSize: 30,
        marginBottom: 7,
        zIndex: 1
    },
    '& span': {
        display: 'block',
        width: 86,
        fontSize: 14,
        lineHeight: 1.29,
        letterSpacing: -0.1,
        textAlign: 'center',
        color: props.img || props.dragUnder ? '#fff' : 'rgba(51, 69, 98, 0.4)',
        zIndex: 1
    },
    '& input': {
        display: 'none'
    }
}));

interface DropAreaState {
    file?: any;
    imgPrew: string;
    dragOn: boolean;
    dragUnder: boolean;
}

class DropArea extends React.Component<{}, DropAreaState> {

    refComp?: Element;

    constructor(props: {}) {
        super(props);

        this.state = {
            file: '',
            imgPrew: '',
            dragOn: false,
            dragUnder: false
        };
    }

    createRef = (el: any) => {
        this.refComp = el;
    }

    handleDragOver = () => {
        this.setState({
            dragUnder: true
        });
    }

    handleDragLeave = () => {
        this.setState({
            dragUnder: false
        });
    }

    handleDrop = (e: any) => {
        e.preventDefault();

        let reader = new FileReader();
        const file = e.dataTransfer.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imgPrew: reader.result,
                dragOn: false,
                dragUnder: false
            });
        };

        reader.readAsDataURL(file);
    }

    handleImageChange = (e: any) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imgPrew: reader.result,
                dragOn: false,
                dragUnder: false
            });
        };

        reader.readAsDataURL(file);
    }

    handleWindowDragOverOrDrop = (event: any) => {
        this.setState({
            dragOn: true
        });
        event.preventDefault();
    }

    componentDidMount() {
        window.addEventListener('dragover', this.handleWindowDragOverOrDrop);
        window.addEventListener('drop', this.handleWindowDragOverOrDrop);
    }

    componentWillUnmount() {
        window.removeEventListener('dragover', this.handleWindowDragOverOrDrop);
        window.removeEventListener('drop', this.handleWindowDragOverOrDrop);
    }

    render() {

        const id = 'avatar_draggble_input';

        return (
            <DropAreaWrapper
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}

                img={this.state.imgPrew}
                dragOn={this.state.dragOn}
                dragUnder={this.state.dragUnder}
            >
                <label htmlFor={id}>
                    <XIcon icon="photo_camera" />
                    <input type="file" id={id} multiple accept="image/*" onChange={this.handleImageChange} ref={this.createRef} />
                    <span>Add your profile photo</span>
                </label>
            </DropAreaWrapper>
        );
    }
}

class Account extends React.Component {
    render() {
        return (
            <RootContainer>
                <Logo />
                <ContentWrapper>
                    <TextWrapper>
                        <Title>Hey, what’s your name?</Title>
                        <Description>Tell us a little about yourself. Fill in the fields below.</Description>
                    </TextWrapper>
                    <XVertical>
                        <XHorizontal separator="large">
                            <FormWrapper>
                                <InputGroup>
                                    <Label>First Name</Label>
                                    <XInput size="medium" placeholder="For example: Vladimir" />
                                </InputGroup>
                                <InputGroup>
                                    <Label>Last Name</Label>
                                    <XInput size="medium" placeholder="For example: Putin" />
                                </InputGroup>
                            </FormWrapper>
                            <FormWrapper>
                                <Label>Photo</Label>
                                <DropArea />
                            </FormWrapper>
                        </XHorizontal>
                        <XButton style="primary" text="Continue" size="medium" alignSelf="flex-end" />
                    </XVertical>
                </ContentWrapper>
            </RootContainer>
        );
    }
}

export default withApp('UI Framework - Account', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title="Create account" />
            <Account />
        </>
    );
});