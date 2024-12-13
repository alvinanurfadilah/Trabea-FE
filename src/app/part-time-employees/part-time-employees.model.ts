import { Pagination } from "../pagination"


export interface PartTimeEmployee {
    id: number,
    fullName: string,
    personalEmail: string,
    workEmail: string,
    personalPhoneNumber: string,
    joinDate: Date
}

export interface PartTimeEmployeeIndex {
    partTimeEmployees: PartTimeEmployee[],
    pagination: Pagination,
    fullName: string
}

export interface PartTimeEmployeeInsert {
    firstName: string;
    lastName?: string;
    personalEmail: string;
    personalPhoneNumber: string;
    lastEducation: string;
    address: string;
    onGoingEducation?: string;
}

export interface PartTimeEmployeeUpdate {
    id: number;
    firstName: string;
    lastName?: string;
    personalEmail: string;
    personalPhoneNumber: string;
    lastEducation: string;
    address: string;
    onGoingEducation?: string;
}

export interface PartTimeEmployeeResponse {
    id: number;
    firstName: string;
    lastName: string;
    personalEmail: string;
    personalPhoneNumber: string;
    lastEducation: string;
    address: string;
    onGoingEducation: string;
    joinDate: Date;
    resignDate: Date;
    workEmail: string;
}

export interface EducationDropdown {
    text: string,
    value: string
}