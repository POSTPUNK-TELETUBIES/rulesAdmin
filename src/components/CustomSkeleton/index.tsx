import { Box, Skeleton } from "@mui/material";

export const CustomSkeleton = () => {
  return (
    <Box width="100%" sx={{ display: "grid", placeContent: "center" }}>
      <Skeleton
        animation="pulse"
        variant="rectangular"
        width="80vw"
        height="50vh"
      />
    </Box>
  );
};
