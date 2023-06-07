import { Box, Divider, Drawer, Tab, Tabs } from '@mui/material';
import { PopOverDetails } from '../PopOverDetails';

import { RuleDTO, RulesStatus } from '../../types/supabase';
import { useState } from 'react';
import { CommentBox } from '../CommentBox/CommentBox';
import { CommentHistory } from '../CommentHistory/CommentHistory';
import { faker } from '@faker-js/faker';

const generateRandomComments = (count) => {
  const comments = [];
  const timestamp = new Date(); // Fecha actual

  for (let i = 0; i < count; i++) {
    timestamp.setMinutes(timestamp.getMinutes() - i); // Restar minutos al timestamp en cada iteración

    const comment = {
      id: i + 1,
      author: faker.person.fullName(),
      timestamp: timestamp.toLocaleString(),
      content: faker.lorem.sentence(),
    };

    comments.push(comment);
  }

  return comments; // Revertir el orden para que los comentarios más recientes aparezcan primero
};

interface CustomDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  result: RulesStatus & RuleDTO & { isActiveOriginal: boolean };
}

const renderOptions = [
  {
    tab: 'description',
    content: ({ result }) => (
      <PopOverDetails
        tags={[result.severity, result.type]}
        isActive={result.isActive}
        ruleTitle={result.name}
        ruleDescription={result.htmlDesc}
      />
    ),
  },
  {
    tab: 'history',
    content: () => {
      const randomComments = generateRandomComments(6);

      return (
        <Box height='100%' display='flex' flexDirection='column'>
          <Box flexGrow={1}>
            <CommentHistory comments={randomComments} />
          </Box>
          <Divider />
          <Box height='25%' overflow='auto' p={2}>
            <CommentBox />
          </Box>
        </Box>
      );
    },
  },
];

export const CustomDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  result,
}: CustomDrawerProps) => {
  const [activeTab, setActiveTab] = useState('');

  const handleToggleDrawer = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDrawerOpen(!isDrawerOpen);
    if (activeTab === 'description') {
      setActiveTab('');
    }
  };

  const handleTabChange = (_: React.ChangeEvent<object>, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleDrawerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const renderContent = renderOptions.find(
    (option) => option.tab === activeTab
  );

  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={handleToggleDrawer}
      onClick={handleDrawerClick}
      PaperProps={{ style: { width: '42.5%' } }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant='fullWidth'
        aria-label='Drawer tabs'
      >
        <Tab label='Descripción de Reglas' value='description' />
        <Tab label='Historial de Cambios' value='history' />
      </Tabs>
      {renderContent && renderContent.content({ result })}
    </Drawer>
  );
};
