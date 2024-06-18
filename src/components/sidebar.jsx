import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaCog, FaUsers, FaStar, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = ({ sidebarOpen }) => {
    const [activeItem, setActiveItem] = useState('Equipments'); // Default active item

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            height: '100vh',
            overflowY: 'auto',
            display: sidebarOpen ? 'block' : 'none',
            position: 'fixed',
            top: '56px', // Adjust according to your header height
            left: 0,
            width: '16.666%', // Approximately 2 columns width
            zIndex: 1000 // Ensure sidebar appears above other content
        }}>
            <Nav className="flex-column">
                <Nav.Link
                    href="#"
                    className={activeItem === 'Equipments' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => handleItemClick('Equipments')}
                >
                    <FaHome className="mr-2" /> Equipments
                </Nav.Link>
                <Nav.Link
                    href="#"
                    className={activeItem === 'Users' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => handleItemClick('Users')}
                >
                    <FaCog className="mr-2" /> Users
                </Nav.Link>
                <Nav.Link
                    href="#"
                    className={activeItem === 'Reviews' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => handleItemClick('Reviews')}
                >
                    <FaUsers className="mr-2" /> Reviews
                </Nav.Link>
                <Nav.Link
                    href="#"
                    className={activeItem === 'Profile' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => handleItemClick('Profile')}
                >
                    <FaStar className="mr-2" /> Profile
                </Nav.Link>
                <Nav.Link
                    href="#"
                    className={activeItem === 'Settings' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => handleItemClick('Settings')}
                >
                    <FaUser className="mr-2" /> Settings
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
