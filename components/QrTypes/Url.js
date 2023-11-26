import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Input from "../macros/Input";
import Toggle from "../macros/Toggle";

function Url() {
  const { formState, getValues } = useFormContext();

  return (
    <div className="flex-column gap-2">
      <Input
        placeholder="example (https://www.google.com)"
        inputLabel="Enter URL"
        classNames="h-[45px]"
        name="url"
      />
      <span className="row-flex items-center gap-4">
        <Toggle name="updateAndTrack" />
        <p className="text-sm text-t1">Update & Track Later.</p>
      </span>
    </div>
  );
}

export default Url;
