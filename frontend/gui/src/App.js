import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import MainLayout from "./User/Layout";

import RegisterView from "./User/RegisterView";
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from "./routes";

function App() {
  return (
    <div className="App">
        <Router>
            <MainLayout>
                <BaseRouter />
            </MainLayout>
        </Router>

    </div>
  );
}

export default App;
