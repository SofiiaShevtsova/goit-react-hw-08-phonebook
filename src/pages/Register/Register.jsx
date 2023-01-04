import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import StyleList from 'components/ComponentStyles/PhonebookStyles';
import { registerNewUser } from 'redux/operationPhonebook';

import Section from 'components/Section/Section';

const { FormStyle, FieldStyles, BtnStyle, ErrorMessageStyle } = StyleList;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Required'),

  email: Yup.mixed().test({
    name: 'email',
    params: { a: 'test', b: 'qwe' },
    message: 'It is not a email',
    test: value => {
      return /\w+[^\s]\w+@\w+\.\w{1,5}/.test(value);
    },
  }),

  password: Yup.string()
    .min(7, 'Must min 7')
    .max(25, 'Must max 25')
    .required('Required'),
});

const Register = () => {
      const dispatch = useDispatch();

  return (
    <>
      <Section title={"Register"}>
        <Formik
          initialValues={{
            name: ``,
            email: ``,
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
              actions.resetForm();
              const user ={
              name: values.name.trim(),
              email: values.email.trim(),
              password: values.password.trim(),
              }
              dispatch(registerNewUser(user))
          }}
        >
          {props => (
            <FormStyle>
              <label htmlFor="name">Name</label>
              <FieldStyles type="text" name="name" />
              {props.errors.name && (
                <ErrorMessageStyle id="feedback">
                  {props.errors.name}
                </ErrorMessageStyle>
              )}
              <label htmlFor="email">Email</label>
              <FieldStyles type="email" name="email" />
              {props.errors.email && (
                <ErrorMessageStyle id="feedback">
                  {props.errors.email}
                </ErrorMessageStyle>
              )}
              <label htmlFor="password">Password</label>
              <FieldStyles type="text" name="password" />
              {props.errors.password && (
                <ErrorMessageStyle id="feedback">
                  {props.errors.password}
                </ErrorMessageStyle>
              )}

              <BtnStyle type="submit">Register</BtnStyle>
            </FormStyle>
          )}
        </Formik>
      </Section>
    </>
  );
};
export default Register;
