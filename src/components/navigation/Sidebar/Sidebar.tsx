import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import BalconyTwoToneIcon from '@mui/icons-material/BalconyTwoTone';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import { GroupDropdownLayout } from '@/components/layouts';
import styles from "./sidebar.module.scss";

function Sidebar() {

    return (
        <div className={styles['sidebar']}>

            <GroupDropdownLayout title="EVENTS">
                <div className={styles['sidebar--item']}>
                    <div className={styles['sidebar--item-icon']}>
                        <WorkspacesIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>Triathlons</span>
                </div>
            </GroupDropdownLayout>
            <GroupDropdownLayout title="LOCATIONS">
                <div className={styles['sidebar--item']}>
                    <div className={styles['sidebar--item-icon']}>
                        <PublicTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>Countries</span>
                </div>
                <div className={styles['sidebar--item']}>
                    <div className={styles['sidebar--item-icon']}>
                        <BalconyTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>States</span>
                </div>
                <div className={styles['sidebar--item']}>
                    <div className={styles['sidebar--item-icon']}>
                        <ApartmentTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>Cities</span>
                </div>
            </GroupDropdownLayout>

        </div>
    );

}

export default Sidebar;