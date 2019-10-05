import {UserRole} from '../../users/users.objects';

export class MessagePort {
    public id: number;
    public name: string;
    public api_key: string;
    public campaign_id: number;
    public sms_port_id: number;
    public campaign_name: string;
    public sms_port_name: string;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = 0;
        this.created_at = '';
        this.updated_at = '';
    }
}
export class PaginatedMessagePorts {
    public data: MessagePort[];
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
export class Campaign {
    public id: number;
    public name: string;
    public sms_port_id: number;
    public sms_port: SmsPort;
    constructor() {
        this.id = null;
        this.name = '';
        this.sms_port_id = null;
        this.sms_port = new SmsPort();
    }
}

export class SmsPort {
    public id: number;
    public name: string;
    public gateway_code: string;
    public unique_code: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.gateway_code = '';
        this.unique_code = '';
    }
}

export class WebHook {
    public name: string;
    public sms_port_id: number;
    public API_KEY: string;
    public action_url: string;
    constructor() {
        this.sms_port_id = null;
        this.name = '';
        this.API_KEY = '';
        this.action_url = '';
    }
}
