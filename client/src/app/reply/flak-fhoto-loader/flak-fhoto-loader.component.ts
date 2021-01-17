// 12-29 copied from photo-editor
import { Component, OnInit, Input, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { MembersService } from 'src/app/_services/members.service';
import { Photo } from 'src/app/_models/photo';

import { Fhoto } from 'src/app/_models/fhoto';
import { Entry } from '../../_models/entry';
import { Flak } from '../../_models/flak';


import { EntryService } from '../../_services/entry.service';
import { FhotoService } from '../../_services/fhoto.service';

@Component({
  selector: 'app-flak-fhoto-loader',
  templateUrl: './flak-fhoto-loader.component.html',
  styleUrls: ['./flak-fhoto-loader.component.css']
})

export class FlakFhotoLoaderComponent implements OnInit {

  @Output() entry: Entry;
  @Output() flak: Flak;
  @Output() fhotos: Fhoto[] = [];
  @Output() entryOut: Entry;
  @Output() flakOut: Flak;
  @Output() fhotosOut: Fhoto[] = [];

  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  fhoto: Fhoto;
  entry$: Entry;  // for testing
  doneWithLoader = false;

constructor(private accountService: AccountService, private fhotoService: FhotoService) {
  this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);  // brings in all user properties
}

  ngOnInit(): void {

    this.entryOut = this.entry;
    this.flakOut = this.flak;
    this.initializeUploader();
  }

  fileOverBase(e: any) {     // e is for event I think
    this.hasBaseDropzoneOver = e;
    // console.log('FLAK-FHOTO-LOADER - entry-photoloader fileOverBase')
  }

  setMainFhoto(photo: Photo) {  // main photo not used in entry & flaks
  };

  // this works, member select trash icon and it is deleted from the screen & db
  // images with delete do not show until updated. With auto advance after upload
  // the delete functionality will not be used, except for users and flakback
  deleteFhoto(photoId: number) {
    this.fhotoService.deleteFhoto(photoId).subscribe(() => {
      this.fhotos = this.fhotos.filter(x => x.id !== photoId);
    })
  }

  // VERY IMPORTANT method. Need to add entryId to fhoto records using update
  // loop thru fhotos and where entryid = 0, then update
  // copy new values from Entry which is in memory.
  updateFhoto() {
    for (this.fhoto of this.fhotos) {
          // console.log('FLAK-FHOTO-LOADER - for loop test :', this.fhoto.id, ' entryId : ', this.fhoto.entryId);

      if (this.fhoto.entryId == 0) {
        // console.log('FLAK-FHOTO-LOADER - In IF statement NEED THIS TO SHOW UP BABY !!!:', this.fhoto.entryId);
          this.fhoto.entryId = this.entry$.id;
          this.fhoto.userId = this.entry$.userId;
          this.fhoto.userName = this.entry$.userName;
          this.fhoto.orgId = this.entry$.orgId;
          this.fhoto.orgName = this.entry$.orgName;

        this.fhotoService.updateFhoto(this.fhoto).subscribe( ()=> {
        })
      }
    }
    this.doneWithLoader = true;
  }

  initializeUploader() {                   // next 3 methods
    this.uploader = new FileUploader({
      url: this.baseUrl + 'fhoto/add-photo',     // adds photo using url
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    // console.log('FLAK-FHOTO-LOADER - Finished making uploaded object :', this.uploader);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log('FLAK-FHOTO-LOADER - uploader.onsucces at start:', response);
      if (response) {
        const fhoto: Fhoto = JSON.parse(response);
        this.fhotos.push(fhoto);
         if (fhoto.isMain) {
           this.user.photoUrl = fhoto.url;
          //  this.fhoto.url = fhoto.url;    // fix this !!!!!!
           this.accountService.setCurrentUser(this.user);
         }
      }
      console.log('FLAK-FHOTO-LOADER - uploader.onsuccess, SEEIF NEW FHOTO ID IS IN ARRAY :', this.fhotos);
      this.updateFhoto();   // write missing columns in Fhoto since we know id
    }
  }

}


// fileOverBase(e: any) {
  //   this.hasBaseDropzoneOver = e;
  // }

  // setMainPhoto(photo: Photo) {
  //   this.memberService.setMainPhoto(photo.id).subscribe(() => {
  //     this.user.photoUrl = photo.url;
  //     this.accountService.setCurrentUser(this.user);
  //     this.member.photoUrl = photo.url;
  //     this.member.photos.forEach(p => {
  //       if (p.isMain) p.isMain = false;
  //       if (p.id === photo.id) p.isMain = true;
  //     })
  //   })
  // }

  // deletePhoto(photoId: number) {
  //   this.memberService.deletePhoto(photoId).subscribe(() => {
  //     this.member.photos = this.member.photos.filter(x => x.id !== photoId);
  //   })
  // }

  // initializeUploader() {
  //   this.uploader = new FileUploader({
  //     url: this.baseUrl + 'users/add-photo',
  //     authToken: 'Bearer ' + this.user.token,
  //     isHTML5: true,
  //     allowedFileType: ['image'],
  //     removeAfterUpload: true,
  //     autoUpload: false,
  //     maxFileSize: 10 * 1024 * 1024
  //   });

  //   this.uploader.onAfterAddingFile = (file) => {
  //     file.withCredentials = false;
  //   }

  //   this.uploader.onSuccessItem = (item, response, status, headers) => {
  //     if (response) {
  //       const photo: Photo = JSON.parse(response);
  //       this.member.photos.push(photo);
  //        if (photo.isMain) {
  //          this.user.photoUrl = photo.url;
  //          this.member.photoUrl = photo.url;
  //          this.accountService.setCurrentUser(this.user);
  //        }
  //     }
  //   }
  // }


