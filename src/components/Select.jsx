import React from "react";

export default function Select(props) {
  return (
    <div className="my-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      >
        {props.options.map((option, index) => {
          if (!index == 0) {
            return (
              <option value={index} key={index}>
                {option.text}
              </option>
            );
          } else {
            return (
              <option value={index} key={index} defaultChecked>
                {option.text}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
}
