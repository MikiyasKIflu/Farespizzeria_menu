import React from 'react';
import { X, Globe, Menu as MenuIcon, MessageSquare, Phone, Star, Facebook, Instagram, Send } from 'lucide-react';
// Note: Lucide doesn't have exact brands for TikTok/Telegram, using generic or closest matches.
// We can use FontAwesome classes if included in index.html, but let's stick to Lucide for consistency or text.
// Actually, user requested social ICONS. I will use text/lucide for now or simple placeholders if specific brand icons are critical.
// Use basic Lucide icons for main menu.

import { translations } from '../utils/translations';

import { cafeConfig } from '../config';

const Sidebar = ({ isOpen, onClose, language = 'en' }) => {
    const t = translations[language];

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 1500,
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                    transition: 'all 0.4s ease',
                    backdropFilter: 'blur(2px)'
                }}
            />

            {/* Sidebar */}
            <aside style={{
                position: 'fixed',
                top: 0,
                left: isOpen ? 0 : '-280px',
                width: '280px',
                height: '100vh',
                backgroundColor: '#121212',
                zIndex: 2000,
                transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '2px 0 15px rgba(0,0,0,0.5)',
                borderRight: '1px solid rgba(255,255,255,0.05)'
            }}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div style={{
                    backgroundColor: 'var(--primary)',
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'white',
                        borderRadius: '50%',
                        margin: '0 auto 10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        border: '4px solid rgba(255,255,255,0.2)'
                    }}>
                        <img
                            src={cafeConfig.logoPath}
                            alt={cafeConfig.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: '700', fontSize: '1.4rem', marginBottom: '0.2rem' }}>
                        {cafeConfig.name}
                    </div>
                    <div style={{ fontWeight: 500 }}>{t.welcome}</div>
                </div>

                {/* Menu Items */}
                <ul style={{ listStyle: 'none', padding: '2rem 1.5rem', flex: 1 }}>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); onClose(); }} style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.3s' }}>
                            <Globe size={20} color="var(--primary)" /> {t.website}
                        </a>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a href="#menu-section" onClick={(e) => { e.preventDefault(); document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.3s' }}>
                            <MenuIcon size={20} color="var(--primary)" /> {t.menu}
                        </a>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a href="#feedback-section" onClick={(e) => { e.preventDefault(); document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.3s' }}>
                            <MessageSquare size={20} color="var(--primary)" /> {t.feedback}
                        </a>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a href="#contact-section" onClick={(e) => { e.preventDefault(); document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.3s' }}>
                            <Phone size={20} color="var(--primary)" /> {t.contact_us}
                        </a>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <a href="#review-section" onClick={(e) => { e.preventDefault(); document.getElementById('review-section')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} style={{ textDecoration: 'none', color: 'var(--text-main)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.3s' }}>
                            <Star size={20} color="var(--primary)" /> {t.review}
                        </a>
                    </li>
                </ul>

                {/* Local Footer */}
                <div style={{
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        {/* Social Placeholders if Lucide doesn't have brands */}
                        <div style={{ width: 30, height: 30, background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}><Facebook size={14} /></div>
                        <div style={{ width: 30, height: 30, background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}><Instagram size={14} /></div>
                        <div style={{ width: 30, height: 30, background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}><Send size={14} /></div>
                    </div>
                    <small style={{ color: '#888' }}>{t.powered_by}</small>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
