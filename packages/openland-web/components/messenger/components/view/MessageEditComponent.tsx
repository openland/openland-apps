import * as React from 'react';
import Glamorous from 'glamorous';
import { withEditMessage } from '../../../../api/withMessageState';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { isServerMessage } from 'openland-engines/messenger/types';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import {
  ForwardRefProviderComponent,
  RefContext
} from '../../../ForwardingRefs';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XRichTextInput, XRichTextInputProps } from 'openland-x/XRichTextInput';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { MessageFull } from 'openland-api/Types';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { global } from '../../../../globalSingleton';

const TextInputWrapper = Glamorous.div({
  flexGrow: 1,
  maxHeight: '100%',
  maxWidth: '100%',
  '& > div': {
    maxHeight: '100%',
    height: '100%',
    '& .DraftEditor-root': {
      overflow: 'auto',
      borderRadius: 20,
      backgroundColor: '#fff',
      border: 'solid 1px #e4e6e9',
      minHeight: 40,
      maxHeight: 200,
      paddingTop: 9,
      paddingBottom: 9,
      paddingLeft: 16,
      paddingRight: 40
    },
    '& .draftJsEmojiPlugin__emojiSelectPopover__1J1s0': {
      bottom: 'auto'
    }
  }
});

export interface XTextInputProps extends XRichTextInputProps {
  valueStoreKey?: string;
}

const XRichTextInputStored = class XRichTextInputStoredInner extends React.PureComponent<
  XTextInputProps & { store: XStoreState }
> {
  onChangeHandler = (value: string) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    if (this.props.valueStoreKey) {
      this.props.store.writeValue(this.props.valueStoreKey, value);
    }
  }

  render() {
    let { valueStoreKey, store, ...other } = this.props;
    let value = this.props.value;
    if (valueStoreKey) {
      let existing = store.readValue(valueStoreKey);
      value = '';
      if (typeof existing === 'string') {
        value = existing;
      } else if (existing) {
        value = existing.toString();
      }
    }

    return (
      <RefContext.Consumer>
        {({ ref }: any) => (
          <XRichTextInput
            ref={ref}
            autofocus={true}
            onChange={this.onChangeHandler}
            value={value}
            {...other}
          />
        )}
      </RefContext.Consumer>
    );
  }
};

const XTextInput = class XTextInputInner extends React.PureComponent<
  XTextInputProps
> {
  render() {
    let { valueStoreKey, ...other } = this.props;
    if (valueStoreKey) {
      let valueStoreKeyCached = valueStoreKey;
      return (
        <XStoreContext.Consumer>
          {store => {
            if (!store) {
              throw Error('No store!');
            }
            return (
              <XRichTextInputStored
                {...other}
                valueStoreKey={valueStoreKeyCached}
                store={store}
              />
            );
          }}
        </XStoreContext.Consumer>
      );
    }
    return <XRichTextInput {...other} />;
  }
};

class EditMessageComponentInner extends React.PureComponent<any> {
  textInputRef = React.createRef<XRichTextInput>();

  // componentDidMount() {
  //   if (this.textInputRef && this.textInputRef.current) {
  //     this.textInputRef.current.focus();
  //   }
  // }

  render() {
    const props = this.props;
    let id = props.router.query.editMessage;
    let conversation: ConversationEngine = (props as any).conversation;
    let message = conversation
      .getState()
      .messages.filter(m => isServerMessage(m) && m.id === id)[0];
    if (!message) {
      return null;
    }
    return (
      <XModalForm
        title="Edit message"
        width={800}
        targetQuery="editMessage"
        defaultAction={data => {
          props.editMessage({
            variables: { messageId: id, message: data.message }
          });
        }}
        defaultData={{
          message: message.message
        }}
        submitProps={{ succesText: 'done!' }}
      >
        <TextInputWrapper>
          <XTextInput ref={this.textInputRef} valueStoreKey="fields.message" />
        </TextInputWrapper>
      </XModalForm>
    );
  }
}

const Footer = Glamorous(XHorizontal)({
  display: 'flex',
  paddingTop: 10,
  paddingBottom: 5
});

class EditMessageInlineInner extends React.Component<any> {
  xRichTextInputRef = React.createRef<XRichTextInput>();

  componentDidMount() {
    if (this.xRichTextInputRef && this.xRichTextInputRef.current) {
      this.xRichTextInputRef.current.focusToEnd();
    }
  }

  render() {
    const props = this.props;

    let id = (props as any).id;
    let text = (props as any).text;
    return (
      <XForm
        defaultAction={async data => {
          await props.editMessage({
            variables: { messageId: id, message: data.message }
          });
          (props as any).onClose();
        }}
        defaultData={{
          message: text
        }}
      >
        <TextInputWrapper>
          <ForwardRefProviderComponent ref={this.xRichTextInputRef}>
            <XTextInput valueStoreKey="fields.message" />
          </ForwardRefProviderComponent>
        </TextInputWrapper>

        <Footer separator={5}>
          <XFormSubmit text="Save" style="primary" />
          <XButton
            text="Cancel"
            size="r-default"
            onClick={() => {
              (props as any).onClose();
            }}
          />
        </Footer>
      </XForm>
    );
  }
}

const EditMessageInline = withEditMessage(
  EditMessageInlineInner as any
) as React.ComponentType<{ id: string; text: string | null; onClose: any }>;

export class EditMessageInlineWrapper extends React.Component<{
  message: MessageFull;
  onClose: any;
}> {
  onCloseHandler = () => {
    this.props.onClose();
  }

  keydownHandler = (e: any) => {
    if (e.code === 'Escape') {
      this.onCloseHandler();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keydownHandler);
    global.setIsEditMessage(true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
    global.setIsEditMessage(false);
  }

  render() {
    return (
      <EditMessageInline
        id={this.props.message.id}
        text={this.props.message.message}
        onClose={this.onCloseHandler}
      />
    );
  }
}
