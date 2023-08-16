import { ChangeEvent } from 'react';
import { RuleDTO, RulesStatus } from '../../types/supabase';

import { useDebouncedCallback } from 'use-debounce';
import synchroDB from '../../lib/service/dexie';
import { IconButton, TextField, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useAuthUser } from 'react-auth-kit';

interface EditableCommentProps {
  title: string;
  result: RulesStatus & RuleDTO;
}

export const EditableComment = ({ title, result }: EditableCommentProps) => {
  // TODO: add waiter
  const auth = useAuthUser();

  const _handleChange = useDebouncedCallback(
    async ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
      return await synchroDB.saveDescription(
        { ...result, user_email: auth().user?.email },
        target.value
      );
    },
    500
  );

  const handleEditComment = () => {
    // Lógica para abrir el componente EditableComment en modo de edición
  };

  return (
    <>
      <Typography sx={{ fontStyle: 'italic', fontWeight: 900 }}>
        Sustento de la propuesta
      </Typography>
      <TextField
        multiline
        fullWidth
        defaultValue={result.description}
        title={title}
        placeholder='Esta regla aún no ha tenido observaciones'
        onChange={_handleChange}
      />
      <Tooltip title='Editar propuesta'>
        <IconButton
          onClick={handleEditComment}
          sx={{
            background: ({ palette }) => palette.primary.light,
            zIndex: 500,
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
