import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import '@/styles/index.css';
import Header from '@/components/Header';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'VIGUI',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang='es'>
      <Box component='body'>
        <Header />
        <Box component='main'>{children}</Box>
      </Box>
    </html>
  );
};

export default RootLayout;
