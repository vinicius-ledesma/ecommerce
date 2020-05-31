import styled from 'styled-components';

export const Form = styled.form`
    max-width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Div = styled.div`
    width: 400px;
    display: flex;
    align-items: center;

    font-family: 'Roboto', sans-serif;
`;

export const Span = styled.span`
    color: #000000;
`;

export const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    border: 1px solid #b8b8b8;
    :focus {
        border: 1px solid #90a8de;
        outline: none;
    }
`;

export const Textarea = styled.textarea`
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;

    border: 1px solid #b8b8b8;
    
    :focus {
        border: 1px solid #90a8de;
        outline: none;
    }
`;

export const Button = styled.button`
    height: 30px;
    outline: nome;
    background: #999;
    border-radius: 5px;
    margin-top: 10px;
    border: 1px solid #888;

    :hover {
        background: #90a8de;
    }

`;

export const MessageSpan = styled.span`
    color: #000000;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;

export const ErrorSpan = styled.span`
    color: #791a1a;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;
