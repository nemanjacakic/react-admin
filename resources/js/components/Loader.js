import React from "react";

import Grid from "@material-ui/core/Grid";
import CircularProgres from "@material-ui/core/CircularProgress";

export default function Loader() {

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="vh-100"
    >
      <Grid item>
        <CircularProgres size={200} />
      </Grid>
    </Grid>
  );
}
