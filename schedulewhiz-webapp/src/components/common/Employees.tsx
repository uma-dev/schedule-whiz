import { useState, useEffect } from "react";
import { Employee } from "../../types/Employee";
import useApiPrivate from "../../hooks/useApiPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[] | null>();
  const apiPrivate = useApiPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // only run in  component load, empty dependency array
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        // Uses the tokens expiration proof, aka apiPrivate, to get employees
        const response = await apiPrivate.get("/api/employees", {
          signal: controller.signal,
        });
        isMounted && setEmployees(response.data);
      } catch (err) {
        // if the refresh token expires
        // go to authentication and save the route to return back where you where
        console.error(err);
        navigate("/authentication", {
          state: { from: location },
          replace: true,
        });
      }
    };

    getEmployees();

    // Clean up function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Employees List </h2>
      {employees?.length ? (
        <ul>
          {employees.map((employee, i) => (
            <li key={i}>{employee?.email}</li>
          ))}
        </ul>
      ) : (
        <p>No employees to display</p>
      )}
    </article>
  );
};

export default Employees;
