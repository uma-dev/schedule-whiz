import Navbar from "../common/Navbar";
import MainPanel from "../common/MainPanel";
import SecondaryPanel from "../common/SecondaryPanel";
import Grid from "../common/Grid";

const Dashboard = () => {

  const theEmployeeId = 60;

  return (
    <Grid>
      <Navbar />
      <MainPanel employeeId={theEmployeeId} />
      <SecondaryPanel />
    </Grid>
  );
};

export default Dashboard;
