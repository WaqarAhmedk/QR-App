import * as yup from 'yup';

const urlValidation = yup
  .object()
  .shape({
    url: yup.string().required('Url is required!'),
    updateAndTrack: yup.boolean(),
  })
  .required();

export default urlValidation;
