
export class Numero {
    public numero: number;
    public description: string;
    public client: string;
    public remarks: string;

    constructor(numero: number, description: string, client: string, remarks: string) {
        this.numero = numero;
        this.description = description;
        this.client = client;
        this.remarks = remarks;
    }
}