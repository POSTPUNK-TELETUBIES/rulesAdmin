import { Box, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
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
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {comments.map((comment) => (
        <TimelineItem key={comment.id}>
          <TimelineSeparator>
            <TimelineDot color='primary'>
              <HistoryIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant='subtitle2'
                sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'black' }}
              >
                {comment.timestamp}
              </Typography>
              <Typography variant='body1'>{comment.author}</Typography>
              <Typography variant='body1'>{comment.content}</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
