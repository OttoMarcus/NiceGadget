import { useEffect, useState } from "react";
import axios from "axios";

const useFetchTotalsOfCategories = () => {
  const [phonesTotal, setPhonesTotal] = useState();
  const [tabletsTotal, setTabletsTotal] = useState();
  const [accessoriesTotal, setAccessoriesTotal] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/phones/total`)
      .then((response) => {
        setPhonesTotal(response.data.total);
      })
      .catch((error) => {
        console.error("There was a problem with fetching phones total:", error);
      });

    axios
      .get(`http://localhost:4000/api/tablets/total`)
      .then((response) => {
        setTabletsTotal(response.data.total);
      })
      .catch((error) => {
        console.error(
          "There was a problem with fetching tablets total:",
          error
        );
      });

    axios
      .get(`http://localhost:4000/api/accessories/total`)
      .then((response) => {
        setAccessoriesTotal(response.data.total);
      })
      .catch((error) => {
        console.error(
          "There was a problem with fetching accessories total:",
          error
        );
      });
  }, []);

  return { phonesTotal, tabletsTotal, accessoriesTotal };
};

export default useFetchTotalsOfCategories;
