export class Role {
    id: number;
    name: string;
    description: string;
    constructor(data: any) {
        this.name = data.name;
        this.description = data.description;
        if (data.id) { this.id = data.id; }
    }
}