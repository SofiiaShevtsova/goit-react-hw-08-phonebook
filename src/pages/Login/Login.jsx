import { Formik } from 'formik';
import * as Yup from 'yup';
import StyleList from 'components/ComponentStyles/PhonebookStyles';

import Section from 'components/Section/Section';

const { FormStyle, FieldStyles, BtnStyle, ErrorMessageStyle } = StyleList;

const SignupSchema = Yup.object().shape({
  email: Yup.mixed().test({
    name: 'email',
    params: { a: 'test', b: 'qwe' },
    message: 'It is not a email',
    test: value => {
      return /\w+[^\s]\w+@\w+\.\w{1,5}/.test(value);
    },
  }),

  password: Yup.string()
    .min(2, 'Must min 2')
    .max(25, 'Must max 25')
    .required('Required'),
});


const Login = () => {
    return (
    <>
      <Section title={"Log in..."}>
        <Formik
          initialValues={{
            email: ``,
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            actions.resetForm();
            return {
              email: values.email.trim(),
              password: values.password.trim(),
            };
          }}
        >
          {props => (
            <FormStyle>
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

              <BtnStyle type="submit">Log in...</BtnStyle>
            </FormStyle>
          )}
        </Formik>
      </Section>
    </>
    )
}

export default Login