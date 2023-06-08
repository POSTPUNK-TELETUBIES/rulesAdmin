import { Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';

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
    <Timeline>
      {comments.map((comment) => (
        <TimelineItem key={comment.id}>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant='h6' component='span'>
              {comment.author}
            </Typography>
            <Typography>{comment.content}</Typography>
          </TimelineContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <HistoryIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant='body2'
            color='text.secondary'
          >
            {comment.timestamp}
          </TimelineOppositeContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
