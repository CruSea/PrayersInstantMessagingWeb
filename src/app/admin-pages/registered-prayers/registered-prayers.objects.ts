import {UserRole} from '../users/users.objects';

export class RegisteredPrayer {
    public id: number;
    public full_name: string;
    public phone: string;
    public location: string;
    public language: string;
    public day_name: string;
    public sch_time: string;
    public created_at: string;
    public updated_at: string;

    constructor() {
        this.id = 0;
        this.full_name = '';
        this.phone = '';
        this.location = '';
        this.language = '';
        this.day_name = '';
        this.sch_time = '';
        this.created_at = '';
        this.updated_at = '';
    }
}

export class PaginatedRegisteredPrayers {
    public data: RegisteredPrayer[];
    public first_page_url: string;
    public last_page_url: string;
    public next_page_url: string;
    public prev_page_url: string;
    public path: string;
    public current_page: number;
    public per_page: number;
    public last_page: number;
    public total: number;
    public from: number;
    public to: number;

    constructor() {
        this.data = [];
        this.first_page_url = '';
        this.last_page_url = '';
        this.next_page_url = '';
        this.prev_page_url = '';
        this.path = '';
        this.current_page = 0;
        this.per_page = 0;
        this.last_page = 0;
        this.total = 0;
        this.from = 0;
        this.to = 0;
    }
}

export class RegisteredPrayerLocation {
    public location: string;
    constructor() {
        this.location = '';
    }
}

export class RegisteredPrayerLanguage {
    public language: string;
    constructor() {
        this.language = '';
    }
}
