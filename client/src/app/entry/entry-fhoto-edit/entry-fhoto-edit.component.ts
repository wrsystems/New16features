import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { EntryService } from '../../_services/entry.service';
import { Entry } from '../../_models/entry';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fhoto-edit',
  templateUrl: './entry-fhoto-edit.component.html',
  styleUrls: ['./entry-fhoto-edit.component.css']
})

export class EntryFhotoEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  entry: Entry;
  entry$: Entry;  // for testing

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService,
    private entryService: EntryService, private route: ActivatedRoute, private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {

    this.loadMember();

    this.entryService.currentEntry$.pipe(take(1)).subscribe(entryOne => this.entry$ = entryOne);
    // console.log('entry fhoto edit  entry$ ', this.entry$ )
    // console.log(' entry$.id : ', this.entry$.id);

    this.loadEntry();

    // this.route.data.subscribe(data => {  // uses resolver entry-fhoto.resolver  01-02-21
    //   this.entry = data.entry;
    //   console.log('In entry-fhoto-edit at init, after route : ', data)    // brings entry object
    //   console.log('In entry-fhoto-edit at init, this.entry  : ', this.entry)    // brings entry object
    // });

  }

  loadEntry() {
    this.entryService.getEntryId(this.entry$.id).subscribe(entry => {
      this.entry = entry;
      // console.log('entry fhoto edit load entry this entry : ', this.entry )
    })
  }

  loadMember() {
    console.log('WHY AM I MISSING user.username : ', this.user.username);
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      console.log('entry fhoto edit load VERY IMPORTANT MEMBER : ', this.member )
    })
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    })
  }
}
