import * as React from 'react';
import { Route } from 'react-router-dom';

import * as S from 'semantic-ui-react';

import { withCityQuery } from '../../api/';

import { CityHome } from './Home';
import { CitySegment } from './Project/';
import './styles.css';

const CityRender = withCityQuery((props) => {

    const currentRoot = '/city/' + props.match.params.cityId + '/' + props.match.params.projectId;
    function navigateTo(page: string) {
        props.history.push(currentRoot + page);
    }
    function navigationMenu(title: string, page: string, highlight: boolean = false) {
        var isActive = props.location.pathname === (currentRoot + page);
        return (
            <S.Menu.Item
                active={isActive}
                as="a"
                href={currentRoot + page}
                onClick={(e: {}) => {
                    (e as Event).preventDefault();
                    navigateTo(page);
                }}
            >
                {title}
                {highlight && (
                    <div
                        style={{
                            width: 6,
                            height: 6, borderRadius: 3, backgroundColor: 'red',
                            position: 'absolute',
                            top: 8,
                            right: 8
                        }}
                    />
                )}
            </S.Menu.Item>
        );
    }

    if (props.data.loading) {
        return <S.Loader size="big" active={true} />;
    } else if (props.data.error != null) {
        return (
            <div>
                {props.data.error.message}
            </div>
        );
    } else if (props.data.account == null) {
        return (
            <div>
                City not found
            </div>
        );
    } else {

        return (
            <div className="city-container">
                <div className="city-menu">
                    <div
                        style={{
                            display: 'flex', flexDirection: 'row',
                            alignItems: 'center',
                            padding: 12,
                            paddingTop: 36,
                            paddingBottom: 36
                        }}
                    >
                        <S.Image src="/img/sf.jpg" size="mini" shape="circular" />
                        <div
                            style={{
                                paddingLeft: 8,
                                fontWeight: 600
                            }}
                        >
                            San Francisco Housing
                        </div>
                    </div>
                    <S.Menu
                        vertical={true}
                        attached={true}
                        secondary={true}
                        pointing={true}
                        borderless={true}
                        style={{
                            borderWidth: 0
                        }}
                    >
                        {navigationMenu('Overview', '')}
                        {navigationMenu('Benchmarks', '/benchmarks')}
                        {navigationMenu('Data Sources', '/sources')}
                    </S.Menu>
                    <div className="spring" />
                    <S.Modal trigger={(<S.Button>Edit</S.Button>)}>
                        <S.ModalHeader>
                            Edit City
                        </S.ModalHeader>
                        <S.ModalContent>
                            <S.ModalDescription>Des</S.ModalDescription>
                        </S.ModalContent>
                    </S.Modal>
                    <div className="sidebar-bottom">
                        <div className="sidebar-bottom-logo">
                            Powered by Statecraft
                        </div>
                    </div>
                </div>
                <div className="city-content">
                    <Route exact={true} path="/" component={CityHome} />
                    <Route path="/projects/:projectId" component={CitySegment} />
                </div>
            </div>
        );
    }
});

export default CityRender;