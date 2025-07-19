export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[80vh]">
            <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid mx-auto"></div>
                <p className="text-gray-600 text-sm">Loading dashboard...</p>
            </div>
        </div>
    );
}