import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import styled from '@emotion/styled';
import { useState } from 'react';

interface Props {
  title: string;
  emoji: string;
  date: string | Date;
  category: string;
  color: string;
  tags: string[];
}

const StyledPostWrapper = styled.div`
  .strict-line {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const StyledEmojiWrapper = styled.div``;

export default function PostCard({ title, emoji, date, category, color, tags }: Props) {
  const [elevation, setElevation] = useState(0);

  const StyledTagsWrapper = styled.div`
    .chip {
      position: absolute;
      top: 4px;
      left: 8px;
      font-size: 12px;
    }
    .chip__colored {
      position: absolute;
      bottom: 4px;
      right: 8px;
      font-size: 12px;
      color: white;
      background: ${color};
      max-width: 90px;
    }
  `;

  return (
    <StyledPostWrapper onMouseEnter={() => setElevation(24)} onMouseLeave={() => setElevation(0)}>
      <Card
        sx={{ display: 'flex', flexDirection: 'column', height: '200px' }}
        elevation={elevation}
      >
        <Box
          sx={{
            display: 'flex',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '46px',
            backgroundColor: '#f5f5f5',
            position: 'relative',
          }}
        >
          <StyledTagsWrapper>
            <Chip label={category} className="chip" />
          </StyledTagsWrapper>
          <StyledEmojiWrapper>{emoji}</StyledEmojiWrapper>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', height: '50%', position: 'relative' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography className="strict-line" component="div" sx={{ fontSize: '16px' }}>
              {title}
            </Typography>
            <Typography color="text.secondary" component="div" sx={{ fontSize: '16px' }}>
              {date}
            </Typography>
            <StyledTagsWrapper>
              <Chip label={tags[0]} className="chip__colored" size="small" />
            </StyledTagsWrapper>
          </CardContent>
        </Box>
      </Card>
    </StyledPostWrapper>
  );
}
