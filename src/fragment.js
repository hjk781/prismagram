export const COMMENT_FRAGMENT = `
fragment CommentParts on User{
    id
    text
    user {
        username
    }
}
`;
