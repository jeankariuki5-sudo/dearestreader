import React from 'react';
import styled, { keyframes } from 'styled-components';

// 1. Define the "Glow" animation
const glowPulse = keyframes`
  0% {
    text-shadow: 0 0 8px rgba(212, 175, 55, 0.2);
    transform: translateY(0px);
  }
  50% {
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.2);
    transform: translateY(-5px);
  }
  100% {
    text-shadow: 0 0 8px rgba(212, 175, 55, 0.2);
    transform: translateY(0px);
  }
`;

// 2. Create the Styled Components
const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #fdfcf0; /* Optional: Creamy book-page background */
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 4rem);
  color: #2c3e50;
  margin: 0;
  cursor: default;
  animation: ${glowPulse} 4s infinite ease-in-out;
  transition: color 0.3s ease;

  &:hover {
    color: #1a252f; /* Deepens slightly on hover */
  }
`;

const Subtitle = styled.span`
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 1.2rem;
  color: #5d6d7e;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

// 3. The Main Component
const BookHeader = () => {
    return (
        <>
            {/* Google Fonts Import (Can also be put in your index.html) */}
            <style>
                @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
            </style>

            <HeaderWrapper>
                <Title>WELCOME MY DEAREST READER</Title>
                <Subtitle>"For the stories that stay with you long after the final page."</Subtitle>
            </HeaderWrapper>
        </>
    );
};

export default BookHeader;