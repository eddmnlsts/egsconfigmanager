
export class UserHistory {
    public numero: number;
    public description: string;
    public activitydate: string;
    public activitytype: string;

    constructor(numero: number, description: string, activitydate: string, activitytype: string) {
        this.numero = numero;
        this.description = description;
        this.activitydate = activitydate;
        this.activitytype = activitytype;
    }
}