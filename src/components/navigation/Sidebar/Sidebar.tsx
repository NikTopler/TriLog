import { usePathname, useRouter } from "next/navigation";
import CollapsibleLayout from "../../layouts/CollapsibleLayout/CollapsibleLayout";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import BalconyTwoToneIcon from '@mui/icons-material/BalconyTwoTone';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import styles from "./sidebar.module.scss";

function Sidebar() {

    const router = useRouter();
    const pathname = usePathname();

    const open = (path: string) => {
        return () => {
            router.push(path);
        };
    }

    return (
        <div className={styles['sidebar']}>

            <CollapsibleLayout title="EVENTS">
                <div className={styles['sidebar--group-item']} data-active={pathname === '/triathlons'} onClick={open('/triathlons')}>
                    <div className={styles['sidebar--item-icon']}>
                        <WorkspacesIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>Triathlons</span>
                </div>
            </CollapsibleLayout>
            <CollapsibleLayout title="LOCATIONS">
                <div className={styles['sidebar--group-item']} data-active={pathname === '/countries'} onClick={open('/countries')}>
                    <div className={styles['sidebar--item-icon']}>
                        <PublicTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>Countries</span>
                </div>
                <div className={styles['sidebar--group-item']} data-active={pathname === '/states'} onClick={open('/states')}>
                    <div className={styles['sidebar--item-icon']}>
                        <BalconyTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>States</span>
                </div>
                <div className={styles['sidebar--group-item']} data-active={pathname === '/cities'} onClick={open('/cities')}>
                    <div className={styles['sidebar--item-icon']}>
                        <ApartmentTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>Cities</span>
                </div>
            </CollapsibleLayout>
            <hr />
            <div className={styles['sidebar--item']} data-active={pathname === '/triathlons/leaderboards'} onClick={open('/triathlons/leaderboards')}>
                <div className={styles['sidebar--item-icon']}>
                    <LeaderboardRoundedIcon />
                </div>
                <span className={styles['sidebar--item-text']}>Leaderboards</span>
            </div>
            <div className={styles['sidebar--item']} data-active={pathname === '/athletes'} onClick={open('/athletes')}>
                <div className={styles['sidebar--item-icon']}>
                    <GroupsRoundedIcon />
                </div>
                <span className={styles['sidebar--item-text']}>Athletes</span>
            </div>
        </div>
    );

}

export default Sidebar;