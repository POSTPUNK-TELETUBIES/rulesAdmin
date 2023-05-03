import type { RuleDTO, RulesStatus } from "../../types/supabase";

import { TimeAgo } from "../TimeAgo";
import { PopOverDetails } from "../PopOverDetails";

import GenericPopover from "../../layout/GenericPopover";
import { UncontrolledSwitch } from "../Switch/uncontrolledIndexed";
import { Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";

import dayjs from "dayjs";

interface ExpecialConfigCell {
  resource: string;
  value: unknown;
  result: RulesStatus & RuleDTO;
  secondaryValue?: string | Date;
}

// TODO: check another abstraction for especial cases
export const EspecialConfigCell = ({
  resource,
  value,
  result,
  secondaryValue,
}: ExpecialConfigCell) => {
  if (resource === "isActiveSonar")
    return <Typography>{value ? "Activo" : "Inactivo"}</Typography>;

  if (resource === "htmlDesc")
    return (
      <GenericPopover
        icon={<Visibility />}
        popoverBody={
          <PopOverDetails
            tags={[result.severity, result.type]}
            isActive={result.isActive}
            ruleTitle={result.name}
            ruleDescription={result.htmlDesc}
          />
        }
      />
    );

  if (resource === "updated_at")
    return Math.abs(dayjs(String(value)).diff(secondaryValue, "hours")) > 6 ? (
      <TimeAgo date={String(value)} />
    ) : (
      <Typography align="left">--</Typography>
    );

  return <UncontrolledSwitch initialStatus={Boolean(value)} id={result.id} />;
};
