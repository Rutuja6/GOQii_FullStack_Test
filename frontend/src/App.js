import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";

const App = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', password: '', dob: '' });
    const [editingId, setEditingId] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    // Sorting state
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api.php');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/api.php?id=${editingId}`, form);
            } else {
                await axios.post('/api.php', form);
            }
            setForm({ name: '', email: '', password: '', dob: '' });
            setEditingId(null);
            fetchUsers();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (user) => {
        setForm(user);
        setEditingId(user.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api.php?id=${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Sort users based on column and direction
    const sortedUsers = [...users].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key]?.toString().toLowerCase() || '';
            const bValue = b[sortConfig.key]?.toString().toLowerCase() || '';

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Filter users based on search query
    const filteredUsers = sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get paginated users
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleSort = (key) => {
        setSortConfig((prevState) => ({
            key,
            direction: prevState.key === key && prevState.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    return (
        <div>
            {/* Form Section */}
            <div className="form-container">
                <h1>User Management</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            value={form.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">{editingId ? 'Update User' : 'Add User'}</button>
                </form>
            </div>

            {/* Table Section */}
            <div className="table-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <h2>User List</h2>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                            <th onClick={() => handleSort('email')}>Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                            <th onClick={() => handleSort('dob')}>Date of Birth {sortConfig.key === 'dob' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.dob}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(user)}>
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            className={currentPage === page ? 'active' : ''}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
