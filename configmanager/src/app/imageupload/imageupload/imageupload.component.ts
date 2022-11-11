import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css'],
})
export class ImageuploadComponent implements OnInit {
  //ICON
  iconUpload = faUpload;

  @Output() fileImage = new EventEmitter<ImageSnippet>();

  selectedFile: ImageSnippet;
  imageStatus = '';

  constructor() {}

  ngOnInit(): void {}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.selectedFile.status = 'ok';
      this.imageStatus = 'ok';

      this.fileImage.emit(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }

  onClearImageButton(input) {
   console.log(this.selectedFile);
   this.selectedFile.src = '';
   this.selectedFile.pending = false;
   this.selectedFile.status = 'init';
   this.imageStatus = '';
  }
}
