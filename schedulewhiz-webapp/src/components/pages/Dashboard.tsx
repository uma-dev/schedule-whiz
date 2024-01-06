import Navbar from "../common/Navbar";
import MainPanel from "../common/MainPanel";
import SecondaryPanel from "../common/SecondaryPanel";
import Grid from "../common/Grid";

const Dashboard = () => {
  return (
    <Grid>
      <Navbar />
      <MainPanel />
      <SecondaryPanel />
    </Grid>
  );
};

export default Dashboard;
