import Navbar from "../common/Navbar";
import MainPanel from "../common/MainPanel";
import SecondaryPanel from "../common/SecondaryPanel";
import Grid from "../common/Grid";

const Dashboard = () => {
  const theEmployeeId = 6;
  return (
    <Grid>
      <Navbar />
      <MainPanel employeeId={theEmployeeId} />
      <SecondaryPanel employeeId={theEmployeeId} />
    </Grid>
  );
};

export default Dashboard;
