import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Shield, Menu, Sun, Moon } from 'lucide-react';
import { getLogo } from '../utils/imageMapper';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { cafeConfig } from '../config';

const Navbar = ({ onMenuClick }) => {
    const { user, signOut } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'var(--bg-light)', // Match body for seamless look, or white
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={onMenuClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>
                    <Menu size={28} />
                </button>
            </div>

            <Link to="/" style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <span style={{
                    color: 'var(--primary)',
                    fontWeight: '800',
                    fontSize: '1.5rem',
                    letterSpacing: '-0.5px',
                    fontFamily: '"Playfair Display", serif',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.2'
                }}>
                    {cafeConfig.name}
                </span>
                <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-main)',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: '500'
                }}>
                    {cafeConfig.slogan}
                </span>
            </Link>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-main)',
                    }}
                >
                    {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                </button>

                {user && (
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        title="Logout"
                    >
                        <LogOut size={22} />
                    </button>
                )}

                {user ? (
                    <Link to="/admin" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
                        <Shield size={22} />
                    </Link>
                ) : (
                    <Link to="/login" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
                        <Shield size={22} />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
