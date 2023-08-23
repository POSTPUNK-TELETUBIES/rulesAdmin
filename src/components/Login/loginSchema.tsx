import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Es necesario un correo electronico válido')
    .required('El correo es obligatorio'),
  password: yup
    .string()
    .min(6, 'Debe ser mínimo de 6 caracteres')
    .required('La contraseña es obligatoria'),
});
