import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private entryService: EntryService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // addLike(member: Member) {
  //   this.flakService.addLike(member.username).subscribe(() => {
  //     this.toastr.success('You have liked ' + flak.knownAs);
  //   });
  // }

}
