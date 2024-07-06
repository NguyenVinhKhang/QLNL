import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './Profile.scss';
import { getProfile } from '../../services/userService';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        listSubProfile: '',
        listSuperProfile: '',
        listDevice: '',
        accountId: ''
    });
    const user = useSelector((state)=>state.user)
  
    useEffect(() => {

    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // const handleSave = async () => {
    //     console.log('Saving profile with data:', profileData);
    //     try {
    //         const response = await updateProfile(profileData);
    //         console.log('Update response:', response);
    //         setProfile(response.data);
    //         setShowPopup(false);
    //     } catch (error) {
    //         console.error('Error editing profile:', error);
    //     }
    // };

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!profile) {
    //     return <div>Profile not found</div>;
    // }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p><strong>ID:</strong> {user?.id}</p>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Phone Number:</strong> {user?.phoneNumber}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p><strong>Address:</strong> {user?.address || 'N/A'}</p>
            <button className="edit-button" onClick={() => setShowPopup(true)}>Edit Profile</button>

            <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                value={profileData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                name="address"
                                value={profileData.address}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPopup(false)}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Profile;
