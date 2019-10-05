/**
 * Created by BENGEOS on 2/2/19.
 */
export class SentMessage {
    public id: number;
    public message: string;
    public message_port_id: number;
    public phone: string;
    public created_at: string;
    public updated_at: string;

    constructor() {
        this.id = 0;
        this.message_port_id = 0;
        this.message = '';
        this.phone = '';
        this.created_at = '';
        this.updated_at = '';
    }
}

export class PaginatedSentMessage {
    public data: SentMessage[];
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
