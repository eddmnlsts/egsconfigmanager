import { Image } from "src/models/image.model";

export class User {
    public SourceNum: number;
    public FullName: string;
    public Username: string;
    public Password: string;
    public EmailAddress: string;
    public Department: string;
    public Position: string;
    public Image: Image;
    public IsAdmin: boolean;

    constructor(SourceNum: number, FullName: string, Username: string, Password: string, EmailAddress: string, Department:string, Position: string, Image: Image, IsAdmin: boolean) {
        this.SourceNum = SourceNum;
        this.FullName = FullName;
        this.EmailAddress = EmailAddress;
        this.Username = Username;
        this.Password = Password;
        this.Department = Department;
        this.Position = Position;
        this.Image = Image;
        this.IsAdmin = IsAdmin;
    }
}