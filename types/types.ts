import { NextPage } from "next";

export interface DocAppTypes {
    name: string,
    title: string,
    active: null | number,
    icon: any,
    open: null | number[],
    component?: any
}

interface IDTypes {
    id: number,
    zIndex: number
}

export interface WindowStoreTypes {
    comp: NextPage<IDTypes>, 
    id: number,
    name: string,
    zIndex: number
}