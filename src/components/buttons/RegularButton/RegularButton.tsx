import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import { CSSProperties } from "react";

interface RegularButtonProps {
    id?: string;
    text?: string;
    style?: CSSProperties;
    startDecorator?: JSX.Element;
    endDecorator?: JSX.Element;
    disabled?: boolean;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    variant?: 'default' | 'ghost' | 'link' | 'outline' | 'secondary';
    loading?: boolean;
    className?: string;
    handleOnClick?: () => void;
}

function RegularButton({ id, text, style, startDecorator, endDecorator, disabled, size, variant, loading, className, handleOnClick }: RegularButtonProps) {

    const ButtonContent = () => {

        if (loading) {
            return (
                <div>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                </div>
            );
        }

        return (
            <>
                <span>{startDecorator}</span>
                {text || ""}
                <span>{endDecorator}</span>
            </>
        );

    }

    return (
        <Button
            id={id || ""}
            className={className || ""}
            variant={variant || 'default'}
            size={size || 'default'}
            disabled={disabled || false}
            style={style || {}}
            onClick={() => handleOnClick && handleOnClick()}
        >
            {ButtonContent()}
        </Button>
    );

}

export default RegularButton;