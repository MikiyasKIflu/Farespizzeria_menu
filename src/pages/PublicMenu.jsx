import React, { useEffect, useState } from 'react';
import { supabase, TABLES, isSupabaseConfigured } from '../lib/supabase';
import MenuItem from '../components/MenuItem';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import AOS from 'aos';
import { Search, Grid } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { cafeConfig } from '../config';


const PublicMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { language, setLanguage } = useLanguage();

    // Ensure we have a valid translation object, fallback to 'en' if language is invalid
    const t = translations[language] || translations.en || {};

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });

        if (!isSupabaseConfigured) {
            setLoading(false);
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        if (!isSupabaseConfigured) return;
        try {
            const [itemsRes, catsRes] = await Promise.all([
                supabase
                    .from(TABLES.MENU_ITEMS)
                    .select('*')
                    .order('category', { ascending: true })
                    .order('name_en', { ascending: true }),
                supabase
                    .from(TABLES.CATEGORIES)
                    .select('*, name_local')
                    .order('display_order', { ascending: true })
            ]);

            if (itemsRes.error) throw itemsRes.error;
            if (catsRes.error) throw catsRes.error;

            setMenuItems(Array.isArray(itemsRes.data) ? itemsRes.data : []);
            setCategoriesList(Array.isArray(catsRes.data) ? catsRes.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMenuItems([]);
            setCategoriesList([]);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { id: 'All', label: t.all || 'All' },
        ...(Array.isArray(categoriesList) ? categoriesList : [])
            .filter(c => c && c.name) // Filter out categories with null/undefined names
            .map(c => {
                const categoryKey = c.name.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
                // Use name_local if available and language is not English, otherwise use translation or fallback to English name
                const translatedLabel = (language !== 'en' && c.name_local)
                    ? c.name_local
                    : (t[categoryKey] || c.name);

                return {
                    id: c.name,
                    label: translatedLabel
                };
            })
    ];

    const filteredItems = (Array.isArray(menuItems) ? menuItems : []).filter(item => {
        if (!item) return false;
        const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
        const matchesSearch = (item.name_en?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (item.name_local || '').includes(searchTerm) ||
            (item.name_om?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (item.name_so?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Group items by category if "All" is selected for better UX
    const groupedItems = categoryFilter === 'All'
        ? categories.filter(c => c.id !== 'All').reduce((acc, cat) => {
            acc[cat.id] = {
                items: menuItems.filter(item => item.category === cat.id),
                label: cat.label
            };
            return acc;
        }, {})
        : { [categoryFilter]: { items: filteredItems, label: categories.find(c => c.id === categoryFilter)?.label } };

    return (
        <div className="container">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} language={language} />

            {/* Navbar with Menu Toggle */}
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

            {/* Action Row: Search & Layout Toggle */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                alignItems: 'center'
            }} data-aos="fade-down">
                <div style={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <input
                        type="text"
                        placeholder={t.search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem 0.8rem 2.8rem',
                            borderRadius: '25px',
                            border: '1px solid #ddd',
                            fontSize: '1rem',
                            outline: 'none',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                    />
                    <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem' }} />
                </div>
                <button className="btn-secondary" style={{
                    padding: '0.8rem',
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Grid size={20} />
                </button>
            </div>

            {/* Language Selection (Simplified Tabs) */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                paddingBottom: '0.5rem'
            }}>
                {[
                    { code: 'en', label: 'English' },
                    { code: 'am', label: 'Amharic' },
                    { code: 'om', label: 'Oromo' },
                    { code: 'so', label: 'Somali' }
                ].map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        style={{
                            padding: '0.5rem 1.25rem',
                            borderRadius: '20px',
                            background: language === lang.code ? 'var(--primary)' : '#eee',
                            color: language === lang.code ? 'white' : 'var(--text-muted)',
                            border: 'none',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>

            {/* Category Filter - Sticky Horizontal */}
            <div
                style={{
                    position: 'sticky',
                    top: '80px', // Adjusted for Navbar
                    background: 'var(--bg-light)',
                    paddingTop: '0.5rem',
                    paddingBottom: '1rem',
                    zIndex: 90,
                    marginLeft: '-1.5rem',
                    marginRight: '-1.5rem',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                    }}
                    className="hide-scrollbar"
                >
                    {categories.map((cat) => {
                        // Find the actual category data to get image_url
                        const categoryData = categoriesList.find(c => c.name === cat.id);
                        const hasImage = categoryData?.image_url;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setCategoryFilter(cat.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'none',
                                    border: 'none',
                                    opacity: categoryFilter === cat.id ? 1 : 0.6,
                                    transition: 'opacity 0.3s',
                                    minWidth: '80px',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '15px',
                                    background: hasImage ? 'transparent' : (categoryFilter === cat.id ? 'var(--primary)' : '#ccc'),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: categoryFilter === cat.id ? '0 4px 10px rgba(246, 7, 66, 0.3)' : 'none',
                                    overflow: 'hidden'
                                }}>
                                    {hasImage ? (
                                        <img
                                            src={categoryData.image_url}
                                            alt={cat.label}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '15px'
                                            }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{cat.label.charAt(0)}</span>
                                    )}
                                </div>
                                <span style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: categoryFilter === cat.id ? 'var(--primary)' : 'var(--text-main)',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {cat.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {(!isSupabaseConfigured) ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#e74c3c' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Configuration Error</h2>
                    <p>Supabase connection is missing.</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
                        Please create a <code>.env</code> file with your <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>.
                    </p>
                </div>
            ) : loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>☕</div>
                    {t.loading}
                </div>
            ) : (
                <div id="menu-section" className="menu-section" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem',
                    paddingBottom: '4rem',
                    marginTop: '1rem' // Reduced top margin
                }}>
                    {Object.entries(groupedItems).map(([id, data]) => (
                        data.items.length > 0 && (
                            <div key={id} data-aos="fade-up">
                                <h2 style={{
                                    marginBottom: '1rem',
                                    color: 'var(--primary)', // Match header color
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold'
                                }}>
                                    {data.label}
                                </h2>
                                <div className="menu-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '2.5rem',
                                    justifyContent: 'center'
                                }}>
                                    {data.items.map((item, i) => (
                                        <div key={item.id} data-aos="fade-up" data-aos-delay={i * 50}>
                                            <MenuItem item={item} language={language} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Feedback Section */}
            <div id="feedback-section" className="feedback-section" style={{
                marginTop: '4rem',
                backgroundColor: 'var(--primary)',
                padding: '4rem 2rem',
                borderRadius: 'var(--border-radius)',
                textAlign: 'center',
                color: 'white',
                boxShadow: '0 20px 40px rgba(47, 133, 90, 0.2)'
            }} data-aos="fade-up">
                <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>{t.feedback}</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>We value your opinion! Tell us how we're doing.</p>
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <textarea
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        placeholder="Write your feedback here..."
                        style={{
                            width: '100%',
                            height: '100px',
                            padding: '1rem',
                            borderRadius: '10px',
                            border: 'none',
                            marginBottom: '1rem',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        className="btn"
                        style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '0.8rem 2rem', fontWeight: 'bold' }}
                        onClick={() => {
                            if (!feedbackMessage) return alert('Please enter your feedback first.');
                            const msg = encodeURIComponent(`Feedback: ${feedbackMessage}`);
                            window.open(`https://wa.me/${cafeConfig.whatsappNumber}?text=${msg}`, '_blank');
                            setFeedbackMessage('');
                        }}
                    >
                        Send Feedback
                    </button>
                </div>
            </div>

            {/* Review Section */}
            <div id="review-section" className="review-section" style={{
                marginTop: '4rem',
                backgroundColor: 'var(--accent)',
                padding: '4rem 2rem',
                borderRadius: 'var(--border-radius)',
                textAlign: 'center',
                color: 'white',
                boxShadow: '0 20px 40px rgba(212, 163, 115, 0.2)'
            }} data-aos="fade-up">
                <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>{t.review}</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>Love our food? Leave us a review!</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem', color: '#f1c40f' }}>
                    ★★★★★
                </div>
                <button
                    className="btn"
                    style={{ background: 'white', color: 'var(--accent)', border: 'none', padding: '0.8rem 2rem', fontWeight: 'bold' }}
                    onClick={() => {
                        const msg = encodeURIComponent("I'd like to leave a review: 5/5 stars! 🌟");
                        window.open(`https://wa.me/${cafeConfig.whatsappNumber}?text=${msg}`, '_blank');
                    }}
                >
                    Write a Review
                </button>
            </div>

            <div id="contact-section" style={{
                marginTop: '4rem',
                backgroundColor: '#1a1a1a', // Distinct dark footer
                padding: '4rem 2rem',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 -10px 30px rgba(0,0,0,0.1)'
            }}>
                <Footer language={language} />
            </div>
        </div>
    );
};

export default PublicMenu;
