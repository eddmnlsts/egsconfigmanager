
export class Generic {
    public code: number;
    public value: string;
    public description: string;
    public type: string;

    constructor(code: number, value: string, description: string, type: string) {
        this.code = code;
        this.value = value;
        this.description = description;
        this.type = type;
    }
}