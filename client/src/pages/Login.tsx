import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { AuthService } from '../services';

// forms
import { Form, Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { loginSchema } from '../helper';
import { CustomInput } from '../components/CustomInput';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/Store';
import { setAccessToken, setLoginStatus, setRefreshToken } from '../redux/actions/authActions';
import { toggleModal } from '../redux/actions/modalActions';

const Login: React.FC = () => {
  const api = new AuthService();
  const history = useHistory();

  // redux
  const { loginStatus } = useSelector((state: RootStore) => state.auth);
  const { showModal } = useSelector((state: RootStore) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus) history.push('/');
  }, []);

  const login = (values: LoginFormValues) => {
    const { email, password } = values;

    api
      .login(email, password)
      .then(res => {
        const accessToken = `Bearer ${res.data.accessToken}`;
        dispatch(setRefreshToken(res.data.refreshToken));
        dispatch(setAccessToken(accessToken));
        dispatch(setLoginStatus(true));

        axios.defaults.headers.common.Authorization = accessToken;
        history.push('/');
      })
      .catch(err => {
        console.log('err :>> ', err);
        console.log('err.response.data :>> ', err.response.data);
        dispatch(toggleModal(!showModal, err.response.data.error.message, 'Error Logging In'));
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => login(values),
    validationSchema: loginSchema,
  });

  return (
    <Modal className='modal-form' show={true} backdrop={false} animation={false} centered>
      <Modal.Body className='py-4'>
        <Form onSubmit={formik.handleSubmit}>
          <h3 className='text-center pb-2 text-dark'>LOGIN</h3>

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
            name='current-password'
            error={formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Button className='w-100 mb-3' variant='dark' type='submit'>
            Login
          </Button>

          <div className='text-center'>
            <Link className='text-dark' to='/signup'>
              Not enrolled? Sign up now.
            </Link>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
