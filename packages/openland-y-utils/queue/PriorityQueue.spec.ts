import { PriorityQueue } from './PriorityQueue';
describe('PriorityQueue', () => {
    it('should work', () => {
        let queue = new PriorityQueue<number>((v) => v);
        queue.push(2);
        queue.push(3);
        queue.push(1);
        expect(queue.size).toBe(3);
        expect(queue.pop()).toBe(3);
        expect(queue.size).toBe(2);
        expect(queue.pop()).toBe(2);
        expect(queue.size).toBe(1);
        expect(queue.pop()).toBe(1);
        expect(queue.size).toBe(0);
        expect(queue.pop()).toBeUndefined();
    });
});