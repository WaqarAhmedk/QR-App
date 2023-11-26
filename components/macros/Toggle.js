import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import SigninModal from "./SigninModal";

function Toggle({ name }) {
  const token = localStorage.getItem("token");
  const { setValue } = useFormContext();
  const [showModal, setShowModal] = useState(false);
  const { watch } = useFormContext();
  const currentValue = watch(name || "updateAndTrack");
  const [open, setOpen] = useState(false);
  

  const handleToggle = (event) => {
    const value = event.target.checked;
    if (!token) {
      {
        setOpen(true)
      return
    }
    } else {
      // if (name) {
      //   setValue(name, value);
      // } else {
      //   setValue("updateAndTrack", value);
      // }
    }
  };

  return (
    <div  onClick={() => {
      if (!token) {
        {
          setOpen(true)
      }
    }}}>
    {open && <SigninModal open={open} setOpen={setOpen}/>}
      <label className="switch scale-75">
        <input type="checkbox" disabled={!token} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Toggle;
