import React from "react";
import Input from "../macros/Input";
import Toggle from "../macros/Toggle";
import InputUpload from "../macros/InputUpload";
const DownloadPdf = () => {
  return (
    <div className="flex-column gap-7">
      <div className="flex-column gap-3">
        <Input
          placeholder="https://www.yoursite.com/pdf"
          inputLabel="PDF URL"
          name="url"
        />
        <InputUpload
          text="Upload PDF"
          label="Upload File"
          fileType={{ "application/pdf": [".pdf"] }}
          variant="pdf"
          description="Max 5 mb"
          name="url"
          maxFiles={1}
        />
      </div>
      <span className="row-flex items-center gap-4">
        <Toggle name="updateAndTrack" />
        <p className="text-sm text-t1">Update & Track Later.</p>
      </span>
    </div>
  );
};

export default DownloadPdf;
