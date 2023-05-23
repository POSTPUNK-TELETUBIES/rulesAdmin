import { Sync } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TableRow,
  TableCell,
  Checkbox,
  DialogActions,
} from '@mui/material';
import { useSynchro } from '../../hooks';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { fetchClient } from '../../lib/modules/fetchClient';

import GenericTable from '../../layout/GenericTable';

import synchroDb, { LocalRulesStatus } from '../../lib/service/dexie';
import { columns } from './config';

export const SynchroButton = () => {
  const [_handleClickSynchro] = useSynchro();
  const [open, setOpen] = useState(false);
  const [conflictedData, setConflictedData] = useState<LocalRulesStatus[]>([]);

  const selectedRef = useRef({});

  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const handleOpenModal = useCallback(async () => {
    const dataFromIndexedDb = await synchroDb.getRulesToUpdate();
    const conflictedData = await fetchClient.getConflicts(dataFromIndexedDb);

    setConflictedData(conflictedData);

    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSynchro = useCallback(() => {
    _handleClickSynchro();
    handleCloseModal();
  }, [_handleClickSynchro, handleCloseModal]);

  const _handleAtomicChange = useCallback(
    (id: number, event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) return (selectedRef.current[id] = true);

      delete selectedRef.current[id];
    },
    []
  );

  const _handleMolecularChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsSelectedAll(event.target.checked);
    },
    []
  );

  return (
    <>
      <MenuItem onClick={handleOpenModal}>
        <ListItemIcon>
          <Sync fontSize='small' />
        </ListItemIcon>
        <ListItemText>Sincronizar</ListItemText>
      </MenuItem>
      <Dialog onClose={handleCloseModal} open={open}>
        <DialogTitle>Hay conflictos</DialogTitle>
        <DialogContent>
          <GenericTable
            header={
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={isSelectedAll}
                    onChange={_handleMolecularChange}
                  />
                </TableCell>
                {columns.map(({ label }) => (
                  <TableCell key={label}>{label}</TableCell>
                ))}
              </TableRow>
            }
            body={
              <>
                {conflictedData?.map((result) => (
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        disabled={isSelectedAll}
                        onChange={(event) =>
                          _handleAtomicChange(result.id, event)
                        }
                      />
                    </TableCell>
                    {columns.map((config) => (
                      <TableCell id={`${result.id}-${config.label}`}>
                        {result[config.resource]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            }
          />
          <DialogActions>
            <Button onClick={handleSynchro} startIcon={<Sync />}>
              Sincronizar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
