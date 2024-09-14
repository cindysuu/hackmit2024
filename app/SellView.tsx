import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SellView: React.FC = () => {
    const [price, setPrice] = useState('');
    const [gems, setGems] = useState(0);

    const handleButtonClick = (value: string) => {
        setPrice(prevPrice => prevPrice + value);
    };

    const handleClear = () => {
        setPrice('');
    };

    const handleGoToSuccess = (navigation: any) => {
        navigation.navigate('SuccessView');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Enter Price</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={`$${price}`}
                    readOnly
                    style={{ fontSize: '24px', padding: '10px', width: '200px' }}
                />
            </div>
            <p>Gems: {gems}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '150px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleButtonClick(num.toString())}
                        style={{ fontSize: '24px', padding: '10px' }}
                    >
                        {num}
                    </button>
                ))}
                <button onClick={handleClear} style={{ fontSize: '24px', padding: '10px' }}>
                    Clear
                </button>
            </div>
            <Button title="Sell" onPress={() => handleSellPress(navigation)} />
        </div>
    );
};

export default SellView;