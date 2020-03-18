import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import MainLayout from "./User/Layout";
import RegistrationForm from "./User/Register";
import RegisterView from "./User/RegisterView";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <RegisterView/>
      </MainLayout>
    </div>
  );
}

export default App;
