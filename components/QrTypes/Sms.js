import React from "react";
import Input from "../macros/Input";
import Textarea from "../macros/TextArea";
import Toggle from "../macros/Toggle";

const Sms = () => {
  return (
    <div className="flex-column gap-7">
      <div className="flex-column gap-3">
        <Input
          name="phone"
          placeholder="+61 1234567890"
          inputLabel="Mobile Number"
        />
        <Textarea
          name="message"
          placeholder="Your Message Here:"
          inputLabel="Message"
        />
      </div>
      <span className="row-flex items-center gap-4">
        <Toggle name="updateAndTrack" />
        <p className="text-sm text-t1">Update & Track Later.</p>
      </span>
    </div>
  );
};

export default Sms;
