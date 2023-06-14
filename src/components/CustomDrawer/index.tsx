import { Box, Divider, Drawer, Stack, Tab, Tabs } from '@mui/material';
import { PopOverDetails } from '../PopOverDetails';

import { RuleDTO, RulesStatus } from '../../types/supabase';
import { useEffect, useState } from 'react';
import { CommentHistory } from '../CommentHistory/CommentHistory';
import { generateRandomComments } from '../../tools';
import { EditableComment } from '../EditableComment';

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
      const randomComments = generateRandomComments(8);

      return (
        <Box height='100%' display='flex' flexDirection='column'>
          <Box flexGrow={1} overflow='auto' flexBasis='75%'>
            <CommentHistory comments={randomComments} />
          </Box>
          <Divider />
          <Box height='30%' overflow='auto' p={2}>
            <Stack direction='row' pr={2}>
              <EditableComment
                result={{
                  id: '1',
                  created_at: new Date(),
                  isActive: true,
                  isActiveSonar: false,
                  qualityProfile_id: 'profile-id',
                  rule_id: 'rule-id',
                  updated_at: new Date(),
                  key: 'rule-key',
                  lang_id: 'language-id',
                  name: 'rule-name',
                  user_email: 'user@example.com',
                }}
                title='Sustento de la propuesta'
              />
            </Stack>
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

  useEffect(() => {
    if (!isDrawerOpen) {
      setActiveTab('');
    }
  }, [isDrawerOpen]);

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
