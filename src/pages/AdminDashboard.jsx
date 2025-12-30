import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, TABLES, isSupabaseConfigured } from '../lib/supabase';
import Navbar from '../components/Navbar';
import MenuForm from '../components/MenuForm';
import { Edit, Trash2, Plus, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const AdminDashboard = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryLocalName, setNewCategoryLocalName] = useState('');
    const [newCategoryOmName, setNewCategoryOmName] = useState('');
    const [newCategorySoName, setNewCategorySoName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState('');
    const [isManagingCategories, setIsManagingCategories] = useState(false);

    useEffect(() => {
        if (isSupabaseConfigured) {
            fetchAll();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        await Promise.all([fetchMenuItems(), fetchCategories()]);
        setLoading(false);
    };

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from(TABLES.CATEGORIES)
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setCategories(data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName) return;
        try {
            const { error } = await supabase
                .from(TABLES.CATEGORIES)
                .insert([{
                    name: newCategoryName,
                    name_local: newCategoryLocalName || null,
                    name_om: newCategoryOmName || null,
                    name_so: newCategorySoName || null,
                    image_url: newCategoryImage || '',
                    display_order: categories.length + 1
                }]);

            if (error) throw error;

            setNewCategoryName('');
            setNewCategoryLocalName('');
            setNewCategoryOmName('');
            setNewCategorySoName('');
            setNewCategoryImage('');
            fetchCategories();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteCategory = async (id, name) => {
        const inUse = menuItems.some(item => item.category === name);
        if (inUse) {
            alert('Cannot delete category that is currently in use by menu items.');
            return;
        }

        try {
            const { error } = await supabase
                .from(TABLES.CATEGORIES)
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchCategories();
        } catch (error) {
            alert(error.message);
        }
    };

    const fetchMenuItems = async () => {
        try {
            const { data, error } = await supabase
                .from(TABLES.MENU_ITEMS)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMenuItems(data || []);
        } catch (error) {
            console.error('Error fetching menu:', error);
            alert('Error loading menu items');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (itemData) => {
        try {
            if (itemToEdit) {
                // Update
                const { error } = await supabase
                    .from(TABLES.MENU_ITEMS)
                    .update(itemData)
                    .eq('id', itemToEdit.id);

                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from(TABLES.MENU_ITEMS)
                    .insert([itemData]);

                if (error) throw error;
            }

            setIsEditing(false);
            setItemToEdit(null);
            fetchMenuItems();
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Error saving item: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        console.log('Deleting item with ID:', id);

        try {
            const { error } = await supabase
                .from(TABLES.MENU_ITEMS)
                .delete()
                .eq('id', id);

            if (error) throw error;
            console.log('Delete successful!');
            await fetchMenuItems();
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item: ' + (error.message || 'Unknown error'));
        }
    };

    const toggleAvailability = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from(TABLES.MENU_ITEMS)
                .update({ is_available: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchMenuItems();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="container">
            <Navbar />

            <div style={{ marginBottom: '2rem' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem' }}>
                    <ArrowLeft size={18} /> Back to Menu
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Menu Management</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => setIsManagingCategories(!isManagingCategories)}
                            className="btn btn-secondary"
                            style={{ width: 'auto' }}
                        >
                            {isManagingCategories ? 'Hide Categories' : 'Manage Categories'}
                        </button>
                        {!isEditing && (
                            <button onClick={() => setIsEditing(true)} className="btn" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Plus size={18} /> Add New Item
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isManagingCategories && (
                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', border: '2px solid var(--primary)' }}>
                    <h3>Manage Categories</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
                        <input
                            className="form-input"
                            placeholder="Category name..."
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <input
                            className="form-input"
                            placeholder="Amharic Name..."
                            value={newCategoryLocalName}
                            onChange={(e) => setNewCategoryLocalName(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                className="form-input"
                                placeholder="Oromo Name..."
                                value={newCategoryOmName}
                                onChange={(e) => setNewCategoryOmName(e.target.value)}
                            />
                            <input
                                className="form-input"
                                placeholder="Somali Name..."
                                value={newCategorySoName}
                                onChange={(e) => setNewCategorySoName(e.target.value)}
                            />
                        </div>
                        <input
                            className="form-input"
                            placeholder="Image URL (optional)..."
                            value={newCategoryImage}
                            onChange={(e) => setNewCategoryImage(e.target.value)}
                        />
                        <button onClick={handleAddCategory} className="btn" style={{ width: 'auto' }}>Add Category</button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {categories.map(cat => (
                            <div key={cat.id} style={{
                                background: 'var(--secondary)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: '1px solid var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span>{cat.name} {cat.name_local ? `(${cat.name_local})` : ''}</span>
                                <button
                                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                    style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: 0 }}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isEditing && (
                <MenuForm
                    itemToEdit={itemToEdit}
                    onSave={handleSave}
                    onCancel={() => { setIsEditing(false); setItemToEdit(null); }}
                />
            )}

            <div className="glass-panel" style={{ overflowX: 'auto', padding: '1rem' }}>
                <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Category</th>
                            <th style={{ padding: '1rem' }}>Price</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                                <td data-label="Name" style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 'bold' }}>{item.name_en}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.name_local}</div>
                                </td>
                                <td data-label="Category" style={{ padding: '1rem' }}>{item.category}</td>
                                <td data-label="Price" style={{ padding: '1rem' }}>{item.price} ETB</td>
                                <td data-label="Status" style={{ padding: '1rem' }}>
                                    <button
                                        onClick={() => toggleAvailability(item.id, item.is_available)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: item.is_available ? 'var(--success)' : 'var(--text-muted)'
                                        }}
                                    >
                                        {item.is_available ? <Eye size={18} /> : <EyeOff size={18} />}
                                        {item.is_available ? 'Active' : 'Hidden'}
                                    </button>
                                </td>
                                <td data-label="Actions" style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button
                                            onClick={() => { setItemToEdit(item); setIsEditing(true); }}
                                            className="btn btn-secondary"
                                            style={{ padding: '0.5rem', width: 'auto' }}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="btn btn-danger"
                                            style={{ padding: '0.5rem', width: 'auto' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {menuItems.length === 0 && !loading && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No items found. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
