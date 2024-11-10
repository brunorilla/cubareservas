import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from '@pages/home/Home.page';
import {Login} from '@pages/login/Login.page';
import {Register} from '@pages/register/Register.page';
import {AppLayout} from '@components/layout/layout.component';
import {Dashboard} from "@pages/dashboard/Dashboard.page";
import {ReservationsPage} from "@pages/reservation/Reservation.page";

const App: React.FC = () => {
    return (
        <Router>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path='/dashboard' element={<Dashboard/>} />
                    <Route path="/reservations" element={<ReservationsPage />} />
                </Routes>
            </AppLayout>
        </Router>
    );
};

export default App;