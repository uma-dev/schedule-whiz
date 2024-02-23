import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Employee } from "../../types/Employee";
import useApiPrivate from "../../hooks/useApiPrivate";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[] | null>();
  const apiPrivate = useApiPrivate();

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
        console.log("The response");
        console.log(response.data);
        isMounted && setEmployees(response.data);
      } catch (err) {
        console.error(err);
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
