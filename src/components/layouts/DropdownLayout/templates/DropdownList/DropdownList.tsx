import { Dispatch, SetStateAction } from "react";
import { ListConfig, DropdownItem } from "../../DropdownLayout";
import styles from "../../dropdown-layout.module.scss";

interface ListTemplateProps extends ListConfig {
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

function DropdownList({ groupTitle, list, setDropdownOpen }: ListTemplateProps) {

    const handleOnItemClick = (e: any, item: DropdownItem) => {
        e.stopPropagation();
        if (item.handleOnClick) {
            item.handleOnClick(item.name);
        }
        setDropdownOpen(false);
    }

    return (
        <div className={styles['dropdown-container__content--main']}>
            {groupTitle && (
                <section className={styles['dropdown-container__content--main__group-title']}>
                    <span>
                        {groupTitle}
                    </span>
                </section>
            )}
            <div className={styles['dropdown-container__content--main__buttons-container']}>
                {list.map((item: DropdownItem, idx: number) => (
                    <div
                        key={idx}
                        className={styles['dropdown-container__content--main__buttons-container--button-container']}
                        onClick={(e) => handleOnItemClick(e, item)}>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default DropdownList;