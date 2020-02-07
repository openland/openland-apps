import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';

interface ButtonProps extends XLinkProps {
    primary?: boolean;
    children: any;
    rounded?: boolean;
    dataTestId?: string;
}

const StyledButton = Glamorous(XLink)<{ primary?: boolean; rounded?: boolean }>([
    props => ({
        display: 'block',
        width: '100%',
        height: 48,
        transition: 'all .15s ease',
        backgroundColor: props.primary ? '#1790ff' : '#ffffff',
        color: props.primary ? '#fff' : '#334562',
        borderRadius: props.rounded ? 24 : 6,
        border: props.primary ? 'solid 1px transparent' : 'solid 1px #dcdee4',
        '&:hover': {
            textDecoration: 'none',
            color: props.primary ? '#fff' : '#334562',
            backgroundColor: props.primary ? '#7159f9' : '#f3f3f5',
        },
        '&:focus': {
            boxShadow:
                '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        },
        '&:active': {
            color: props.primary ? '#fff' : '#1790ff',
            backgroundColor: props.primary ? '#1790ff' : '#eeecfa',
        },
        '& span': {
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 0.6,
            lineHeight: 1.11,
        },
        '& svg': {
            width: 20,
            height: 20,
            marginRight: 8,
        },
        '&.email': {
            '& svg': {
                width: 23,
                height: 23,
                marginRight: 7,
            },
            '& svg path': {
                transition: 'all .15s',
            },
            '&:active': {
                '& svg path:first-child': {
                    fill: '#1790ff',
                },
            },
        },
    }),
    props =>
        props.rounded
            ? {
                  height: 44,
                  borderRadius: 20,
                  backgroundColor: props.primary ? '#1790ff' : '#ffffff',
                  color: props.primary ? '#ffffff !important' : '#334562 !important',
                  border: props.primary ? 'solid 1px transparent' : 'solid 1px #dcdee4',
                  '&:hover': {
                      color: props.primary ? '#ffffff' : '#334562',
                      backgroundColor: props.primary ? '#45a6ff' : '#f3f3f5',
                  },
                  '&:active': {
                      color: props.primary ? '#ffffff' : '#1790ff !important',
                      backgroundColor: props.primary ? '#117fe4' : 'rgba(23, 144, 255, 0.05)',
                  },
                  '& span': {
                      fontSize: 16,
                      fontWeight: 500,
                      letterSpacing: -0.4,
                      lineHeight: '16px',
                  },
                  '& svg': {
                      marginRight: 9,
                      marginLeft: -2,
                  },
                  '&.email': {
                      '& svg': {
                          margin: '1px 7px -1px -2px',
                      },
                      '&:active': {
                          '& svg path:first-child': {
                              fill: '#1790ff',
                          },
                      },
                  },
              }
            : {},
]);

const ButtonChildren = Glamorous.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const ImgButton = (props: ButtonProps) => {
    const { children, ...other } = props;
    return (
        <StyledButton {...other}>
            <ButtonChildren tabIndex={-1}>{props.children}</ButtonChildren>
        </StyledButton>
    );
};

export const Title = Glamorous.div<{ roomView: boolean }>(({ roomView }) => {
    return {
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 26,
        fontWeight: 600,
        lineHeight: '31px',
        letterSpacing: 0.8,
        color: '#121e2b',
        paddingTop: roomView ? 64 : 0,
        paddingBottom: 9,
        '@media(max-width: 1200px)': {
            paddingTop: 40,
        },
        '@media(max-width: 500px)': {
            paddingTop: roomView ? 25 : 0,
        },
    };
});

// RoomSignup end

export const GoogleButton = (props: {
    onClick?: any;
    path?: string;
    rounded?: boolean;
    text: string;
}) => {
    return (
        <ImgButton
            dataTestId="google-button"
            onClick={props.onClick}
            path={props.path}
            primary={true}
            rounded={props.rounded}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                version="1.1"
                width="50px"
                height="50px"
            >
                <g id="surface1">
                    <path
                        fill="#fff"
                        d="M 12.546875 10.238281 L 12.546875 14.058594 L 17.988281 14.058594 C 17.277344 16.375 15.34375 18.03125 12.546875 18.03125 C 9.214844 18.03125 6.511719 15.332031 6.511719 12 C 6.511719 8.667969 9.214844 5.96875 12.546875 5.96875 C 14.042969 5.96875 15.410156 6.515625 16.464844 7.421875 L 19.28125 4.605469 C 17.503906 2.988281 15.140625 2 12.546875 2 C 7.019531 2 2.542969 6.476563 2.542969 12 C 2.542969 17.523438 7.019531 22 12.546875 22 C 20.941406 22 22.792969 14.148438 21.972656 10.253906 Z "
                    />
                </g>
            </svg>
            <span>{props.text}</span>
        </ImgButton>
    );
};

export const EmailButton = (props: {
    onClick?: any;
    path?: string;
    rounded?: boolean;
    text: string;
}) => {
    return (
        <ImgButton
            dataTestId="email-button"
            onClick={props.onClick}
            path={props.path}
            className="email"
            rounded={props.rounded}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                    <path
                        fill="#ADB5C0"
                        d="M11.409 9.23c-1.038 0-1.665.89-1.665 2.373 0 1.482.616 2.372 1.665 2.372s1.676-.901 1.676-2.372c0-1.472-.638-2.373-1.676-2.373zM11.762 2C17.225 2 21 5.41 21 10.508c0 3.57-1.745 5.816-4.585 5.816-1.47 0-2.531-.627-2.84-1.722h-.193c-.468 1.14-1.369 1.734-2.68 1.734-2.372 0-3.946-1.916-3.946-4.813 0-2.771 1.517-4.642 3.763-4.642 1.243 0 2.236.605 2.692 1.62h.194V7.155h2.611v5.793c0 .799.354 1.29.992 1.29.993 0 1.643-1.301 1.643-3.456 0-4.14-2.726-6.775-6.923-6.775-4.368 0-7.379 3.068-7.379 7.561 0 4.608 3.091 7.38 7.847 7.38 1.06 0 2.144-.138 2.737-.32v2.03c-.821.217-1.882.342-2.977.342C6.06 21 2 17.282 2 11.511 2 5.878 6.003 2 11.762 2z"
                    />
                    <path d="M0 0h24v24H0z" />
                </g>
            </svg>
            <span>{props.text}</span>
        </ImgButton>
    );
};
