import * as yup from "yup";

const LandingPageSchema = yup.object().shape({
  mapLocation: yup.object().shape({
    lat: yup.string(),
    lng: yup.string(),
  }),
  mapUrl: yup
    .string()
    .url("Invalid URL format")
    .required("Map URL is required"),

  updateAndTrack: yup.boolean(),
});

export default LandingPageSchema;
