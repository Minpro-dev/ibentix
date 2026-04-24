import * as Yup from 'yup';

export const personalInfoSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  bio: Yup.string().max(300, 'Bio must be less than 300 characters'),
});

export const securitySchema = Yup.object({
  currentPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Required'),
});