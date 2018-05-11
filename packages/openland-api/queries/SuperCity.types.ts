import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as SuperCity from './SuperCity';

export const SuperCitiesQuery = typedQuery<Types.SuperCitiesQuery, {}>(SuperCity.SuperCitiesQuery);