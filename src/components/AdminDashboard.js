import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Graph from "./Graph";

function AdminDashboard({ token, userId }) {
  const [data, setData] = useState("");
  console.log("data", data);
  const [error, setError] = useState("");
  const [chargeCustomers, setChargeCustomers] = useState(data.charge_customers);
  const [amounts, setAmounts] = useState({
    category_6: 0,
    category_7: 0,
    category_8: 0,
    category_9: 0,
    category_10: 0,
  });

  useEffect(() => {
    if (data && data.amount) {
      setAmounts({
        category_6: data.amount.category_6 || 0,
        category_7: data.amount.category_7 || 0,
        category_8: data.amount.category_8 || 0,
        category_9: data.amount.category_9 || 0,
        category_10: data.amount.category_10 || 0,
      });
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://stg.dhunjam.in/account/admin/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === 200 && data.response === "Success") {
          setData(data.data);
        } else {
          setError("Failed to load data");
        }
      } catch (error) {
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [token, userId]);

  const handleSave = async () => {
    try {
      const response = await fetch("https://stg.dhunjam.in/account/admin/4", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`, // Uncomment if your API requires authentication
        },
        body: JSON.stringify({ amount: amounts }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }

      const data = await response.json();

      if (data.response === "Success") {
        console.log("Prices updated successfully:", data.data.amount);
        // Assuming the response has the updated amounts, we set the state with these new amounts.
        setAmounts(data.data.amount);
      } else {
        // Handle any server-specified errors here
        console.error("Failed to update prices:", data);
      }
    } catch (error) {
      // Handle errors such as network issues here
      console.error("Error during save:", error);
    }
  };

  const handleInputChange = (category, value) => {
    setAmounts((prevAmounts) => ({ ...prevAmounts, [category]: value }));
  };

  return (
    <div className="admin-dashboard">
      <h1>
        {data.name}, {data.location} on DhunJam
      </h1>

      <div className="radio-group">
        <label style={{ display: "flex", gap: "100px" }}>
          Do you want to charge your
          <br /> customers for requesting songs?
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name="charge"
              value="yes"
              checked={chargeCustomers}
              onChange={() => setChargeCustomers(true)}
              style={{ marginRight: "15px" }}
            />
            Yes
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name="charge"
              value="no"
              checked={!chargeCustomers}
              onChange={() => setChargeCustomers(false)}
              style={{ marginRight: "15px" }}
            />
            No
          </div>
        </label>
      </div>

      <div className="amount-group">
        <div className="customSong">
          Custom song request amount:
          <input
            type="number"
            value={amounts.category_6}
            onChange={(e) => handleInputChange("category_6", e.target.value)}
          />
        </div>
        <div className="regularSong">
          Regular song request amounts,
          <br />
          from high to low-
          <div style={{ display: "flex" }}>
            {data?.amount &&
              Object.keys(amounts).map((category, index) => (
                <div key={index} className="amount">
                  {amounts[category]}
                </div>
              ))}
          </div>
        </div>
      </div>

      <Graph amounts={amounts} />

      <button onClick={handleSave}>Save</button>

      {/* ... graph component ... */}
    </div>
  );
}

export default AdminDashboard;
