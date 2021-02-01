import React, { useState, useEffect } from "react";

const Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const queryReport = () => {//(1)
      window.gapi.client
        .request({
          path: "/v4/reports:batchGet",
          root: "https://analyticsreporting.googleapis.com/",
          method: "POST",
          body: {
            reportRequests: [
              {
                viewId: "216933178", //enter your view ID here
                dateRanges: [
                  {
                    startDate: "2020-04-28",
                    endDate: "2021-01-30",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:newUsers",
                  },
                ],
                dimensions: [
                  {
                    name: "ga:date",
                  },
                ],
              },
            ],
          },
        })
        .then(displayResults, console.error.bind(console));
    };

    const displayResults = (response) => {//(2)
      const queryResult = response.result.reports[0].data.rows;
      let totalUsers = 0;
      const result = queryResult.map((row) => {
        const dateSting = row.dimensions[0];
        const ddosAttackUsers = dateSting === "20200526" ? "9080" : 0;
        // const ddosAttackUsers = 0;
        const formattedDate = `${dateSting.substring(0, 4)}
        -${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
        totalUsers += row.metrics[0].values[0] - ddosAttackUsers;
        return {
          date: formattedDate,
          visits: row.metrics[0].values[0] - ddosAttackUsers,
        };
      });
      console.log(totalUsers);
      setData(result);
    };

    queryReport();
  }, []);

  return data.map((row) => (
    <div key={row.date}>{`${row.date}: ${row.visits} visits`}</div> //(3)
  ));
};

export default Report;