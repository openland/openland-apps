import * as React from 'react';
import Glamorous from 'glamorous';
import CloseIcon from '../icons/ic-close.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';

const ReplyWrapper = Glamorous(XHorizontal)({
  paddingLeft: 14,
  paddingRight: 14
});

const VerticalHidden = Glamorous(XVertical)({
  overflow: 'hidden'
});

const HorizontalHidden = Glamorous(XHorizontal)({
  overflow: 'hidden'
});

const BlueLine = Glamorous.div({
  width: 3,
  height: 36,
  borderRadius: 50,
  backgroundColor: '#1790ff',
  flexShrink: 0
});

const ReplyTitle = Glamorous.div({
  opacity: 0.8,
  fontSize: 14,
  fontWeight: 600,
  color: '#000'
});

const ReplyText = Glamorous.div({
  opacity: 0.8,
  fontSize: 13,
  lineHeight: 1.69,
  color: '#000',
  minWidth: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const ReplyCloseBtn = Glamorous.div({
  cursor: 'pointer'
});

export class ReplyView extends React.PureComponent<{
  title: string;
  message: string;
  onCancel: () => void;
}> {
  render() {
    const { title, message, onCancel } = this.props;
    return (
      <ReplyWrapper
        justifyContent="space-between"
        alignItems="center"
        separator={5}
      >
        <BlueLine />
        <HorizontalHidden
          flexGrow={1}
          separator={9}
          alignItems="center"
          justifyContent="space-between"
        >
          <VerticalHidden separator={1}>
            <ReplyTitle>{title}</ReplyTitle>
            <ReplyText>{message}</ReplyText>
          </VerticalHidden>
          <ReplyCloseBtn onClick={onCancel}>
            <CloseIcon />
          </ReplyCloseBtn>
        </HorizontalHidden>
      </ReplyWrapper>
    );
  }
}
