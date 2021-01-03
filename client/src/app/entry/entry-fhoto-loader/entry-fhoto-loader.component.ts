// 12-29 copied from photo-editor

import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { MembersService } from 'src/app/_services/members.service';
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
  selector: 'app-entry-fhoto-loader',
  templateUrl: './entry-fhoto-loader.component.html',
  styleUrls: ['./entry-fhoto-loader.component.css']
})

export class EntryFhotoLoaderComponent implements OnInit {

  @Input() member: Member;            // need fix, no changes yet
  // entry: Entry;   // 12-29 add
  // fhotos: Fhoto[] = [];  // 12-29 add

  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);  // brings in all user properties
  }

  // constructor(private accountService: AccountService, private memberService: MembersService,
  //   private fhotoService: FhotoService, private entryService: EntryService) {
  //   this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  // }

  ngOnInit(): void {
    console.log('entry-photo-loader ngonit at start, member CRITICAL :', this.member)
    this.initializeUploader();

  }

  fileOverBase(e: any) {     // e is for event
    this.hasBaseDropzoneOver = e;
    console.log('entry-photoloader fileOverBase')
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      });
    })
    console.log('entry-photoloader setMainPhoto')
  };

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
    })
  }

  initializeUploader() {                   // next 3 methods

    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    console.log('Finished making uploaded object :', this.uploader);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    console.log('uploader.onAfterAddingFile at COMPLETE !! GET HERE PLEASE');

    console.log('end initializeloader END OF ALL : ', this.member.photos.length);

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log('uploader.onsucces at start:', response);
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.member.photos.push(photo);
         if (photo.isMain) {
           this.user.photoUrl = photo.url;
           this.member.photoUrl = photo.url;
           this.accountService.setCurrentUser(this.user);
         }
      }
    }

  }

}
