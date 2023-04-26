import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { ColorPalletes } from "../../theme";

export interface DetailProps {
  tags: string[];
  isActive: boolean;
  dateSonar?: string | Date;
  ruleTitle: string;
  ruleDescription: string;
}

export function PopOverDetails(props: DetailProps) {
  const { tags, isActive, dateSonar, ruleTitle, ruleDescription } = props;
  return (
    <Box>
      <Stack padding={2} direction="column" spacing={2}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Chip
            sx={{
              backgroundColor: ({ palette }) =>
                palette.mode === ColorPalletes.DARK
                  ? palette.grey[900]
                  : palette.grey[800],
              color: "white",
            }}
            label={`Regla ${isActive ? "activo" : "inactivo"} desde:`}
          />
          <Chip label={`${dateSonar ?? "Sin info"}`}></Chip>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          {tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        padding={2}
        pb={0}
      >
        <Tooltip title={ruleTitle}>
          <Chip
            color="secondary"
            label={
              <Typography noWrap variant="h5">
                {ruleTitle}
              </Typography>
            }
          />
        </Tooltip>
      </Stack>

      <Stack direction="column" justifyContent="center" padding={2}>
        <Stack direction="row" justifyContent="flex-start">
          <Chip
            label={"Descripción de la Regla"}
            sx={{
              backgroundColor: ({ palette }) =>
                palette.mode === ColorPalletes.DARK
                  ? palette.grey[900]
                  : palette.grey[800],
              color: "white",
            }}
          ></Chip>
        </Stack>
        <Typography dangerouslySetInnerHTML={{ __html: ruleDescription }} />
      </Stack>
    </Box>
  );
}
