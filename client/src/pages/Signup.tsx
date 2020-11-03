import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthService } from '../services';

// forms
import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { signupSchema } from '../helper';
import { CustomInput } from '../components/CustomInput';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { toggleModal } from '../redux/actions/modalActions';

const Signup: React.FC = () => {
  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { showModal } = useSelector((state: RootStore) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) history.push('/');
  }, []);

  const api = new AuthService();
  const history = useHistory();

  const signup = (values: SignupFormValues) => {
    const { email, password } = values;

    api
      .signup(email, password)
      .then(res => history.push('/login'))
      .catch(err => dispatch(toggleModal(!showModal, err.response.data.error.message, 'Error Signing Up')));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_2: '',
    },
    onSubmit: values => signup(values),
    validationSchema: signupSchema,
  });

  return (
    <Modal className='modal-form' show={true} backdrop={false} animation={false} centered>
      <Modal.Body className='py-4'>
        <Form onSubmit={formik.handleSubmit}>
          <h3 className='text-center pb-2 text-dark'>SIGNUP</h3>

          <CustomInput
            id='email'
            type='email'
            label='Email Address'
            name='username'
            error={formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <CustomInput
            id='password'
            type='password'
            label='Password'
            name='new-password'
            error={formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <CustomInput
            id='password_2'
            type='password'
            label='Confirm Password'
            error={formik.errors.password_2}
            value={formik.values.password_2}
            onChange={formik.handleChange}
          />

          <Button className='w-100 mb-3' variant='dark' type='submit'>
            Signup
          </Button>

          <div className='text-center'>
            <Link className='text-dark' to='/login'>
              Already a user? Login here.
            </Link>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
