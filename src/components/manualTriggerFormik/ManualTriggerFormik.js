import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import TextError from '../textError/TextError';

// If you feel that a particular field is independent from the others then FastField can be used instead of Field

export default function ManualTriggerFormik() {
    const style = { color: 'red' };

    const initialValues = { name: '', email: '', channel: '', comments: '', address: '', social: { facebook: '', twitter: '' }, phoneNumbers: ['', ''], phNumbers: [''] };

    const onSubmit = values => { console.log('Form data', values); }

    // Use the method .matches(regex) after the method .string() for regex
    const validationSchema = Yup.object({
        name: Yup.string().required('Required!'),
        email: Yup.string().email('Invalid E-Mail format!').required('Required!'),
        channel: Yup.string().required('Required!'),
        comments: Yup.string().required('Required!')
    });

    const validateComments = value => {
        return value ? null : 'Required!';
    }

    return (
        // validateOnChange = { true } and validateOnBlur = { true } by default
        <Formik initialValues = { initialValues } validationSchema = { validationSchema } onSubmit = { onSubmit }>
            {
                formik =>
                    <Form>
                <div>
                    <label htmlFor = 'name'>Name</label>
                    <Field type = 'text' id = 'name' name = 'name'/>
                    <ErrorMessage name = 'name' component = { TextError }/>
                </div>
                <div>
                    <label htmlFor = 'email'>E-Mail</label>
                    <Field type = 'text' id = 'email' name = 'email'/>
                    <ErrorMessage name = 'email'>
                        {
                            errorMessage => <div style = { style }>{ errorMessage }</div>
                        }
                    </ErrorMessage>
                </div>
                <div>
                    <label htmlFor = 'channel'>Channel</label>
                    <Field type = 'text' id = 'channel' name = 'channel' placeholder = 'Youtube Channel name'/>
                    <ErrorMessage name = 'channel'/>
                </div>
                <div>
                    <label htmlFor = 'comments'>Comments</label>
                    <Field as = 'textarea' type = 'text' id = 'comments' name = 'comments' validate = { validateComments }/>
                    <ErrorMessage name = 'comments'/>
                </div>
                <div>
                    <label htmlFor = 'address'>Address</label>
                    <Field name = 'address'>
                        {
                            props => {
                                // const { field, form, meta } = props;
                                const { field, meta } = props;
                                return (
                                    <div>
                                        <input type = 'text' id = 'address' { ...field }/>
                                        { meta.touched && meta.error ? <p>{ meta.error }</p> : null }
                                    </div>
                                );
                            }
                        }
                    </Field>
                </div>
                <div>
                    <label htmlFor = 'facebook'>Facebook Profile</label>
                    <Field id = 'facebook' type = 'text' name = 'social.facebook'/>
                </div>
                <div>
                    <label htmlFor = 'twitter'>Twitter Profile</label>
                    <Field id = 'twitter' type = 'text' name = 'social.twitter'/>
                </div>
                <div>
                    <label htmlFor = 'primaryPhone'>Primary Phone Number</label>
                    <Field id = 'primaryPhone' type = 'text' name = 'phoneNumbers[0]'/>
                </div>
                <div>
                    <label htmlFor = 'secondaryPhone'>Secondary Phone Number</label>
                    <Field id = 'secondaryPhone' type = 'text' name = 'phoneNumbers[1]'/>
                </div>
                <div>
                    <label>List of phone numbers:</label>
                    <FieldArray name = 'phNumbers'>
                        {
                            fieldArrayProps => {
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { phNumbers } = values;
                                return (
                                  <div>
                                    {
                                      phNumbers.map((phNumber, index) => (
                                        <div key = { index }>
                                          <Field name = { `phNumbers[${ index }]` }/>
                                          { index > 0 && (<button type = 'button' onClick = { () => remove(index) }>-</button>) }
                                          <button type = 'button' onClick = { () => push('') }>+</button>
                                        </div>
                                      ))
                                    }
                                  </div>
                                );
                            }
                        }  
                    </FieldArray>
                </div>
                <button type = 'button' onClick = { () => formik.validateField('comments') }>Validate Comments</button>
                <button type = 'button' onClick = { formik.validateForm }>Validate All</button>
                <button type = 'button' onClick = { () => formik.setFieldTouched('comments') }>Touch Comments</button>
                <button type = 'button' onClick = { () => formik.setTouched({ name: true, email: true, channel: true, comments: true }) }>Touch All</button>
                <button type = 'submit'>Submit</button>
            </Form>
            }
        </Formik>
    );
}
