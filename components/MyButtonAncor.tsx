'use client'
import { ReactNode, MouseEvent } from 'react';

interface MyButtonProps {
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    href?: string | any;
    children?: ReactNode;
}

const MyButtonAncor = (({ onClick, href, children }: MyButtonProps) => {
  return (
    <a href={href} onClick={onClick}>
        {
            children
        }
    </a>
  )
});

export {MyButtonAncor};