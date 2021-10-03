import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { useState } from 'react';

interface Props {
  title: string;
  emoji: string;
  date: string | Date;
}

const StyledPostWrapper = styled.div`
  .strict-line {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export default function PostCard({ title, emoji, date }: Props) {
  const [elevation, setElevation] = useState(0);

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
          }}
        >
          {emoji}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', height: '50%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography className="strict-line" component="div" sx={{ fontSize: '16px' }}>
              {title}
            </Typography>
            <Typography color="text.secondary" component="div" sx={{ fontSize: '16px' }}>
              {date}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </StyledPostWrapper>
  );
}
