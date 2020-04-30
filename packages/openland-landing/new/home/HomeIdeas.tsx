import * as React from 'react';
import { css } from 'linaria';
import { Container } from '../components/Container';
import Star from './icons/ic-star.svg';
import Arrow from './icons/ic-arrow.svg';

const inner = css`
    position: relative;
    padding: 221px 0 251px;

    @media (min-width: 960px) and (max-width: 1599px) {
        padding: 181px 0 236px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        padding: 140px 0 146px;
    }

    @media (max-width: 767px) {
        padding: 44px 0 50px;
    }
`;

const screenshots = css`
    position: absolute;
    top: 192px; right: 25px;
    width: 447px; height: 444px;
    border-radius: 447px;
    background: #F8F8F8;

    @media (min-width: 960px) and (max-width: 1599px) {
        width: 400px; height: 400px;
        border-radius: 400px;
        top: 175px; right: 0;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        width: 415px; height: 412px;
        border-radius: 415px;
        top: 136px; right: auto; left: 391px;
    }

    @media (min-width: 400px) and (max-width: 767px) {
        &:before {
            content: "";
            display: block;
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 530px; height: 526px;
            border-radius: 530px;
            background: #F8F8F8;
        }
    }

    @media (max-width: 767px) {
        position: relative;
        margin: 0 0 28px;
        top: auto; right: auto;
        width: auto; height: auto;
        padding: 0 77px 0 0;
        background: none;
    }

    div {
        position: absolute;
        box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.08);
        overflow: hidden;

        &:nth-child(1) {
            z-index: 2;
            width: 237px;
            top: -34px; left: 72px;
            border-radius: 20px;

            @media (min-width: 960px) and (max-width: 1599px) {
                width: 220px;
                top: -39px; left: 61px;
            }

            @media (min-width: 768px) and (max-width: 959px) {
                width: 220px;
                top: -32px; left: 67px;
            }

            @media (max-width: 767px) {
                position: relative;
                top: auto; left: auto;
                width: auto;
            }
        }

        &:nth-child(2) {
            z-index: 1;
            width: 200px;
            top: 7px; right: 75px;
            border-radius: 15px;

            @media (min-width: 960px) and (max-width: 1599px) {
                width: 185px;
                top: 0; right: 60px;
            }

            @media (min-width: 768px) and (max-width: 959px) {
                width: 185px;
                top: 7px; right: 69px;
            }

            @media (max-width: 767px) {
                width: auto;
                top: 50%; right: 0; left: 122px;
                transform: translate(0, -50%);
            }
        }

        img {
            display: block;
            width: 100%;
        }
    }
`;

const info = css`
    width: 600px;

    @media (min-width: 960px) and (max-width: 1599px) {
        width: 510px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        width: 390px;
    }

    @media (max-width: 767px) {
        width: auto;
    }
`;

const title = css`
    font-weight: 800;
    font-size: 36px;
    line-height: 40px;
    color: #272750;
    margin: 0 0 12px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 32px;
        line-height: 40px;
        margin: 0 0 8px;
    }

    @media (max-width: 767px) {
        font-size: 24px;
        line-height: 32px;
        margin: 0 0 4px;
    }
`;

const text = css`
    font-size: 24px;
    line-height: 36px;
    color: #525273;
    margin: 0 0 36px;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 22px;
        line-height: 32px;
        margin: 0 0 32px;
    }

    @media (max-width: 767px) {
        font-size: 18px;
        line-height: 26px;
        margin: 0 0 22px;
    }
`;

const ideas = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 0 22px;

    @media (min-width: 960px) and (max-width: 1599px) {
        margin: 0 0 24px;
    }

    @media (min-width: 768px) and (max-width: 959px) {
        margin: 0 0 24px;
        width: 340px;
    }

    div {
        width: calc(100% / 3);
        font-weight: 600;
        font-size: 16px;
        line-height: 28px;
        color: #272750;
        margin: 0 0 20px;
        position: relative;
        padding: 0 0 0 24px;

        @media (min-width: 960px) and (max-width: 1599px) {
            margin: 0 0 12px;
        }

        @media (min-width: 768px) and (max-width: 959px) {
            width: 50%;
            margin: 0 0 12px;
        }

        @media (max-width: 767px) {
            width: 50%;
            font-size: 14px;
            line-height: 24px;
            margin: 0 0 12px;
        }
    }

    svg {
        display: block;
        width: 16px; height: 16px;
        position: absolute;
        top: 6px; left: 0;

        * {
            fill: #FF9F1A;
        }
    }
`;

const link = css`
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: #9393A7;

    @media (min-width: 768px) and (max-width: 1599px) {
        font-size: 16px;
        line-height: 19px;
    }

    @media (max-width: 767px) {
        font-size: 14px;
        line-height: 17px;
    }

    svg {
        display: inline-block;
        vertical-align: top;
        width: 16px; height: 16px;
        margin: 3px 0 -3px 8px;
        opacity: 0.7;

        * {
            fill: #9393A7;
        }
    }

    &:hover {
        color: #272750;
        text-decoration: none;

        svg * {
            fill: #272750;
        }
    }
`;

const IdeasList = ['Discussion club', 'Study group', 'Family', 'Classmates', 'Fan club', 'Fitness buddies', 'Neighbors', 'Book club', 'Arts and hobbies', 'Comedy club', 'Virtual bar', 'Best friends'];

export const HomeIdeas = React.memo(() => (
    <Container>
        <div className={inner}>
            <div className={screenshots}>
                <div>
                    <img
                        src="https://cdn.openland.com/shared/landing/meets/home-ideas-s1.png"
                        srcSet="https://cdn.openland.com/shared/landing/meets/home-ideas-s1.png, https://cdn.openland.com/shared/landing/meets/home-ideas-s1@2x.png 2x"
                    />
                </div>
                <div>
                    <img
                        src="https://cdn.openland.com/shared/landing/meets/home-ideas-s2.png"
                        srcSet="https://cdn.openland.com/shared/landing/meets/home-ideas-s2.png, https://cdn.openland.com/shared/landing/meets/home-ideas-s2@2x.png 2x"
                    />
                </div>
            </div>
            <div className={info}>
                <div className={title}>Coordinate in messenger</div>
                <div className={text}>Create a group and invite friends</div>
                <div className={ideas}>
                    {IdeasList.map(idea => (<div><Star />{idea}</div>))}
                </div>
                <a href="#" className={link}>More ideas<Arrow /></a>
            </div>
        </div>
    </Container>
));
