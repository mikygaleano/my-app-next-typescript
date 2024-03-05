import {Card, Skeleton} from "@nextui-org/react";

const Loading = ()=> {

    return (
        <Card className="w-full min-h-screen bg-slate-400">
            <Skeleton className="rounded-lg">   
            </Skeleton>
        </Card>
    )
};

export {
    Loading
}