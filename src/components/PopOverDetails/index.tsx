import { Box, Chip, Stack, Typography } from "@mui/material";
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
              background: ({ palette }) => palette.grey[800],
              color: "white",
            }}
            label={`Regla ${isActive ? "Activo" : "Inactivo"} desde:`}
          />
          <Chip label={`${dateSonar ?? "Sin info"}`}></Chip>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              padding: 2,
              background: ({ palette }) =>
                palette.mode === ColorPalletes.DARK
                  ? palette.grey[800]
                  : palette.grey[100],
            }}
          >
            {tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        padding={2}
      >
        <Chip
          color="secondary"
          label={
            <Typography noWrap variant="h5">
              {ruleTitle}
            </Typography>
          }
        />
      </Stack>

      <Stack direction="column" justifyContent="center" spacing={2} padding={2}>
        <Chip label={"Descripción de la Regla"}></Chip>
        <Typography dangerouslySetInnerHTML={{ __html: ruleDescription }} />
      </Stack>
    </Box>
  );
}
