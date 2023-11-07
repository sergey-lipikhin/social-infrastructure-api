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
  .matches(
    /^[\p{Script=Cyrillic}\s'-]+$/u,
    'Ім\'я повинно містити лише кирилицю, апостроф, тире та пробіли',
  )
  .min(2, 'Ім\'я повинно містити принаймні 2 символи')
  .max(50, 'Ім\'я може містити максимум 50 символів')
  .required('Ім\'я обов\'язкове');

const surnameSchema = Yup
  .string()
  .matches(
    /^[\p{Script=Cyrillic}\s'-]+$/u,
    'Прізвище повинно містити лише кирилицю, апостроф, тире та пробіли',
  )
  .min(2, 'Прізвище повинно містити принаймні 2 символи')
  .max(50, 'Прізвище може містити максимум 50 символів')
  .required('Прізвище обов\'язкове');

export const registrationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  surname: surnameSchema,
});

export const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});
