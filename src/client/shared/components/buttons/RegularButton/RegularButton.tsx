import { Button } from "@mui/joy";
import { SxProps } from "@mui/material";

interface RegularButtonProps {
    text?: string;
    style?: SxProps;
    startDecorator?: JSX.Element;
    endDecorator?: JSX.Element;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'plain' | 'outlined' | 'soft' | 'solid';
    loading?: boolean;
    handleOnClick?: () => void;
}

function RegularButton({ text, style, startDecorator, endDecorator, disabled, size, variant, loading, handleOnClick }: RegularButtonProps) {

    return (
        <Button
            sx={style}
            startDecorator={startDecorator || null}
            endDecorator={endDecorator || null}
            disabled={disabled || false}
            size={size || 'md'}
            variant={variant || 'soft'}
            loading={loading || false}
            onClick={() => handleOnClick && handleOnClick()}
        >
            {text || ""}
        </Button>
    );

}

export default RegularButton;