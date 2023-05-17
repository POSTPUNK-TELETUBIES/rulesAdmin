import syncroDB from "../../lib/service/dexie";
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { CloudDone, SyncProblem } from "@mui/icons-material";
import { useLiveQuery } from "dexie-react-hooks";
import GenericPopover from "../../layout/GenericPopover";
import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../../lib/modules/fetchClient";
import { useMemo } from "react";
import { SynchroButton } from "../SynchroButton";

export const Status = () => {
  // TODO: Use live query is a reactive observable
  const rulesStatus = useLiveQuery(() => syncroDB.rulesStatus.toArray());

  const { data: languagesData } = useQuery({
    queryKey: ["languages"],
    queryFn: () => fetchClient.getAllLanguages(),
  });

  const languageBy = useMemo(
    () =>
      languagesData?.reduce((acmPojo, { id, name }) => {
        acmPojo[id] = name;
        return acmPojo;
      }, {}),
    [languagesData]
  );

  return (
    <GenericPopover
      icon={
        rulesStatus?.length ? (
          <SyncProblem color="warning" />
        ) : (
          <CloudDone color="success" />
        )
      }
      textButton={
        <Typography>
          {rulesStatus?.length
            ? "Tienes cambios sin sincronizar"
            : "No hay cambios sin sincronizar"}
        </Typography>
      }
      buttonProps={{ variant: "contained" }}
      popoverBody={
        <Card>
          {languagesData && (
            <CardContent>
              {rulesStatus
                ?.filter(
                  ({ languageId }, index, array) =>
                    array.findIndex(
                      ({ languageId: languageIdInner }) =>
                        languageIdInner === languageId
                    ) === index
                )
                ?.map(({ languageId }, index) => (
                  <Stack key={index} direction="row">
                    <Chip label={languageBy[languageId]} />
                  </Stack>
                ))}

              <CardActions>
                <SynchroButton />
              </CardActions>
            </CardContent>
          )}
        </Card>
      }
    />
  );
};
