import { useState } from 'react';
import { Sparkles, Trash2 } from 'lucide-react';

interface UIControlsProps {
    text: string;
    setText: (text: string) => void;
}

const UIControls: React.FC<UIControlsProps> = ({ text, setText }) => {
    const [inputValue, setInputValue] = useState(text);
    const [isHovered, setIsHovered] = useState(false);

    const handleCreate = () => setText(inputValue);
    const handleClear = () => {
        setInputValue('');
        setText('');
    };

    return (
        <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 24px',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            zIndex: 100
        }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                placeholder="ENTER TEXT"
                maxLength={15}
                style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    width: '180px',
                    padding: '8px 0',
                    fontFamily: 'Orbitron, monospace'
                }}
            />

            <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.2)' }} />

            <button
                onClick={handleCreate}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: isHovered
                        ? 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)'
                        : 'rgba(0, 212, 255, 0.15)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '25px',
                    color: isHovered ? '#000' : '#00d4ff',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: isHovered
                        ? '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(124, 58, 237, 0.3)'
                        : 'none',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase' as const
                }}
            >
                <span>Create</span>
                <Sparkles size={16} />
            </button>

            <button
                onClick={handleClear}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    background: 'rgba(255, 71, 87, 0.1)',
                    border: '1px solid rgba(255, 71, 87, 0.3)',
                    borderRadius: '50%',
                    color: '#ff4757',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = '#ff4757';
                    e.currentTarget.style.color = '#000';
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 71, 87, 0.5)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 71, 87, 0.1)';
                    e.currentTarget.style.color = '#ff4757';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
                title="Clear"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};

export default UIControls;
