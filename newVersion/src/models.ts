export interface Reports{
    centers: Center[]
}

export interface Center {
    session_id: number;
    slots: Slots[];
    center_id: number;
    name: string;
    address: string;
    state_name: string;
    district_name: string;
    block_name: string;
    pincode: number;
    lat: number;
    long: number;
    from:string;
    to: string;
    fee_type: string;
    sessions: Session[];
    vaccine_fees: Vaccine[];
}

export interface Session{
    session_id: string;
    date: string;
    available_capacity: number;
    min_age_limit: number;
    allow_all_age: boolean;
    vaccine: string;
    slots: Slots[];
    available_capacity_dose1: number;
    available_capacity_dose2: number;

}
export interface Slots{
    time: string;
    seats: number;
}
export interface Vaccine{
    vaccine: string;
    fee: number;
}

