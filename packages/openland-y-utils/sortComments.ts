import { MessageComments_messageComments_comments } from 'openland-api/Types';

export const sortComments = (
    comments: MessageComments_messageComments_comments[],
    commentsMap: { [key: string]: MessageComments_messageComments_comments | undefined },
): MessageComments_messageComments_comments[] => {
    function treeSortHelper(node: any, explored: any, s: any) {
        if (node && node.id) {
            const curNode = commentsMap[node.id];

            if (curNode) {
                if (!curNode.parentComment && !explored.has(curNode.id)) {
                    explored.add(node.id);
                    s.push(curNode);
                }

                if (curNode.parentComment && explored.has(curNode.parentComment.id)) {
                    explored.add(node.id);
                    s.push(curNode);
                }

                for (let child of curNode.childComments) {
                    treeSortHelper(commentsMap[child.id], explored, s);
                }
            }
        }
    }

    function treeSort(nodes: any[]) {
        let s: any[] = [];
        let explored = new Set();

        while (explored.size !== nodes.length) {
            nodes.forEach(node => {
                if (!explored.has(node.id)) {
                    treeSortHelper(node, explored, s);
                }
            });
        }

        return s;
    }

    comments.sort((a, b) => {
        return parseInt(a.comment.date, 10) - parseInt(b.comment.date, 10);
    });

    return treeSort(comments);
};

export function getDepthOfComment(
    comment: MessageComments_messageComments_comments,
    commentsMap: { [key: string]: MessageComments_messageComments_comments },
): number {
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

export function getDepthOfCommentByID(
    commentID: string,
    comments: MessageComments_messageComments_comments[],
): number {
    const commentEntry = comments.filter(c => c.comment.id === commentID)[0];
    const commentsMap = {};
                
    comments.map(comment => {
        commentsMap[comment.id] = comment;
    });

    return getDepthOfComment(commentEntry, commentsMap);
}
