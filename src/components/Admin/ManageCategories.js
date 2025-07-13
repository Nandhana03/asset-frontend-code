import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import '../../styles/ManageCategories.css';

const ManageCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [alert, setAlert] = useState({ type: '', message: '' });

  const [categories, setCategories] = useState([
    { id: 1, name: 'GADGETS', description: 'Computers and other electronic devices' },
    { id: 2, name: 'FURNITURE', description: 'Other furniture and fixtures' },
    { id: 3, name: 'PERIPHERALS', description: 'Keyboards, headphones, webcams, etc' },
    { id: 4, name: 'STORAGE DEVICES', description: 'Devices for storing digital data' }
  ]);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrUpdate = () => {
    const { name, description } = newCategory;

    if (!name.trim() || !description.trim()) {
      setAlert({ type: 'error', message: 'Both fields are required.' });
      return;
    }

    const isDuplicate = categories.some(cat =>
      cat.name.toLowerCase() === name.toLowerCase() && cat.id !== editId
    );

    if (isDuplicate) {
      setAlert({ type: 'error', message: 'Category already exists.' });
      return;
    }

    if (isEditMode) {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editId ? { ...cat, name: name.trim().toUpperCase(), description: description.trim() } : cat
        )
      );
      setAlert({ type: 'success', message: 'Category updated successfully!' });
    } else {
      const newEntry = {
        id: Date.now(),
        name: name.trim().toUpperCase(),
        description: description.trim()
      };
      setCategories(prev => [...prev, newEntry]);
      setAlert({ type: 'success', message: 'Category added successfully!' });
    }

    setShowModal(false);
    setNewCategory({ name: '', description: '' });
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (category) => {
    setNewCategory({ name: category.name, description: category.description });
    setEditId(category.id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setAlert({ type: 'success', message: 'Category deleted successfully!' });
  };

  return (
    <div className="manage-categories">
      {/* Alert */}
      {alert.message && (
        <div className={`alert-box ${alert.type}`}>
          <span>{alert.message}</span>
          <button onClick={() => setAlert({ type: '', message: '' })}><FiX /></button>
        </div>
      )}

      <div className="header-row">
        <h2>Asset <span>Categories</span></h2>
        <button className="add-btn" onClick={() => {
          setShowModal(true);
          setIsEditMode(false);
          setNewCategory({ name: '', description: '' });
        }}>
          <FiPlus /> Add Category
        </button>
      </div>

      <input
        className="search-bar"
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="category-list">
        {filteredCategories.map(category => (
          <div className="category-card" key={category.id}>
            <div className="category-text">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <div className="category-actions">
              <button className="edit-btn" onClick={() => handleEdit(category)}><FiEdit2 /></button>
              <button className="delete-btn" onClick={() => handleDelete(category.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{isEditMode ? 'Edit Category' : 'Add New Category'}</h3>
              <button onClick={() => {
                setShowModal(false);
                setIsEditMode(false);
                setNewCategory({ name: '', description: '' });
              }}><FiX /></button>
            </div>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <div className="modal-actions">
              <button className="submit" onClick={handleAddOrUpdate}>
                {isEditMode ? 'Update' : 'Submit'}
              </button>
              <button className="cancel" onClick={() => {
                setShowModal(false);
                setIsEditMode(false);
                setNewCategory({ name: '', description: '' });
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
 