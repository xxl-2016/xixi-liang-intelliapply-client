import React, { useState } from "react";
import axios from "axios";

export default function JobSearch() {
  const [keywords, setKeywords] = useState("");
  const [jobList, setJobList] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:6060/jobs", {
        params: {
          keywords: keywords || "developer",
          //   locationId: "92000000",
          //   datePosted: "anyTime",
          //   sort: "mostRelevant",
        },
      });
      setJobList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Enter keywords"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {jobList.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}
