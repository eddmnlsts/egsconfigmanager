import { Numero } from 'src/models/numeros.model';

export class GlobalService {
  numero: Numero[];

  convertToProper(text) {
    const result = text.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return finalResult;
  }
}
