import { createTraversal } from './src/createTraversal';

export default () => {
    return { visitor: createTraversal() };
};