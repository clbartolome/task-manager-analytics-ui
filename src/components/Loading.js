import React from 'react';
import styled, { keyframes } from 'styled-components';

const load = keyframes`
  0% { left: -40%; }
  100% { left: 100%; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1e1e2f;
`;

const LoadingBarContainer = styled.div`
  width: 80%;
  max-width: 400px;
  height: 10px;
  background-color: #333;
  overflow: hidden;
  border-radius: 5px;
  margin-top: 20px;
`;

const LoadingBar = styled.div`
  width: 40%;
  height: 100%;
  background-color: #61dafb;
  position: relative;
  animation: ${load} 1.5s infinite;
`;

const LoadingText = styled.p`
  color: #61dafb;
  font-size: 1.5em;
  margin-top: 20px;
`;

const Loading = () => (
  <LoadingContainer>
    <LoadingText>Loading...</LoadingText>
    <LoadingBarContainer>
      <LoadingBar />
    </LoadingBarContainer>
  </LoadingContainer>
);

export default Loading;