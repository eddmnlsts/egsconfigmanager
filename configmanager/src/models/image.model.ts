
export class Image {
    public name: string;
    public size: number;
    public type: string;
    public src: string;

    constructor(name: string, size: number, type: string, src: string) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.src = src;
    }
}