import { Box, Button } from "@mui/material";

export default function RulesOptions() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      <Button variant="contained" sx={{ width: '15%' }}>Descargar Reglas</Button>
      <Button variant="contained" sx={{ width: '15%' }}>Guardar Cambios</Button>
    </Box>
  )
}