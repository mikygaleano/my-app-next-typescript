'use client'
import { usePathname, useSearchParams, useRouter  } from "next/navigation";
import { useEffect, useState } from "react";

export default function ButtonPagination(): JSX.Element {

   
    const [page, setPage] = useState<number>(1)
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)



    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    
    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        params.set("page", page.toString());
        params.set("offset", offset.toString());
        params.set("limit", limit.toString());

        const paramsHref: string = `${pathname}?${params.toString()}`;
        replace(paramsHref);
    }, [page, offset, limit]);

    function handleNextPageChange() {
        setLimit(prev => prev + 10)
        setOffset(prevOffset => prevOffset + 10)
        setPage(prevPage => prevPage + 1);
    }

    function handlePrevPageChange() {
        setLimit(prevLimit => prevLimit - 10)
        setOffset(prevOffset => prevOffset - 10)
        setPage(prevPage => Math.max(prevPage - 1, 1));
    }

    return (
        <>
                <button  
                    onClick={handlePrevPageChange} 
                   >
                    Prev
                </button>
                <button  
                    onClick={handleNextPageChange} 
                    >
                    Next
                </button>
        </>
    );
}
