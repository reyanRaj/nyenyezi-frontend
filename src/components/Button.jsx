import React from "react";

export default function Button(props) {
  return (
    <div>
      <button
        type="button"
        class={`text-white bg-${props.color}-700 hover:bg-${props.color}-800 focus:ring-4 focus:ring-${props.color}-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-${props.color}-600 dark:hover:bg-${props.color}-700 focus:outline-none dark:focus:ring-${props.color}-800`}
        onClick={props.onClick}
        style={props.style}
      >
        {props.text}
      </button>
    </div>
  );
}
