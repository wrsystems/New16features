import { Component, OnInit, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

import { EntryService } from '../../_services/entry.service';
import { Entry } from '../../_models/Entry';

@Component({
  selector: 'app-reply-card',
  templateUrl: './reply-card.component.html',
  styleUrls: ['./reply-card.component.css'],
})

export class ReplyCardComponent implements OnInit {
  @Input() entry: Entry;
  // @Output() entryOut: Entry
  submitted = false;

  constructor(private entryService: EntryService, private toastr: ToastrService) { }

  ngOnInit() {
    // this.entryOut = this.entry;
  }


  onChoice() {
    this.submitted = true;
  }
  // addLike(member: Member) {
  //   this.flakService.addLike(member.username).subscribe(() => {
  //     this.toastr.success('You have liked ' + flak.knownAs);
  //   });
  // }

}
