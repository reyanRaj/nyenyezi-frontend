import React from "react";
import Card from "../components/Card";

export default function AdminDashboardHomePage() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white font-['Baloo 2'] ">
        Hi Admin ,
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 font-['Poppins']">
        You are provided an sidebar, uses it to navigate between different
        sections.
        <br /> Check out this quick access bar
      </p>
      <div className="flex gap-4 flex-wrap">
        <Card
          text="Want to add user"
          desc="On this page you can add new users to your website"
          linkText="Click here"
          linkUrl="/admin/user/add"
        />
        <Card
          text="Want to add customer"
          desc="On this page you can add new customers to your website"
          linkText="Click here"
          linkUrl="/admin/costumer/add"
        />
        <Card
          text="Want to add product"
          desc="On this page you can add new products to your website"
          linkText="Click here"
          linkUrl="/admin/product/add"
        />
      </div>
    </div>
  );
}
