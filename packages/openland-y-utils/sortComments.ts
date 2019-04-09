import { MessageComments_messageComments_comments } from 'openland-api/Types';

export const sortComments = (comments: MessageComments_messageComments_comments[], commentsMap: { [key: string]: MessageComments_messageComments_comments }): MessageComments_messageComments_comments[] => {
    function topologicalSortHelper(node: any, explored: any, s: any) {
        explored.add(node.id);
        // Marks this node as visited and goes on to the nodes
        // that are dependent on this node, the edge is node ----> n

        if (!!node.parentComment && !explored.has(node.parentComment.id)) {
            topologicalSortHelper(node.parentComment, explored, s);
        }

        // All dependencies are resolved for this node, we can now add
        // This to the stack.
        s.push(commentsMap[node.id]);
    }

    function topologicalSort(nodes: any[]) {
        // let res = [];
        // Create a Stack to keep track of all elements in sorted order
        let s: any[] = [];
        let explored = new Set();

        // For every unvisited node in our graph, call the helper.
        nodes.forEach(node => {
            if (!explored.has(node.id)) {
                topologicalSortHelper(node, explored, s);
            }
        });

        return s;
    }

    return topologicalSort(comments);
}

export function getDepthOfComment(comment: MessageComments_messageComments_comments, commentsMap: { [key: string]: MessageComments_messageComments_comments }): number {
    let currentComment: MessageComments_messageComments_comments | null = comment;
    let currentDepth = 0;
    while (!!currentComment) {
        if (currentComment.parentComment) {
            currentComment = commentsMap[currentComment.parentComment.id];
        } else {
            currentComment = null;
        }

        currentDepth++;
    }

    return currentDepth - 1;
}