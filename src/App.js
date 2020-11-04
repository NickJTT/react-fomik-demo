import React from 'react';
import style from './App.module.css';
import ResetFormData from './components/resetFormData/ResetFormData';
// import LoadSavedData from './components/loadSavedData/LoadSavedData';
// import SubmitButtonDisable from './components/submitButtonDisable/SubmitButtonDisable';
// import ManualTriggerFormik from './components/manualTriggerFormik/ManualTriggerFormik';
// import YouTubeFormik from './components/youTubeFormik/YouTubeFormik';

export default function App() {
  return (
    <div className = { style.app }>
      <ResetFormData/>
    </div>
  );
}
