import React from "react";
import Input from "../macros/Input";
import Toggle from "../macros/Toggle";

const BusinessCard = () => {
  return (
    <div className="flex-column gap-4">
      <div className="flex-column gap-3">
        <div className="flex-column gap-3 500:row-flex 500:justify-between w-full 500:gap-3 lg:gap-10">
          <Input
            name="firstName"
            inputLabel="First Name"
            placeholder="First Name"
            required={true}
          />
          <Input
            name="lastName"
            inputLabel="Last Name"
            placeholder="Last Name"
            required={true}
          />
        </div>
        <Input
          name="email"
          placeholder="Enter Email Subject "
          inputLabel="Email"
        />
        <div className="flex-column gap-3 500:row-flex 500:justify-between w-full 500:gap-3 lg:gap-10">
          <Input name="workPhone" inputLabel="Work Phone" placeholder="Work" />
          <Input
            name="mobilePhone"
            inputLabel="Mobile"
            placeholder="Mobile"
            required={true}
          />
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-90">
          Company
        </label>
        <div className="flex-column gap-3 500:row-flex 500:justify-between w-full 500:gap-3 lg:gap-10">
          <Input name="companyName" placeholder="Name" />
          <Input name="jobTitle" placeholder="Job" />
        </div>
      </div>
      <Input name="street" placeholder="Street" inputLabel="Street" />

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-90">
          City
        </label>
        <div className="flex-column gap-3 500:row-flex 500:justify-between w-full 500:gap-3 lg:gap-10">
          <Input name="city" placeholder="City" />
          <Input name="zipcode" placeholder="Zipcode" />
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-90">
          Country
        </label>
        <div className="flex-column gap-3 500:row-flex 500:justify-between w-full 500:gap-3 lg:gap-10">
          <Input name="country" placeholder="Country" />
          <Input name="state" placeholder="State" />
        </div>
      </div>
      <Input
        name="website"
        placeholder="www.website.com"
        inputLabel="Website"
      />
      <Input
        name="summary"
        type="textarea"
        placeholder="Summary"
        inputLabel="Summary"
      />

      <div className="flex items-center gap-2">
        <span className="row-flex items-center gap-4">
          <Toggle name="updateAndTrack" />
          <p className="text-sm text-t1">Update & Track Later.</p>
        </span>
      </div>
    </div>
  );
};

export default BusinessCard;
