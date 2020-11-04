import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function YouTubeForm() {
    const initialValues = { name: '', email: '', channel: '' };

    const onSubmit = values => {
        console.log('Form data', values);
    }

    // Use the method .matches(regex) after the method .string() for regex
    const validationSchema = Yup.object({
        name: Yup.string().required('Required!'),
        email: Yup.string().email('Invalid E-Mail format!').required('Required!'),
        channel: Yup.string().required('Required!')
    });

    const formik = useFormik({ initialValues, onSubmit, validationSchema });

    console.log('Visited fields: ', formik.touched);

    return (
        <form onSubmit = { formik.handleSubmit }>
            <div>
                <label htmlFor = 'name'>Name</label>
                <input type = 'text' id = 'name' name = 'name' { ...formik.getFieldProps('name') }/>
            </div>
            { formik.touched.name && formik.errors.name ? <p>{ formik.errors.name }</p> : null }
            <div>
                <label htmlFor = 'email'>E-Mail</label>
                <input type = 'text' id = 'email' name = 'email' { ...formik.getFieldProps('email') }/>
            </div>
            { formik.touched.email && formik.errors.email ? <p>{ formik.errors.email }</p> : null }
            <div>
                <label htmlFor = 'channel'>Channel</label>
                <input type = 'text' id = 'channel' name = 'channel' { ...formik.getFieldProps('channel') }/>
            </div>
            { formik.touched.channel && formik.errors.channel ? <p>{ formik.errors.channel }</p> : null }
            <button type = 'submit'>Submit</button>
        </form>
    );
}
