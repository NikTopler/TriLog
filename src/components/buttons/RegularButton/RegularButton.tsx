import { Button } from "@mui/joy";
import { SxProps } from "@mui/material";

interface RegularButtonProps {
    id?: string;
    text?: string;
    style?: SxProps;
    startDecorator?: JSX.Element;
    endDecorator?: JSX.Element;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'plain' | 'outlined' | 'soft' | 'solid';
    loading?: boolean;
    className?: string;
    handleOnClick?: () => void;
}


// TODO: Remove mui and implement own button
function RegularButton({ id, text, style, startDecorator, endDecorator, disabled, size, variant, loading, className, handleOnClick }: RegularButtonProps) {

    return (
        <Button
            id={id || ""}
            className={className || ""}
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