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
      {comments.map((comment, index) => (
        <Box
          key={comment.id}
          my={2}
          sx={{
            position: 'relative',
            borderLeft: '2px solid #ddd',
            paddingLeft: '20px',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '-10px',
              top: '8px',
              backgroundColor: '#ddd',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
            }}
          />
          <Typography variant='subtitle1'>{comment.author}</Typography>
          <Typography variant='caption' color='text.secondary'>
            {comment.timestamp}
          </Typography>
          <Typography variant='body1'>{comment.content}</Typography>
          {index !== comments.length - 1 && (
            <Divider
              sx={{
                position: 'absolute',
                left: '10px',
                top: '25px',
                width: '1px',
                height: '100%',
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
