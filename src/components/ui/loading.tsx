import React from "react";

/**
 * A full-screen loading overlay with a spinner and message.
 * Blocks the screen and centers the loader.
 */
export default function Loading({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center text-center w-full h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid" />
            <p className="text-gray-700 dark:text-white text-base mt-4">{message}</p>
        </div>
    );
}
