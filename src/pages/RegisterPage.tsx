import { registerRequest } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

function RegisterPage() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = async (values: { name: string, email: string; password: string}) => {
        const { name, email, password } = values;

        try {
            await registerRequest(name, email, password);
            navigate('/'); 
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>

                            <div>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>

                            <div>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Register
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-600 text-sm">
                                    ¿Ya tienes una cuenta?{' '}
                                    <Link to="/" className="text-blue-500 hover:underline">
                                        Login aqui
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default RegisterPage;
