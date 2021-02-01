import React, { useState, useEffect } from "react";

const Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const queryReport = () => {//(1)
      window.gapi.client
        .request({
          path: "/v4/reports:batchGet",
          // path: "/v3/data/realtime",
          root: "https://analyticsreporting.googleapis.com/",
          // root: "https://www.googleapis.com/analytics/",
          method: "POST",
          body: {
            reportRequests: [
              {
                viewId: "216933178", //enter your view ID here
                samplingLevel:  "LARGE",
                dateRanges: [
                  {
                    startDate: "2020-06-01",
                    endDate: "2021-01-30",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:users",
                  },
                ],
                dimensions: [
                  {name: "ga:segment" }
                ],
                // metricFilterClauses: [{
                //   filters: [{
                //       metricName: "ga:date",
                //       operator: "EXACT",
                //       comparisonValue: "2020-05-26"
                //   }],
                // }]
                segments: [{
                  segmentId: "gaid::sH-dFLkAT22sJW2CFdl6tQ"
                }]
              },
            ],
          },
        })
        .then(displayResults, console.error.bind(console));
    };

    const displayResults = (response) => {//(2)
      const queryResult = response.result.reports[0].data.rows;
      console.log(queryResult[0].metrics[0].values[0]);
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