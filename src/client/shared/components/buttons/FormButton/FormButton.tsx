import styles from "./FormButton.module.scss"

interface FormButtonProps {
    text: string;
    disabled: boolean;
    handleOnClick: () => void;
}

function FormButton({ text, disabled, handleOnClick }: FormButtonProps) {

    return (
        <div className={styles['form__button-container']}>
            <button
                className={styles['form__button']}
                onClick={handleOnClick}
                disabled={disabled}>
                <span>{text}</span>
            </button>
        </div>
    );

}

export default FormButton;