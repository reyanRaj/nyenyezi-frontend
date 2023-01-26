import React from "react";
import Card from "../components/Card";
import { useAuth } from "../hooks/useAuth";

export default function DashboardHomePage() {
  let { user } = useAuth();
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Hi {user.username} ,
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        You are provided an sidebar, uses it to navigate between different
        sections.
        <br /> Check out this quick access bar
      </p>
      <div className="flex gap-4 flex-wrap">
        <Card
          text="Want to add new transaction"
          desc="On this page you can add new transactions"
          linkText="Click here"
          linkUrl="/transactions/add"
        />
        <Card
          text="Want to see your transactions"
          desc="On this page you can see all the transactions saved by you"
          linkText="Click here"
          linkUrl="/transactions"
        />
      </div>
    </div>
  );
}
