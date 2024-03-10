'use client'
import { usePathname, useSearchParams, useRouter  } from "next/navigation";
import { useState } from "react";

export default function ButtonPagination() {
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    function handleNextPageChange() {
        const newOffset = offset + 10;
        const newLimit = limit + 10;
        setOffset(newOffset);
        setLimit(newLimit);
        const params = new URLSearchParams(searchParams);
        params.set('limit', newLimit.toString());
        params.set('offset', newOffset.toString());
        const queryString = params.toString();
        replace(`${pathname}?${queryString.toString()}`);
    }

    function handlePrevPageChange() {
        const newOffset = Math.max(0, offset - 10);
        const newLimit = Math.max(10, limit - 10);
        setOffset(newOffset);
        setLimit(newLimit);
        const params = new URLSearchParams(searchParams);
        params.set('limit', newLimit.toString());
        params.set('offset', newOffset.toString());
        const queryString = params.toString();
        replace(`${pathname}?${queryString.toString()}`);
    }

    return (
        <>
            <button onClick={handlePrevPageChange}>Prev</button>
            <button onClick={handleNextPageChange}>Next</button>
        </>
    );
}
