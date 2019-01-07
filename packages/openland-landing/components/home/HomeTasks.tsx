import * as React from 'react';
import { css } from 'linaria';
import { Container } from '../Container';

let homeTasksRootClass = css`
    padding: 77px 0 0;

    @media (max-width: 767px) {
        padding: 70px 0 0;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        padding: 140px 0 0;
    }
`;

let homeTasksTitleClass = css`
    text-align: center;
    margin: 0 0 51px;
    font-size: 32px;
    line-height: 38px;
    font-weight: 600;

    @media (max-width: 767px) {
        margin: 0 0 24px;
        font-size: 22px;
        line-height: 30px;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        margin: 0 auto 40px;
        font-size: 32px;
        line-height: 42px;
        width: 510px;
    }
`;

let homeTasksListClass = css`
    justify-content: center;
    display: flex;

    @media (max-width: 999px) {
        flex-wrap: wrap;
    }
`;

let homeTasksItemClass = css`
    align-items: center;
    flex-direction: column;
    text-align: center;
    display: flex;
    width: 183px;

    @media (max-width: 767px) {
        width: 145px;
    }
    @media (max-width: 999px) {
        margin: 0 0 50px;
    }

    span {
        font-size: 16px;
        line-height: 19px;
        font-weight: 600;
    }
`;

const TasksList = [
    'Advice',
    'Fundraising',
    'Sales',
    'Customer service',
    'Recruiting',
    'Business operations',
];

export const HomeTasks = () => (
    <div className={homeTasksRootClass}>
        <Container>
            <div className={homeTasksTitleClass}>Perfect for most frequent communication tasks</div>
            <div className={homeTasksListClass}>
                {TasksList.map((item, index) => (
                    <div className={homeTasksItemClass}>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </Container>
    </div>
);
