import * as React from 'react';
import { withProjectsQuery } from '../../api/';
import { withLoader } from '../Components/withLoader';
import * as S from 'semantic-ui-react';

const projects = withProjectsQuery(withLoader((props) => {
    console.warn(props.data);

    var projectsList = props.data.projects.map((pr) => {
        return (
            <S.Item
                href={'/projects/' + pr.slug}
                onClick={(e: Event) => {
                    e.preventDefault();
                    props.history.push('/projects/' + pr.slug);
                }}
            >
                <S.ItemImage src="/img/sf.jpg" size="tiny" />
                <S.ItemContent verticalAlign="middle">
                    <S.ItemHeader>{pr.name}</S.ItemHeader>
                    <S.ItemDescription>Project description goes here</S.ItemDescription>
                </S.ItemContent>
            </S.Item >
        );
    });

    return (
        <S.Container style={{ paddingTop: 32 }}>
            <S.Header
                as="h3"
                content="Projects"
                attached={'top'}
                block={true}
            />
            <S.Menu attached={'bottom'}>
                <S.Dropdown item={true} text="Show All">
                    <S.DropdownMenu>
                        <S.Dropdown.Header>Text Size</S.Dropdown.Header>
                        <S.Dropdown.Item>Small</S.Dropdown.Item>
                        <S.Dropdown.Item>Medium</S.Dropdown.Item>
                        <S.Dropdown.Item>Large</S.Dropdown.Item>
                    </S.DropdownMenu>
                </S.Dropdown>
                <S.MenuItem content="New Project" icon="plus" as="a" />
                <S.Menu.Item position="right">
                    <S.Input className="icon" icon="search" placeholder="Search..." />
                </S.Menu.Item>
            </S.Menu>
            <S.Segment>
                <S.ItemGroup link={true} divided={true} unstackable={true}>
                    {projectsList}
                </S.ItemGroup>
            </S.Segment>
        </S.Container>
    );
}));

export default projects;