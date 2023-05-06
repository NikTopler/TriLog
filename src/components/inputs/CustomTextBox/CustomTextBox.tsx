import { useEffect, useRef } from 'react';
import Input from '@mui/joy/Input';
import { SxProps } from '@mui/material';
import { SpecialKey } from '@/types';

interface TextBoxProps {
    value: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    isFocused?: boolean;
    style?: SxProps;
    startDecorator?: JSX.Element;
    endDecorator?: JSX.Element;
    handleInputChange?: (value: string) => void;
    handleSpecialKeyClick?: (type: SpecialKey) => void;
    handleInputFocusChange?: (isFocused: boolean) => void;
}

function CustomTextBox({ value, placeholder, type, isFocused, style, startDecorator, endDecorator, handleInputChange, handleSpecialKeyClick, handleInputFocusChange }: TextBoxProps) {

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {

        if (!inputRef.current || isFocused === undefined) {
            return;
        }

        if (isFocused) {
            inputRef.current.querySelector('input')?.focus();
        } else {
            inputRef.current.querySelector('input')?.blur();
        }

    }, [value, isFocused]);

    const onInputChange = (value: string) => {
        if (handleInputChange) {
            handleInputChange(value);
        }
    }

    return (
        <Input
            ref={inputRef}
            sx={style}
            placeholder={placeholder ?? ""}
            value={value}
            type={type ?? "text"}
            onChange={({ target: { value } }) => onInputChange(value)}
            onFocus={() => {
                if (handleInputFocusChange) {
                    handleInputFocusChange(true);
                }
            }}
            onBlur={() => {
                if (handleInputFocusChange) {
                    handleInputFocusChange(false);
                }
            }}
            onKeyDown={({ key }) => {
                if (key.length > 1 && handleSpecialKeyClick) {
                    handleSpecialKeyClick(key as SpecialKey);
                }
            }}
            startDecorator={startDecorator ?? null}
            endDecorator={endDecorator ?? null}
        />
    );

}

export default CustomTextBox;