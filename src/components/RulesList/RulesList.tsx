import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface Header<T> {
  label: string;
  source: keyof T
}

interface Row {
  code: number;
  rule: string;
  type: string;
  severity: string;
  detail: string;
  currentState: boolean;
  changeState: boolean;
}

const columnConfig: Header<Row>[] = [
  { label: 'Código de regla', source: 'code' },
  { label: 'Regla', source: 'rule' },
  { label: 'Tipo', source: 'type' },
  { label: 'Severidad', source: 'severity' },
  { label: 'Ver Detalle', source: 'detail' },
  { label: 'Estado Actual Sonar', source: 'currentState' },
  { label: '¿Cambio de Estado?', source: 'changeState' },
];
// lista
const rows = [
  { code: 1, rule: 'rule 1', type: 'type 1', severity: 'Baja', detail: 'asd', currentState: 'Activo', changeState: 'a' },
  { code: 2, rule: 'rule 2', type: 'type 2', severity: 'Media', detail: 'asd', currentState: 'Inactivo', changeState: 'a' },
  { code: 3, rule: 'rule 3', type: 'type 3', severity: 'Alta', detail: 'wqe', currentState: 'Activo', changeState: 'b' },
  { code: 4, rule: 'rule 4', type: 'type 4', severity: 'Baja', detail: 'sad', currentState: 'Inactivo', changeState: 'b' },
  { code: 5, rule: 'rule 5', type: 'type 5', severity: 'Media', detail: 'wqe', currentState: 'Activo', changeState: 'a' },
];

export function RulesList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: 'black' }}>
          <TableRow>
            {columnConfig.map((column) => (
              <TableCell key={column.label} sx={{ color: 'white' }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#c8c8c8', borderColor: '#0e0e0e' }}
            >
              {columnConfig.map(({ source }) => (
                <TableCell key={source}>
                  {row[source] ?? "--"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

