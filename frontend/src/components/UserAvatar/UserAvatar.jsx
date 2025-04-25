// ForTest/frontend/src/components/UserAvatar/UserAvatar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserAvatar.css'; 
import ProfilePopup from '../ProfilePopup/ProfilePopup';
import UserInfoPopup from '../UserInfoPopup/UserInfoPopup'; // 新增导入

const UserAvatar = ({ onLogout }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const customerId = localStorage.getItem('customerId');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isUserInfoPopupOpen, setIsUserInfoPopupOpen] = useState(false); // 新增状态

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('customerId');
        navigate('/');
        if (onLogout) {
            onLogout();
        }
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        setIsProfilePopupOpen(true);
    };

    const handleUserInfoClick = () => {
        setIsDropdownOpen(false);
        setIsUserInfoPopupOpen(true); // 点击用户名时打开用户资料弹窗
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeProfilePopup = () => {
        setIsProfilePopupOpen(false);
    };

    const closeUserInfoPopup = () => {
        setIsUserInfoPopupOpen(false); // 关闭用户资料弹窗
    };

    return (
        <div className="user-avatar" onClick={toggleDropdown}>
            <span>{username}</span>
            <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
                <button onClick={handleUserInfoClick}>{username}</button> {/* 下拉列表中的用户名按钮 */}
                <hr />
                <button onClick={handleProfileClick}>Profile</button>
                <button onClick={handleLogout}>Sign Out</button>
            </div>
            <ProfilePopup
                isOpen={isProfilePopupOpen}
                onClose={closeProfilePopup}
                customerId={customerId}
            />
            <UserInfoPopup
                isOpen={isUserInfoPopupOpen}
                onClose={closeUserInfoPopup}
                customerId={customerId}
            /> 
        </div>
    );
};

export default UserAvatar;