import { Skeleton } from "@/components/ui/skeleton";

function MainHeaderSkeletonLoaderView() {
    return (
        <div style={{ display: 'grid', gap: '0.25rem' }}>
            <Skeleton className="h-9 w-[8rem]" style={{ marginBottom: '0.5rem' }} />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
        </div>
    );
}

export default MainHeaderSkeletonLoaderView;