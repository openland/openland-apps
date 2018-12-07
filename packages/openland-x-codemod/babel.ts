import { createTraversal } from './utils/createTraversal';

export default () => {
    return { visitor: createTraversal() };
};