import React from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, Send } from 'lucide-react';

import { translations } from '../utils/translations';

const Footer = ({ language = 'en' }) => {
    const t = translations[language];

    return (
        <footer style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '3rem 1.5rem 1.5rem',
            textAlign: 'center',
            borderRadius: '20px 20px 0 0',
            marginTop: '3rem'
        }} data-aos="fade-up">
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
                Fares Pizzeria
            </div>

            <div style={{ marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.8', opacity: 0.9 }}>
                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} /> {t.location}
                </p>
                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={16} /> 0943937667
                </p>
                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={16} /> 0915037315
                </p>
                <p style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} /> {t.hours}
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                {[Facebook, Instagram, Send].map((Icon, i) => (
                    <a key={i} href="#" style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        transition: 'transform 0.3s'
                    }}>
                        <Icon size={20} />
                    </a>
                ))}
                {/* TikTok usually requires specific icon or FontAwesome. Lucide doesn't have it generally. 
                    User asked to use "Icons", using Lucide placeholders for layout. */}
            </div>

            <div style={{ fontSize: '0.8rem', opacity: 0.8, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
                {t.powered_by}
            </div>
        </footer>
    );
};

export default Footer;
