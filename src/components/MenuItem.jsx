import React from 'react';
import { getCategoryImage } from '../utils/imageMapper';
import { translations } from '../utils/translations';
import { cafeConfig } from '../config';
import { MessageCircle } from 'lucide-react';

const MenuItem = ({ item, language = 'en' }) => {
    if (!item.is_available) return null;

    // Temporarily force local image mapper (which returns logo) as requested
    const imageSrc = getCategoryImage(item.category, item.name_en || item.name_local);


    const displayName = language === 'en'
        ? item.name_en
        : language === 'om'
            ? (item.name_om || item.name_en)
            : language === 'so'
                ? (item.name_so || item.name_en)
                : (item.name_local || item.name_en);

    const t = translations[language] || translations.en;

    const handleWhatsAppOrder = () => {
        const message = `${t.order_message}${displayName} (${item.price} ETB)`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${cafeConfig.whatsappNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transition: 'transform 0.3s ease',
            position: 'relative'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ position: 'relative', paddingTop: '75%' /* 4:3 Aspect Ratio */, overflow: 'hidden' }}>
                <img
                    src={imageSrc}
                    alt={displayName}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: 'var(--primary)',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        {displayName}
                    </h3>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <span style={{
                        fontSize: '1.1rem',
                        fontWeight: '800',
                        color: 'var(--text-main)'
                    }}>
                        {item.price} ETB
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
