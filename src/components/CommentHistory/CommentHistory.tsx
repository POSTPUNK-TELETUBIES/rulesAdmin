import { Box, Divider, Typography } from '@mui/material';

interface Comment {
  id: number;
  author: string;
  timestamp: string;
  content: string;
}

interface CommentHistoryProps {
  comments: Comment[];
}

export function CommentHistory({ comments }: CommentHistoryProps) {
  return (
    <Box>
      {comments.map((comment) => (
        <Box key={comment.id} my={2}>
          <Typography variant='subtitle1'>{comment.author}</Typography>
          <Typography variant='caption' color='text.secondary'>
            {comment.timestamp}
          </Typography>
          <Typography variant='body1'>{comment.content}</Typography>
          <Divider />
        </Box>
      ))}
    </Box>
  );
}
