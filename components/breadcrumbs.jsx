'use client';

import {usePathname} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Fragment} from "react";

const Breadcrumbs = () => {
    const path = usePathname()
    const segments = path.split('/');

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                {
                    segments.map((segment,index)=>{
                        if(!segment) return null;
                        const href= `/${segments.slice(0,index + 1).join('/')}`;
                        return <Fragment key={segment}>
                            <BreadcrumbSeparator />
                             <BreadcrumbPage>{segment}</BreadcrumbPage>
                        </Fragment>

                    })
                }


            </BreadcrumbList>
        </Breadcrumb>

    )
}
export default Breadcrumbs
