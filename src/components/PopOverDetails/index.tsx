import { Box, Chip, Stack, Typography } from "@mui/material";

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
            label={`Regla ${isActive ? "Activo" : "Inactivo"} desde:`}
          ></Chip>
          <Chip label={`${dateSonar}`}></Chip>
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
      >
        <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ flexGrow: 1 }}>
          <Chip sx={{ width: "100%" }} label={`${ruleTitle}`}></Chip>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        padding={2}
      >
        <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ flexGrow: 1 }}>
          <Chip label={"Descripción de la Regla"}></Chip>
        </Stack>
        <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ flexGrow: 1 }}>
          <Chip
            sx={{ width: "100%", height: "100%" }}
            label={"ruleDescription"}
          />
          <Typography dangerouslySetInnerHTML={{ __html: ruleDescription }} />
        </Stack>
      </Stack>
    </Box>
  );
}
