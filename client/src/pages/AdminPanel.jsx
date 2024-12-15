import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AdminPanel = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
        }
    }, []);
    return (
        <div>
            admin
        </div>
    )
}

export default AdminPanel
