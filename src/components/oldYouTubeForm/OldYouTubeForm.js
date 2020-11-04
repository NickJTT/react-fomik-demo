import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function OldYouTubeForm() {
    const initialValues = { name: '', email: '', channel: '' };

    const onSubmit = values => {
        console.log('Form data', values);
    }

    // Use the method matches(regex) after the method string() for regex
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
                <input type = 'text' id = 'name' name = 'name' value = { formik.values.name } onChange = { formik.handleChange } onBlur = { formik.handleBlur }/>
            </div>
            { formik.touched.name && formik.errors.name ? <p>{ formik.errors.name }</p> : null }
            <div>
                <label htmlFor = 'email'>E-Mail</label>
                <input type = 'text' id = 'email' name = 'email' value = { formik.values.email } onChange = { formik.handleChange } onBlur = { formik.handleBlur }/>
            </div>
            { formik.touched.email && formik.errors.email ? <p>{ formik.errors.email }</p> : null }
            <div>
                <label htmlFor = 'channel'>Channel</label>
                <input type = 'text' id = 'channel' name = 'channel' value = { formik.values.channel } onChange = { formik.handleChange } onBlur = { formik.handleBlur }/>
            </div>
            { formik.touched.channel && formik.errors.channel ? <p>{ formik.errors.channel }</p> : null }
            <button type = 'submit'>Submit</button>
        </form>
    );
}
