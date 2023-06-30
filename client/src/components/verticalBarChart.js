import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const App = (props) => {
  // Sample data
  const data = [
    { name: "Pineapple", qty: parseInt(props.data[0]) },
    { name: "Bananna", qty: parseInt(props.data[1]) },
    { name: "Apple", qty: parseInt(props.data[2]) },
    { name: "Orange", qty: parseInt(props.data[3]) },
  ];

  return (
    <BarChart width={700} height={400} data={data}>
      <Bar dataKey="qty" fill="#4caf4f" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </BarChart>
  );
};

export default App;
