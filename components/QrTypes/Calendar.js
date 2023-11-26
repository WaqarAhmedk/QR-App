import React from "react";
import Input from "../macros/Input";
import Toggle from "../macros/Toggle";
function Calendar() {
  return (
    <div className="flex-column gap-6">
      <Input
        placeholder="https://www.yoursite.com/"
        inputLabel="Google Calendar URL"
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

export default Calendar;
