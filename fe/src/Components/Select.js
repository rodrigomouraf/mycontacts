import styled from 'styled-components';

export default styled.select`
    width: 100%;
    height: 52px;
    border: 2px solid #FFF;
    outline: none;
    background: #FFF;
    padding: 0 16px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    font-size: 14px;
    border-radius: 4px;
    transition: border-color 0.2s ease-in;
    appearance: none;

    &:focus{
        border: 2px solid ${({ theme }) => theme.colors.primary.main};
    }
`;
