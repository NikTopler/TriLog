import { Dispatch, SetStateAction, useState } from "react";
import { TabsConfig, DropdownItem } from "../../DropdownLayout";
import styles from "../../dropdown-layout.module.scss";

interface DropdownTabsProps extends TabsConfig {
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

function DropdownTabs({ tabs, groupTitle, setDropdownOpen }: DropdownTabsProps) {

    const [dropdownTabs, setDropdownTabs] = useState<TabsConfig['tabs']>(tabs);

    const tabNames = Object.keys(dropdownTabs);
    const activeTab = Object.keys(dropdownTabs).find((key: string) => dropdownTabs[key].active);

    const onTabChange = (tab: string) => {

        const tempObj = { ...dropdownTabs };

        Object.keys(tempObj).forEach((key: string) => {
            tempObj[key].active = false;
        });

        tempObj[tab].active = true;

        setDropdownTabs(tempObj);
       
    }

    const handleOnItemClick = (e: any, item: DropdownItem) => {
        e.stopPropagation();

        if (item.handleOnClick) {
            item.handleOnClick(item.name);
        }
        setDropdownOpen(false);
    }

    return (
        <>
            <header className={styles['dropdown-container__content__header']}>
                <div className={styles['dropdown-container__content__header__tabs-container']}>
                    {tabNames.map((key: any, idx: number) => (
                        <div
                            key={idx}
                            onClick={() => onTabChange(dropdownTabs[key].name.toLowerCase())}
                            className={styles['dropdown-container__content__header__tabs-container--tab-container']}
                            data-active={dropdownTabs[key].active}>
                            <span>{dropdownTabs[key].name}</span>
                        </div>
                    ))}
                </div>
            </header>
            <div className={styles['dropdown-container__content--main']}>
                {groupTitle && (
                    <section className={styles['dropdown-container__content--main__group-title']}>
                        <span>
                            {groupTitle}
                        </span>
                    </section>
                )}
                <div className={styles['dropdown-container__content--main__buttons-container']}>
                    {dropdownTabs[activeTab as string].items.map((item: DropdownItem, idx: number) => (
                        <div
                            key={idx}
                            className={styles['dropdown-container__content--main__buttons-container--button-container']}
                            onClick={(e) => handleOnItemClick(e, item)}>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}

export default DropdownTabs;