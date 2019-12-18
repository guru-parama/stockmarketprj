import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from 'src/app/site/authenticate.service';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent implements OnInit {

  uploadFlag:boolean=false;
  apiEndPoint = "http://localhost:8086/file-upload-service/stockmarket/upload";

  constructor(private http:HttpClient, private authenticateService: AuthenticateService) {
  }

  ngOnInit(){}

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let token = "Bearer "+ this.authenticateService.getToken();
      const httpOption = { headers : new HttpHeaders({'Content-Type' : 'multipart/form-data; boundary=----WebKitFormBoundaryJ6Q2VG5TMUfGoSqg', 'Authorization': token})};
      this.http.post(this.apiEndPoint, formData).subscribe(
              (response)=>this.uploadFlag =true
        
        )
    }
  }
}
