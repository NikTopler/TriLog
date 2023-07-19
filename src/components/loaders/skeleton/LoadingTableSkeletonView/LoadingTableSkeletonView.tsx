import { Skeleton } from "@/components/ui/skeleton";

function LoadingTableSkeletonView() {
    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '12rem 6rem 6rem 1fr 4rem',
                gap: '1rem',
                marginBottom: '0.25rem'
            }}>
                <div style={{ gridColumn: '1/2' }}>
                    <Skeleton className="h-8 w-full mx-auto" />
                </div>
                <div style={{ gridColumn: '2/3' }}>
                    <Skeleton className="h-8 w-full mx-auto" />
                </div>
                <div style={{ gridColumn: '3/4' }}>
                    <Skeleton className="h-8 w-full mx-auto" />
                </div>
                <div style={{ gridColumn: '5/6' }}>
                    <Skeleton className="h-8 w-full mx-auto" />
                </div>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-3 px-4" />
                            <th className="py-3 px-4" />
                            <th className="py-3 px-4" />
                            <th className="py-3 px-4" />
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array(8).fill(null).map((_, index) => (
                            <tr key={index}>
                                <td className="py-3 px-2">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </td>
                                <td className="py-3 px-2">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </td>
                                <td className="py-3 px-2">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </td>
                                <td className="py-3 px-2">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="py-3 flex items-center justify-between">
                <nav className="relative z-0 inline-flex shadow-sm -space-x-px" style={{
                    display: 'grid',
                    gridTemplateColumns: '9rem 1fr 8rem 10rem',
                    gap: '1rem',
                    width: '100%'
                }}>
                    <div style={{ gridColumn: '1/2', display: 'flex', alignItems: 'center' }}>
                        <Skeleton className="h-4 w-full mx-auto" />
                    </div>
                    <div style={{ gridColumn: '2/3' }} />
                    <div style={{ gridColumn: '3/4', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Skeleton className="h-4 w-10 mx-auto" />
                        <Skeleton className="h-8 w-20 mx-auto" />
                    </div>
                    <div style={{ gridColumn: '4/5', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Skeleton className="h-8 w-full mx-auto" />
                        <Skeleton className="h-8 w-full mx-auto" />
                        <Skeleton className="h-8 w-full mx-auto" />
                        <Skeleton className="h-8 w-full mx-auto" />
                    </div>
                </nav>
            </div>
        </>
    );
}

export default LoadingTableSkeletonView;