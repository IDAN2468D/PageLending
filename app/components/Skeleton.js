export default function Skeleton({ className = "" }) {
    return (
        <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg ${className}`} />
    );
}

export function PostSkeleton() {
    return (
        <div className="space-y-4 p-6 border border-slate-100 rounded-2xl">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
}
