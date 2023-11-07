import Yup from 'yup';

const emailSchema = Yup
  .string()
  .email('Некоректна електронна пошта')
  .required('Електронна пошта обов\'язкова');

const passwordSchema = Yup
  .string()
  .min(5, 'Пароль повинен містити принаймні 5 символів')
  .required('Пароль обов\'язковий');

const nameSchema = Yup
  .string()
  .min(2, 'Ім\'я повинно містити принаймні 2 символи')
  .max(50, 'Ім\'я може містити максимум 50 символів')
  .required('Ім\'я обов\'язкове');

export const registrationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});

export const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
