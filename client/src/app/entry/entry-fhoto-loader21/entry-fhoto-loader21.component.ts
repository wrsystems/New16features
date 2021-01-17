// 12-29 copied from photo-editor
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { Photo } from 'src/app/_models/photo';

// 12-29
import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Fhoto } from 'src/app/_models/fhoto';
import { Entry } from '../../_models/entry';
import { EntryService } from '../../_services/entry.service';
import { FhotoService } from '../../_services/fhoto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entry-fhoto-loader21',
  templateUrl: './entry-fhoto-loader21.component.html',
  styleUrls: ['./entry-fhoto-loader21.component.css']
})

export class EntryFhotoLoader21Component implements OnInit {

  @Input() fhotos: Fhoto[]     // 01-04-21 add

  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  fhoto: Fhoto;
  entry: Entry;
  entry$: Entry;  // for testing
  doneWithLoader = false;

  constructor(private accountService: AccountService, private fhotoService: FhotoService,
              private entryService: EntryService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);  // brings in all user properties
  }

  ngOnInit(): void {

    // loads entry$ from db
    this.entryService.currentEntry$.pipe(take(1)).subscribe(entryOne => this.entry$ = entryOne);

    console.log('entry-photo-loader ngonit at start, PHOTOS CRITICAL :', this.fhotos)
    this.initializeUploader();

  }

  fileOverBase(e: any) {     // e is for event I think
    this.hasBaseDropzoneOver = e;
    // console.log('entry-photoloader fileOverBase')
  }

  setMainFhoto(photo: Photo) {  // main photo not used in entry & flaks
    // this.memberService.setMainPhoto(photo.id).subscribe(() => {
    //   this.user.photoUrl = photo.url;
    //   this.accountService.setCurrentUser(this.user);
    //   this.member.photoUrl = photo.url;
    //   this.member.photos.forEach(p => {
    //     if (p.isMain) p.isMain = false;
    //     if (p.id === photo.id) p.isMain = true;
    //   });
    // })
    // console.log('entry-photoloader setMainPhoto')
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
          // console.log('for loop test :', this.fhoto.id, ' entryId : ', this.fhoto.entryId);

      if (this.fhoto.entryId == 0) {
        // console.log('In IF statement NEED THIS TO SHOW UP BABY !!!:', this.fhoto.entryId);
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
    // console.log('Finished making uploaded object :', this.uploader);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    // console.log('uploader.onAfterAddingFile at COMPLETE !! GET HERE PLEASE');
    // console.log('end initializeloader END OF ALL : ', this.fhotos.length);

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log('uploader.onsucces at start:', response);
      if (response) {
        const fhoto: Fhoto = JSON.parse(response);
        this.fhotos.push(fhoto);
         if (fhoto.isMain) {
           this.user.photoUrl = fhoto.url;
          //  this.fhoto.url = fhoto.url;    // fix this !!!!!!
           this.accountService.setCurrentUser(this.user);
         }
      }
      console.log('uploader.onsuccess, SEEIF NEW FHOTO ID IS IN ARRAY :', this.fhotos);
      this.updateFhoto();   // write missing columns in Fhoto since we know id
    }
  }

}
