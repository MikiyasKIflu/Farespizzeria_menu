import React, { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTION_CATEGORIES_ID } from '../lib/appwrite';
import { Query } from 'appwrite';

const MenuForm = ({ itemToEdit, onSave, onCancel }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name_en: '',
        name_local: '',
        name_om: '',
        name_so: '',
        price: '',
        category: '',
        is_available: true,
        image_url: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await databases.listDocuments(DATABASE_ID, COLLECTION_CATEGORIES_ID, [
                    Query.orderAsc('display_order'),
                    Query.limit(100)
                ]);
                const cats = res.documents.map(c => c.name);
                setCategories(cats);
                if (!itemToEdit && cats.length > 0) {
                    setFormData(prev => ({ ...prev, category: cats[0] }));
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, [itemToEdit]);

    useEffect(() => {
        if (itemToEdit) {
            setFormData({
                name_en: itemToEdit.name_en,
                name_local: itemToEdit.name_local,
                name_om: itemToEdit.name_om || '',
                name_so: itemToEdit.name_so || '',
                price: itemToEdit.price,
                category: itemToEdit.category,
                is_available: itemToEdit.is_available !== undefined ? itemToEdit.is_available : true,
                image_url: itemToEdit.image_url || ''
            });
        }
    }, [itemToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure price is a number for Appwrite
        const submissionData = {
            ...formData,
            price: parseFloat(formData.price)
        };
        onSave(submissionData);
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{itemToEdit ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                        <label>Name (English)</label>
                        <input
                            name="name_en"
                            value={formData.name_en}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Name (Amharic/Local)</label>
                        <input
                            name="name_local"
                            value={formData.name_local}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                        <label>Name (Afan Oromo)</label>
                        <input
                            name="name_om"
                            value={formData.name_om}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Optional"
                        />
                    </div>
                    <div className="form-group">
                        <label>Name (Somali)</label>
                        <input
                            name="name_so"
                            value={formData.name_so}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Optional"
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                        <label>Price (ETB)</label>
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="form-input"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Image URL (Optional)</label>
                    <input
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="https://..."
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn">
                        {itemToEdit ? 'Update Item' : 'Add Item'}
                    </button>
                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MenuForm;
