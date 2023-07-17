import { usePathname, useRouter } from "next/navigation";
import CollapsibleLayout from "../../layouts/CollapsibleLayout/CollapsibleLayout";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import BalconyTwoToneIcon from '@mui/icons-material/BalconyTwoTone';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { PATHS } from "@/constants";
import { Button } from "@/components/ui/button";
import { useTranslationContext } from "@/providers";
import { changeFirstLetter } from "@/helpers";
import styles from "./sidebar.module.scss";

function Sidebar() {

    const router = useRouter();
    const pathname = usePathname();
    const [translationsLoading, lang, t, setLang] = useTranslationContext();

    const open = (path: string) => () => router.push(path);

    return (
        <div className={styles['sidebar']}>

            <CollapsibleLayout title="EVENTS">
                <div className={styles['sidebar--group-item']} data-active={pathname === PATHS.triathlons.all} onClick={open(PATHS.triathlons.all)}>
                    <div className={styles['sidebar--item-icon']}>
                        <WorkspacesIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>{changeFirstLetter(t['triathlon_plural'])}</span>
                </div>
            </CollapsibleLayout>
            <CollapsibleLayout title="LOCATIONS">
                <div className={styles['sidebar--group-item']} data-active={pathname === PATHS.countries.all} onClick={open(PATHS.countries.all)}>
                    <div className={styles['sidebar--item-icon']}>
                        <PublicTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>{changeFirstLetter(t['country_plural'])}</span>
                </div>
                <div className={styles['sidebar--group-item']} data-active={pathname === PATHS.states.all} onClick={open(PATHS.states.all)}>
                    <div className={styles['sidebar--item-icon']}>
                        <BalconyTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>{changeFirstLetter(t['state_plural'])}</span>
                </div>
                <div className={styles['sidebar--group-item']} data-active={pathname === PATHS.cities.all} onClick={open(PATHS.cities.all)}>
                    <div className={styles['sidebar--item-icon']}>
                        <ApartmentTwoToneIcon />
                    </div>
                    <span className={styles['sidebar--item-text']}>{changeFirstLetter(t['city_plural'])}</span>
                </div>
            </CollapsibleLayout>
            <hr />
            <div className={styles['sidebar--item']} data-active={pathname === PATHS.triathlons.leaderboards} onClick={open(PATHS.triathlons.leaderboards)}>
                <div className={styles['sidebar--item-icon']}>
                    <LeaderboardRoundedIcon />
                </div>
                <span className={styles['sidebar--item-text']}>{changeFirstLetter(t['leaderboard_plural'])}</span>
            </div>
            <div className={styles['sidebar--item']} data-active={pathname === PATHS.athletes.all} onClick={open(PATHS.athletes.all)}>
                <div className={styles['sidebar--item-icon']}>
                    <GroupsRoundedIcon />
                </div>
                <span className={styles['sidebar--item-text']}>{changeFirstLetter(t['athlete_plural'])}</span>
            </div>
            <div>
                <Button onClick={() => setLang(lang === "en" ? "si" : "en")} className={styles['sidebar--item-text']}>
                    {lang === "en" ? "English" : "Slovenščina"}
                </Button>
            </div>
        </div>
    );

}

export default Sidebar;