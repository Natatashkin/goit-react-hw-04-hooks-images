import React from 'react';
import { Bars } from 'react-loader-spinner';
import styled from 'styled-components';

const PreLoader = styled.div`
  width: 80px;
  height: 80px;
  fill: ${({ theme: { colors } }) => colors.blue};
  margin-left: auto;
  margin-right: auto;
`;

const Loader = () => {
  return (
    <PreLoader>
      <Bars color={'inherit'} height={60} width={60} />
    </PreLoader>
  );
};

export default Loader;
